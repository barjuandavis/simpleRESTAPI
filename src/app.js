import express from 'express';
const app = express();
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import productRoutes from './api/routes/products';
import orderRoutes from './api/routes/orders';

/*
    replace MONGO_ATLAS_PW with your account password. 
    The environtment file is nodemon.json at the root
    of this project.
*/ 
mongoose.connect(
    'mongodb+srv://admin:'+ process.env.MONGO_ATLAS_PW + '@node-rest-api-ir5pt.mongodb.net/test?retryWrites=true&w=majority', 
);

app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // allow access to anyone
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'); //headers that is allowed in the request
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'GET, POST, PUT, PATCH, DELETE'); //what kind of request allowed
        return res.status(200).json({});
    }
    next();
}); //prevent CORS errors from client requests


/* 
    Morgan dipake untuk nge-log setiap request yang nyampe ke api.
    Pada saat nyampe, kalo ada error apapun, kita bisa pake info yang 
    ditangkep sama morgan untuk proses lebih lanjut.-
*/
app.use('/products',productRoutes);
app.use('/orders',orderRoutes); 
// ERROR HANDLING
app.use((req, res, next) => {
    let error = new Error("Hello. This an error.");
    error.status = 404;
    next(error);
});
    
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


export default app;
