import {
  ApiErrorResponse,
  StandardErrorResponse,
} from "@/types/api-error.types";

type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "BAD_REQUEST"
  | "INTERNAL_SERVER_ERROR"
  | "UNKNOWN_ERROR";

type StatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 500;

export class ApiErrorHandler {
  private isStandardError(error: any): error is StandardErrorResponse {
    return error?.success === false && error?.error?.code;
  }

  getErrorMessage(errorResponse: ApiErrorResponse): string {
    if (this.isStandardError(errorResponse)) {
      return (
        errorResponse.error.message ||
        this.mapErrorCodeToMessage(errorResponse.error.code as ErrorCode)
      );
    } else {
      return (
        errorResponse.message ||
        this.mapStatusCodeToMessage(errorResponse.statusCode as StatusCode)
      );
    }
  }

  private mapErrorCodeToMessage(errorCode: ErrorCode): string {
    const errorMessages: Record<ErrorCode, string> = {
      VALIDATION_ERROR: "Please check your input and try again",
      UNAUTHORIZED: "Please log in to continue",
      FORBIDDEN: "You don't have permission to do this",
      NOT_FOUND: "The requested resource was not found",
      CONFLICT: "This already exists. Please choose a different value",
      BAD_REQUEST: "Invalid request. Please check your input",
      INTERNAL_SERVER_ERROR:
        "Something went wrong on our end. Please try again",
      UNKNOWN_ERROR: "An unexpected error occurred",
    };

    return errorMessages[errorCode] || "An unexpected error occurred";
  }

  private mapStatusCodeToMessage(statusCode: StatusCode): string {
    const statusMessages: Record<StatusCode, string> = {
      400: "Invalid request. Please check your input",
      401: "Please log in to continue",
      403: "You don't have permission to do this",
      404: "The requested resource was not found",
      409: "This already exists. Please choose a different value",
      422: "Please check your input and try again",
      500: "Something went wrong on our end. Please try again",
    };

    return statusMessages[statusCode] || "An unexpected error occurred";
  }

  getErrorDetails(errorResponse: ApiErrorResponse): any {
    if (this.isStandardError(errorResponse)) {
      return errorResponse.error.details;
    }
    return null;
  }
}

export const apiErrorHandler = new ApiErrorHandler();
