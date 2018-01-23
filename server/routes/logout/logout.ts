import * as http from 'http';
import { Router } from 'express';

import { error } from '../../error_config';

const logoutRouter: Router = Router();

logoutRouter.get('/' , (req: any, res, next) => {
    // ログアウト処理
  req.session.destroy((err) => {
    if (err) return hadLogoutError(req, res);
    res.send(error.status[25]);
  });
});

// エラーハンドル
function hadLogoutError (req, res) {
  res.send(error.status[22]);
}

export { logoutRouter };
