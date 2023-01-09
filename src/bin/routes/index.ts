import { Router } from 'express';
import AuthRoutes from './AuthRoutes';

class Routes {
    public router:Router = Router();

    constructor(){
        this.config();
    }
    
    private config(){
        this.router.use("/auth",AuthRoutes.routes);
    }
}

export default new Routes;