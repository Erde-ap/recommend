import * as http from 'http';
import { Router } from 'express';

import { error } from '../../error_config';

const logoutRouter: Router = Router();

logoutRouter.get('/' , (req: any, res, next) => {
    // ログアウト処理
  req.session.destroy(function (err) {
    if (err) return hadLogoutError(req, res);
    res.send(error.status[0]);
  });
    // angular4にlogoutが終わった事を伝える
});

// エラーハンドル
function hadLogoutError (req, res) {
  res.send(error.status[22]);
}

export { logoutRouter };
