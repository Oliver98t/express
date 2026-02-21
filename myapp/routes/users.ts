import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction) {
  res.send([1,2,3,4,5]);
});

export default router;
