
class ApiResponse {
  constructor(
    statusCode,
    data,
    message = "Request successful"
  ) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.status = this.success ? "success" : "error";
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
