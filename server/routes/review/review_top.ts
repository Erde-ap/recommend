import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError, hadDbError } from '../../error_config';
import * as Review from '../../models/review';

const reviewtopRouter: Router = Router();
reviewtopRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  Review[0].find({},null, { sort: { uday: -1 } },(err, account) => {
    if (err) return hadDbError(req, res);
    if (account) {
      res.send(account);
    }
  });
});

export { reviewtopRouter };
