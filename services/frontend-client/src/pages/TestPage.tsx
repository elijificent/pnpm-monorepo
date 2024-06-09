'use client';

import React from 'react';

import { TestRequest } from '@pnpm-project/types';

const request: TestRequest = {
  body: {
    message: 'Hello from the frontend client!',
  },
};

export default function TestPage() {
  return <main>{request.body.message}</main>;
}
