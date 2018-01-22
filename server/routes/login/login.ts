import * as http from 'http';
import * as passport from 'passport';
import { Router } from 'express';

import * as Users from '../../models/user';

import { getPhash } from '../../config';
import { LOGIN_S_REDIRECT_URL, LOGIN_F_REDIRECT_URL } from '../../redirect_config';
import { error } from '../../error_config';

const loginRouter: Router = Router();
const LocalStrategy = require('passport-local').Strategy;

// ログイン認証
passport.use('local-login', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true
}, (req, name, password, done) => {
  process.nextTick(() => {
    Users.findOne({ $or: [{ email: name }, { uid: name }] }, (err, user) => {
      if (err) return done(console.log(err));
      if (!user) {// アカウントが見つからない
        return done(null, false);
      }
      const hashedPassword = getPhash(password, user.salt); // 本番用
            // let hashedPassword = req.body.password;//テスト用
      if (user.hashpass !== hashedPassword[0]) { // パスワードが一致しない
        return done(null, false);
      }
      if (user.ac_st !== true) {// アカウントの登録が済んでいない
        console.log('アカウントの認証が済んでいません。');
        return done(null, false);
      }
      return done(null, user);
    });
  });
}));
passport.serializeUser((user: any, done) => {
  done(null, user.id); // useridをセット
});
passport.deserializeUser((id, done) => {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
});

loginRouter.post('/' , (req: any, res: any, next: any) => {
  passport.authenticate('local-login', { session: false }, (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.send(error.status[24]).end(); }
    req.session.user = user._id;
    res.send(error.status[23]);
    next();
  })(req, res, next);
});

loginRouter.get('/' , (req: any, res, next) => {
    // ログイン確認用
  console.log(req.user);
  if (req.user != null) {
    console.log('compleat');
    res.send(error.status[11]);
  }else {
    console.log('failure');
    res.send(error.status[10]);
  }
});

export { loginRouter };
