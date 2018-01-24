import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError } from '../../error_config';

const searchreviewRouter: Router = Router();
searchreviewRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

});

export { searchreviewRouter };
