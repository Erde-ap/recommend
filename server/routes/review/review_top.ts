import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError } from '../../error_config';

const reviewtopRouter: Router = Router();
reviewtopRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

});

export { reviewtopRouter };
