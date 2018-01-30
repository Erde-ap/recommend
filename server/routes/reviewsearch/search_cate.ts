import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError, hadDbError } from '../../error_config';
import * as url from 'url';
import * as qstring from 'querystring';

import * as Review from '../../models/review';

const searchcateRouter: Router = Router();
searchcateRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);
  console.log(query.cate);
  // const searchbox = replaceall('　',' ',query.search).split(' ');
  Review[0].find({ category: query.cate } ,(err, review) => {
    if (err) return hadDbError(req, res);
    res.send(review);
  });
});

export { searchcateRouter };
