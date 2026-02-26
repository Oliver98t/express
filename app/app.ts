import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// custom routers
import indexRouter from './routes/Index';
import userRouter from './routes/UserRouter';
import itemRouter from "./routes/ItemRouter";
import { debug } from 'console';

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// setup routers
app.use('/', indexRouter);
app.use("/item", itemRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
interface ExpressError extends Error {
    status?: number
}
app.use(function (
    err: ExpressError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error pagesdsd
    res.status(err.status || 500);
    res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
});
});

export default app;