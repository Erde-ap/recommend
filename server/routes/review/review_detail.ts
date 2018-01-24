import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError } from '../../error_config';

const reviewdetailRouter: Router = Router();
reviewdetailRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

});

export { reviewdetailRouter };
