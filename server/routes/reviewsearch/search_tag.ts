import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError, hadDbError } from '../../error_config';
import * as url from 'url';
import * as qstring from 'querystring';

import * as Review from '../../models/review';

const searchtagRouter: Router = Router();
searchtagRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);

  const tag = JSON.parse(query.tag);
  let tags = [];
  tags = tag.map(data => {
    return { tag: data.value };
  });

  // const searchbox = replaceall('　',' ',query.search).split(' ');
  Review[0].find({ $or: tags },(err, review) => {
    if (err) return hadDbError(req, res);
    res.send(review);
  });
});

export { searchtagRouter };
