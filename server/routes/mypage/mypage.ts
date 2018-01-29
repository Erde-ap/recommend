import * as http from 'http';
import { Router } from 'express';
import * as url from 'url';
import * as qstring from 'querystring';

import { error, hadLoginError } from '../../error_config';
import * as Users from '../../models/user';

const mypageRouter: Router = Router();
mypageRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);

  readmypage(req, res);
});

function readmypage (req, res) {
  const userid = req.session.user;
}

export { mypageRouter };
