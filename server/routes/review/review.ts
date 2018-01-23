import * as http from 'http';
import { Router } from 'express';

import { error } from '../../error_config';

const reviewRouter: Router = Router();

reviewRouter.post('/' , (req: any, res, next) => {
});

export { reviewRouter };
