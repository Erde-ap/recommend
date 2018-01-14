import * as http from 'http'; 
import * as passport from 'passport';
import { Router } from 'express';

import * as Users   from '../../models/user';

const loginRouter: Router = Router();
const LocalStrategy = require('passport-local').Strategy;

// ログイン認証
passport.use("local-login",new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, name, password, done) => {
    process.nextTick(() => {
        Users.findOne({$or:[{email:name},{uid:name}]}, (err, account) => {
            if (err) return done(console.log(err));
            if (!account) {//アカウントが見つからない
              console.log("ユーザ名かパスワードが間違っています。");
                return done(null, false);
            }
            //let hashedPassword = perfectHash(password);//本番用
            let hashedPassword = req.body.password;//テスト用
            if (account.hashpass != hashedPassword) { //パスワードが一致しない
              console.log("ユーザ名かパスワードが間違っています。");
                return done(null, false);
            }
            if(account.ac_st != true){//アカウントの登録が済んでいない
               console.log("アカウントの認証が済んでいません。");
               return done(null, false);
            }
            return done(null, account);
        });
    })
  }));
  passport.serializeUser((account:any, done)=>{
    done(null, account.id); // useridをセット
  });
  passport.deserializeUser((id, done) => {
    console.log(id);
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });

loginRouter.post('/' , (req, res, next)  => {
    passport.authenticate('local-login', {
        successRedirect: '/api/login',
        failureRedirect: 'http://localhost:4200',
        session: true
    })(req, res, next)
});

loginRouter.get('/' , (req: any, res: any, next: any)  => {
    //認証後
    console.log(req.session.passport.user);
    if(req.session.passport.user){
        console.log('compleat');
    }else{
        console.log('failure');
    }
});

export { loginRouter };