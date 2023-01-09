import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { CustomError } from './bin/custom/Error'
import Log from './bin/custom/Log';
import Routes from './bin/routes';
// import { Routes } from './api/routes';

class App {
  public app: Application;
  // public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    // this.routePrv.routes(this.app);

  }
  
  
  private config(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.json({limit:'50mb'}));
    this.app.use(bodyParser.urlencoded({ limit: '50mb',  extended: true , parameterLimit:50000}));


    //******* HIDING EXPRESS *******\\
    this.app.set('x-powered-by', false);
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      res.header('Efforts', ':)');
      next();
    });

    this.app.use("/",Routes.router)

    // //******* ERROR HANDLING *******\\
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const error = new CustomError(
        'Not Found!',
        `Uh oh! the path you are trying to reach we can't find it, we've checked each an every corner!`,
        404,
        ''
      );
      next(error);
    });

    this.app.use((error:CustomError,req: Request, res: Response, next: NextFunction) => {
      Log.error(error.message)
      res.status(error.code || 500).json({
        error: true,
        data:error,
      });
    });
  }
}

export default new App().app;