import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError, hadDbError } from '../../error_config';
import * as url from 'url';
import * as qstring from 'querystring';
import * as Review from '../../models/review';

const searchkeywordRouter: Router = Router();
searchkeywordRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  // const searchbox = replaceall('　',' ',query.search).split(' ');
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);

  Review[0].find({ $or: [{ title: query.keyword }, { tag: query.keyword }] } ,(err, review) => {
    if (err) return hadDbError(req, res);
    console.log(review);
    res.send(review);
  });
});

export { searchkeywordRouter };
