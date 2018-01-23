import * as http from 'http';
import { Router } from 'express';

const mypageRouter: Router = Router();
mypageRouter.get('/' , (req: any, res, next) => {
});

export { mypageRouter };
