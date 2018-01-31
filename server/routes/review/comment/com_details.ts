import * as http from 'http';
import { Router } from 'express';

import * as Review from '../../../models/review';

import { error, hadLoginError, hadDbError, hadFavoriteaddSuccess } from '../../../error_config';

const comdetails: Router = Router();
comdetails.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

});

export { comdetails };
