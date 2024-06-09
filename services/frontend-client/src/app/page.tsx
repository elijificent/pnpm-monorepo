import { TestRequest } from '@pnpm-project/types';

const request: TestRequest = {
  body: {
    message: 'Hello from the frontend client!',
  },
};

export default function Home() {
  return <main>{request.body.message}</main>;
}
