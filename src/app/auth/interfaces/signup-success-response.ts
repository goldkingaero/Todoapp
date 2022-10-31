export interface SignupSuccessResponse {
  accessToken: string;
  user: {
    email: string;
    id: number
  }
}
