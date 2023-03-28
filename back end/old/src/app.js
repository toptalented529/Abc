import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from "./routes/index.js";


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(morgan('dev'));

app.use("/",routes)

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        message: err.message
    })
})

export default app;
