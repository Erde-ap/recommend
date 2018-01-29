import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError } from '../../error_config';
import * as url from 'url';
import * as qstring from 'querystring';

import * as User from '../../models/user';

const searchcateRouter: Router = Router();
searchcateRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);
  // const searchbox = replaceall('　',' ',query.search).split(' ');

});

export { searchcateRouter };
