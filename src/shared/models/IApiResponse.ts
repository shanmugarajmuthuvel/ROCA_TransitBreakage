export interface IApiResponse<T> {
  data: T;
  success: boolean;
  errorMessage?: string;
}
