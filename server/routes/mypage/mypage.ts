import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError } from '../../error_config';

const mypageRouter: Router = Router();
mypageRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
});

export { mypageRouter };
