import * as http from 'http'; 
import * as passport from 'passport';
import { Router } from 'express';

const logoutRouter: Router = Router();
const LocalStrategy = require('passport-local').Strategy;

logoutRouter.get('/' , (req:any, res, next)  => {
    //ログアウト処理
    console.log("before logout"+req.user);
    req.logout();
    console.log("after logout"+req.user);
    //angular4にlogoutが終わった事を伝える
});

export { logoutRouter };