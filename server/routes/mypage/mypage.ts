import * as http from 'http';
import { Router } from 'express';
import * as url from 'url';
import * as qstring from 'querystring';

import { error, hadLoginError, hadDbError } from '../../error_config';
import * as Users from '../../models/user';

const mypageRouter: Router = Router();
mypageRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  readmypage(req, res);
});

function readmypage (req, res) {
  const userid = req.session.user;
  Users.findOne({ _id: userid }, (err, user) => {
    if (err) hadDbError(req, res);
    if (user) {
      res.send(user);
    }
  });
}

export { mypageRouter };
