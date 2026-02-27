export interface StandardErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
  path: string;
  statusCode: number;
}

export interface HttpExceptionResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  stack?: string;
}

export type ApiErrorResponse = StandardErrorResponse | HttpExceptionResponse;
