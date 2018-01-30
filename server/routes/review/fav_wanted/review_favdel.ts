import * as http from 'http';
import { Router } from 'express';
import async from 'async';

import * as Review from '../../../models/review';

import { error, hadLoginError, hadDbError, hadFavoriteaddSuccess, hadFavoritedelSuccess } from '../../../error_config';

const reviewfavdel: Router = Router();
reviewfavdel.post('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

  Review[0].findOne({ _id: req.body.id }).async.forEach((data) => {
    const arr = data.fav;
    const length = arr.length;
    for (let i = 0; i < length; i++) {
      if (arr[i] === req.body.id) {
        delete arr[i];
      }
    }
    Review[0].save(data);
    return hadFavoritedelSuccess(req, res);
  });
});

export { reviewfavdel };
