import * as http from 'http';
import { Router } from 'express';

import * as Review from '../../models/review';

import { error, hadLoginError, hadDbError } from '../../error_config';

const reviewdetailRouter: Router = Router();
reviewdetailRouter.post('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

  Review[0].findOne({ _id: req.body.id },(err, review) => {
    if (err) return hadDbError(req, res);
    res.send(review);
  });
});

export { reviewdetailRouter };
