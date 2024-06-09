import express, { Request, Response } from 'express';
import cors from 'cors';
import { TestRequest } from '@pnpm-project/types';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  const request: TestRequest = {
    body: {
      message: 'Hello from the backend server!',
    },
  };

  res.json(request);
});

const server = app.listen(port, () => {
  // Running
});

export default app;
export { server };
