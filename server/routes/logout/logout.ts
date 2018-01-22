import * as http from 'http';
import { Router } from 'express';

const logoutRouter: Router = Router();

logoutRouter.get('/' , (req: any, res, next)  => {
    // ログアウト処理
    req.session.destroy(function(err) {
        if (err) return hadLogoutError(req, res);
        const error = {
            status: 'ログアウトしました',
            session: req.session
        };
        res.send(error);
    });
    // angular4にlogoutが終わった事を伝える
});

// エラーハンドル
function hadLogoutError(req, res) {
    const error = {status: 'ログアウト出来ませんでした'};
    res.send(error);
}

export { logoutRouter };
