import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError, hadDbError } from '../../error_config';
import * as url from 'url';
import * as qstring from 'querystring';
import * as replaceall from 'replaceall';
import * as Review from '../../models/review';

const searchkeywordRouter: Router = Router();
searchkeywordRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  // const searchbox = replaceall('　',' ',query.search).split(' ');
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);
  let searchbox = [];

  searchbox = replaceall('　',' ',query.keyword).split(' ');// スペースで文字列を判別して,分けて配列に入れる
    // console.log(searchbox);

  for (let g = 0; searchbox.length > g ; g++) {
    searchbox[g] = new RegExp(searchbox[g]);// 正規表現オブジェクト/hoge/の作成（キモ）
  }

  console.log(searchbox);
  Review[0].find({ $or: [{ title: { $in: searchbox } }, { tag: { $elemMatch: { $in: searchbox } } }] },{},{ sort: { uday: -1 } } ,(err, review) => {
    if (err) return hadDbError(req, res);
    console.log(review);
    res.send(review);
  });
});

export { searchkeywordRouter };
