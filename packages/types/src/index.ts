export interface TestRequest {
  body: any;
}

export interface TestResponse {
  status: 'OKAY' | 'ERROR';
  body: any;
}
