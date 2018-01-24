import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError, hadDbError, hadUpload } from '../../error_config';

import * as mongoose from 'mongoose';
import * as Review from '../../models/review';

const reviewuploadRouter: Router = Router();
reviewuploadRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  const protodata = {
    title: 'テスト用タイトル',
    cateques: ['カテゴリ別質問1', 'カテゴリ別質問2'],
    cateans: ['カテゴリ別回答1', 'カテゴリ別回答2'],
    subtitle: ['サブタイトル1', 'サブタイトル2'],
    mainimg: ['http://localhost:3000/public/img/hoge', 'http://localhost:3000/public/img/hoge2'],
    main: ['おまんけ1', 'おまんけ2'],
    tag: ['テスト用']
  };

  save_review(req, res, protodata);

});

function save_review (req, res, protodata) {
  const reviewsave = new Review[0]({
    hostid: req.session.user, // obj_idから主催者のデータを拾う
    count: null, // アクセスされた回数
    uday: null, // アップロードした日
    star: null, // 評価の星の数を保存
    tag: protodata.tag, // この中にタグ記述してもらう(ニコ動のタグみたいなもの)
    title: protodata.title,
    cateques: protodata.cateques,
    cateans: protodata.cateans,
    subtitle: protodata.subtitle,
    mainimg: protodata.mainimg,
    main: protodata.main,
    fav: [] // ファボした人のオブジェクトIDを格納
  });
  reviewsave.save((err) => {
    if (err) return hadDbError(req, res);
    if (!err) return hadUpload(req, res);
    // const conid = mongoose.Types.ObjectId();
    // const reviewcom = new Review[1]({
    //   _id: reviewsave._id,
    //   _conid: conid // コンテンツID
    // });
    // reviewcom.save((err) => {
    //   if (err) return hadDbError(req, res);
    //   if (!err) return hadUpload(req, res);
    // });
  });
}

export { reviewuploadRouter };
