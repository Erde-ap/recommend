import * as http from 'http';
import { Router } from 'express';

import * as Review from '../../../models/review';

import { error, hadLoginError, hadDbError, hadFavoriteaddSuccess, hadComSuccess } from '../../../error_config';
import { getDate } from '../../../config';

const comupload: Router = Router();
comupload.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  const proto = {
    name: 'test',
    text: 'testlll'
  };

  const comment = new Review[1]({
    mfo: null,
    com: null,
    name: proto.name,
    prop: 'img',
    cuday: getDate(), // コンテンツを上げた日
    chday: getDate(), // 内容を編集した日
    text: proto.text// レビューに対してコメンターが入力(回答内容)
  });

  savecom(req, res, comment);
});

function savecom (req, res, data) {
  data.save((err) => {
    if (err) return hadDbError(req, res);
    return hadComSuccess(req, res);
  });
}

export { comupload };
