import * as http from 'http';
import * as url from 'url';
import * as qstring from 'querystring';
import { Router } from 'express';

const nodemailer = require('nodemailer');

import { G_USER, G_PASS, REGI_RAND, REGI_SUB, M_MINUTE, getHash, getRand, getDate, getPhash } from '../../config';
import { CONF_REDIRECT_URL } from '../../redirect_config';
import { error } from '../../error_config';
import * as Users from '../../models/user';

const registerRouter: Router = Router();
registerRouter.post('/' , (req: any, res: any, next: any) => {
  const email = req.body.email;
  const uid = req.body.uid;
  const password = req.body.password;
  const name = req.body.name;
  const date = req.body.date;
  const sex = req.body.sex;
  const syoukai = req.body.syoukai;

  const rand = getRand(REGI_RAND);
  const onetimeUrl: any = getHash(rand);

  console.log(req.body);

  exec(req, res, onetimeUrl);
});

registerRouter.get('/' , (req: any, res: any, next: any) => {
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);
  console.log(query.url_path);

  confirm_urlpath(req, res, query);
});

// 非同期処理の実行
async function exec (req, res, onetimeUrl) {
  await saveurl(req, res, onetimeUrl);
}

// 非同期関数
function saveurl (req, res, onetimeUrl) {
  const sendtime = getDate(M_MINUTE);
  const urlpath = onetimeUrl;

  const hashpass = getPhash(req.body.password);

  if (req.body.sex === 'female') {
    req.body.sex = 1;
  }else if (req.body.sex === 'male') {
    req.body.sex = 0;
  }

  const onetimeuser = new Users({
    email: req.body.email,
    uid: req.body.uid,
    hashpass: hashpass[0],
    salt: hashpass[1],
    name: req.body.name,
    date: req.body.date,
    sex: req.body.sex,
    syoukai: req.body.syoukai,
    regest: sendtime,
    url_path: urlpath,
    ac_st: false
  });

  Users.findOne({ email: req.body.email }, (err, account) => {
    if (err) return hadDbError(req, res);
    if (account == null) {
            // 検索で何も一致しないので新規で仮登録
      onetimeuser.save(() => {
        if (err) return hadDbError(req, res);
        sendmail(req, res, onetimeUrl);
      });
    }
    if (account) {
      if (account.regest < getDate && account.ac_st === false) {
        Users.remove({ _id: account._id }, () => {
          if (err) return hadDbError(req, res);
                    // 検索で同じメールアドレスが見つかったが、認証期限が過ぎているので削除して再認証
          onetimeuser.save(() => {
            if (err) return hadDbError(req, res);
            sendmail(req, res, onetimeUrl);
          });
        });
      }
      const error = {
        status: 'すでに登録済みです。'
      };
      res.send(error);
            // Angular4に登録出来ない事を伝えるレスポンスを返す
    }
  });
}

function sendmail (req: any, res: any, onetimeUrl: any) {
  const mailOptions = { // メールの送信内容
    from: 'Recommend運営<Recommed911@gmail.com>',
    to: req.body.email,
    subject: REGI_SUB,
    html:  'Recommendへようこそ！<br>URLをクリックしてください。<br>http://127.0.0.1:3000/api/register?url_path=' + onetimeUrl
  };
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: G_USER,
      pass: G_PASS
    }
  });
  transporter.sendMail(mailOptions, (err, resp) => { // メールの送信
    if (err) { // 送信に失敗したとき
              // console.log('');
      hadSendmailError(req, res, resp);
      transporter.close(); // SMTPの切断
    }
    transporter.close(); // SMTPの切断
  });
}

function confirm_urlpath (req, res, query) {
  Users.findOne({ url_pass: query.url_path }, (err,  account) => {
    if (err) return hadDbError(req, res);
    if (account == null) {
            // 検索で何も一致しないので 無効な認証
      const error = { status: '無効な認証です' };
      res.send(error);
    }
    if (account) {
      if (account.regest < getDate() && account.ac_st === false) {
        Users.remove({ _id: account._id }, () => {
          if (err) return hadDbError(req, res);
                    // 検索で同じurl_pathが見つかったが、認証期限が過ぎているので削除して認証の期限切れを告知
          const error = { status: '認証の期限が切れました再登録してください。' };
          res.send(error);
        });
      }else if (account.regest > getDate() && account.ac_st === false) {
        Users.update({ _id: account._id }, { $set: { ac_st: true } },
                    () => {
                      if (err) return hadDbError(req, res);
                      const compleat = { status: '認証が完了しました。' };
                      res.redirect(CONF_REDIRECT_URL);
                    });
      }
    }
  });
}

// エラーハンドル
function hadInputdataError (req, res) {
  res.send(error.status[1]);
}

function hadOverlapError (req, res) {
  res.send(error.status[2]);
}

function hadSendmailError (req, res, resp) {
  res.send(error.status[4]);
}

function hadDbError (req, res) {
  // const error = { status: 6 , err: err };
  res.send(error.status[6]);
}

function hadRateoverError (req, res) {
  // const error = { status: 13, err: err };
  res.send(error.status[13]);
}

export { registerRouter };
