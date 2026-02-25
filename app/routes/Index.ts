import express from 'express';
import { StatusCodes } from 'http-status-codes';
var router = express.Router();

/* Default route. */
router.get('/', function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {
  res.status(StatusCodes.OK).json({"status": "up"})
});

export default router;
