import * as http from 'http'; 
import * as passport from 'passport';
import { Router } from 'express';

import * as Users  from '../../models/user';

import{getPhash} from '../../config';
import{ LOGIN_S_REDIRECT_URL, LOGIN_F_REDIRECT_URL} from '../../redirect_config';

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
            let hashedPassword = getPhash(password, account.salt);//本番用
            // let hashedPassword = req.body.password;//テスト用
            if (account.hashpass != hashedPassword[0]) { //パスワードが一致しない
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
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });

loginRouter.post('/' , (req, res, next) =>{
    passport.authenticate('local-login', {
        successRedirect: LOGIN_S_REDIRECT_URL,
        failureRedirect: LOGIN_F_REDIRECT_URL,
        session: false
    })(req, res, next)
});

loginRouter.get('/' , (req:any, res, next) =>{
    //認証後
    console.log(req.user);
    if(req.user != null){
        console.log('compleat');
        let compleat = {
            stauts:'ログイン完了'
        }
        res.send(compleat);
    }else{
        console.log('failure');
        let error = {
            stauts:'ログインしていません。'
        }
        res.send(error);
    }
});

export { loginRouter };