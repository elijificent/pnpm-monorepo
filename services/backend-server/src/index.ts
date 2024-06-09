import express, { Request, Response } from 'express';
import cors from 'cors';
import { TestRequest, TestResponse } from '@pnpm-project/types';

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
