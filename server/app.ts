import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as connect from 'connect';
import * as mongoose from 'mongoose';
import * as mongo from "connect-mongo";
import * as corser from 'corser';

import { getPhash, getHash, getRand, MONGO_URL_REVIEW, MONGO_URL_USER, MONGO_URL_SESSION } from './config';

const MongoStore = mongo(session);
let store = new MongoStore({ //セッション管理用DB接続設定
  url: MONGO_URL_SESSION,
  ttl: 60 * 60 //1hour
});

import * as passport from 'passport';

import * as Users   from './models/user';

import { registerRouter } from './routes/register/register';
import { loginRouter } from './routes/login/login';
import { logoutRouter } from './routes/logout/logout';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    // プロキシで通信をする
    // this.express.set('trust proxy', 1);

    /**
    * CORSを許可.
    */
    this.express.use(corser.create());
    // this.express.use((req, res, next)=> {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   next();
    // });

    // 接続する MongoDB の設定
    mongoose.connect(process.env.MONGO_URL_USER || MONGO_URL_USER || MONGO_URL_REVIEW, {
      useMongoClient: true,
    });
    process.on('SIGINT', () => { 
      mongoose.disconnect(); 
    });

    this.express.use(logger('dev'));//ログ用
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(session({
        secret: 'ioukitty',
        store: store,
        resave: true,
        saveUninitialized: true,
        rolling: true,
        cookie: {
          secure: false,
          httpOnly: true,
          maxAge: 60 * 60 * 1000
        }
    }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
  }

  private routes(): void {
    // 静的資産へのルーティング
    this.express.use(express.static(path.join(__dirname, 'public')));
    this.express.use('/static',express.static(path.join(__dirname, 'public')));
    this.express.use('/api/register',  registerRouter);
    this.express.use('/api/login', loginRouter);
    this.express.use('/api/logout', logoutRouter);

    //ミドルウェアを使いつくしたので404を生成 
    this.express.use((err, req, res, next) => {
      // var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

      // error handlers
    // development error handler
    // will print stacktrace
    if (this.express.get('env') === 'development') {
      this.express.use((err, req, res, next) => {
          res.status(err.status || 500);
          console.log(err.message);
          console.log(err);
      });
    }

    // production error handler
    // no stacktraces leaked to user
    this.express.use((err, req, res, next) => {
      res.status(err.status || 500);
        console.log(err.message);
        console.log(err);
    });
  }
}

export default new App().express;