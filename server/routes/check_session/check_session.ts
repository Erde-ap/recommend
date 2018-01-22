import * as http from 'http';
import { Router } from 'express';

const checksessionRouter: Router = Router();

checksessionRouter.get('/' , (req: any, res, next)  => {
    // sessionを要求されたら返す
    const respsession = {
        response: req.session
    };
    res.send(respsession);
});

export { checksessionRouter };
