import { Router } from 'express';

const routerhealth = Router();

routerhealth.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
export default routerhealth;
