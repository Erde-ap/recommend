import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError } from '../../error_config';

const reviewRouter: Router = Router();

reviewRouter.post('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
});

export { reviewRouter };
