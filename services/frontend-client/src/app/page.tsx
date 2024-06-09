import { TestRequest } from '@pnpm-project/types';

const request: TestRequest = {
  body: {
    message: 'Hello from the frontend client!',
  },
};
console.log(request);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
