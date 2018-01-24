import * as http from 'http';
import { Router } from 'express';

import * as url from 'url';
import * as qstring from 'querystring';

import * as Review from '../../models/review';

import { error, hadLoginError, hadDbError } from '../../error_config';

const reviewdetailRouter: Router = Router();
reviewdetailRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);
  console.log(query.id);

  Review[0].findOne({ _id: query.id },(err, review) => {
    if (err) return hadDbError(req, res);
    res.send(review);
  });
});

export { reviewdetailRouter };
