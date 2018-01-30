import * as http from 'http';
import { Router } from 'express';
import async from 'async';

import * as Review from '../../../models/review';

import { error, hadLoginError, hadDbError, hadFavoriteStatus, hadFavoritedelSuccess } from '../../../error_config';

const reviewfavst: Router = Router();
reviewfavst.post('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  console.log(req.body.id);

  Review[0].findOne({ _id: req.body.id } ,(err, data) => {
    if (err) return hadDbError(req, res);
    const arr = data.fav;
    const length = arr.length;
    const params = length;
    console.log(arr);
    console.log(length);
    console.log(params);
    for (let i = 0; i < length; i++) {
      if (arr[i] === req.body.id) {
        const status = true;
      }
    }
    return hadFavoriteStatus(req, res, status, params);
  });
});

export { reviewfavst };
