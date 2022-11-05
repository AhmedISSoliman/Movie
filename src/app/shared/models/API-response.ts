import { BaseResultResponse } from './base-result-response.model';
/** interface used to hold the base API response */
export interface APIResponse<T> extends BaseResultResponse {
  /** response data */
  message: T;
}
