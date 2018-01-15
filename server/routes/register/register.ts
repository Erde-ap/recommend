import * as http from 'http'; 
import * as url from 'url';
import * as qstring from 'querystring';
import { Router } from 'express';

const nodemailer = require('nodemailer');

import { G_USER, G_PASS, REGI_RAND, REGI_SUB, M_MINUTE, getHash, getRand, getDate} from '../../config';

import * as Users   from '../../models/user';

const registerRouter: Router = Router();
registerRouter.post('/' , (req, res, next)  => {
    let email = req.body.email;
    let rand = getRand(REGI_RAND);
    let onetime_Url = getHash(rand);

    console.log(req.body);

    exec(req, res, email, onetime_Url);
});

registerRouter.get('/' , (req, res, next)  => {
    let u = url.parse(req.url, false);
    let query = qstring.parse(u.query);
    console.log(query.url_path);
    
});

//非同期処理の実行
async function exec(req, res, email, onetime_Url){
    await saveurl(req, res, email, onetime_Url);
    await sendmail(req, res, email, onetime_Url);
}

//非同期関数
function saveurl(req, res, email, onetime_Url){
    let sendtime = getDate(M_MINUTE);
    let url_pass = onetime_Url;

    let onetimeuser = new Users({
        name: "onetime",
        email: email,
        regest: sendtime,
        url_pass:url_pass,
        ac_st: false,
        ac_st2:false,
    });

    Users.findOne({email: email}, (err,  account) => {
        if(err) return hadDbError(err, req, res);
        if(account == null){
            //検索で何も一致しないので新規で仮登録
            onetimeuser.save((err) => {
                if(err) return hadDbError(err, req, res);
            });
        }
        if(account){
            if(account.regest < getDate()){
                Users.remove({ _id:account._id }, (err)=> {
                    if (err) return hadDbError(err, req, res);
                    //検索で同じメールアドレスが見つかったが、認証期限が過ぎているので削除して再認証
                    onetimeuser.save((err) => {
                        if(err) return hadDbError(err, req, res);
                    });
                });
            }
            //Angular4に登録出来ない事を伝えるレスポンスを返す
        }
    });
}

function sendmail(req, res, email, onetime_Url){
    let mailOptions = { //メールの送信内容
        from: 'Recommend運営<Recommed911@gmail.com>',
        to: email,
        subject: REGI_SUB,
        html:  "Recommendへようこそ！<br>URLをクリックしてください。<br>http://127.0.0.1:3000/api/register?url_path=" + onetime_Url
      };
      let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
              user: G_USER,
              pass: G_PASS
          }
      });
      transporter.sendMail(mailOptions, (err, resp, req, res)  => { //メールの送信
          if (err) { //送信に失敗したとき
              //console.log('');
              hadSendmailError(err, req, res, resp);
              transporter.close(); //SMTPの切断
          }
           transporter.close(); //SMTPの切断
      });
}

//エラーハンドル
function hadInputdataError(req, res) {
    req.session.error_status = 1;
}

function hadOverlapError(req, res) {
    req.session.error_status = 2;
}

function hadSendmailError(err, req, res, resp) {
    console.log(err);
    req.session.error_status = 4;
    // res.redirect('/email_change');
}

function hadDbError(err, res, req) {
    req.session.error_status = 6;
}

function hadRateoverError(err, req, res) {
    req.session.error_status = 13;
}

export { registerRouter };