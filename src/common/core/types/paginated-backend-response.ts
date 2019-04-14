import {Observable} from 'rxjs';
import {PaginationResponse} from './pagination-response';

export interface PaginatedBackendResponse<T> extends Observable<PaginationResponse<T>> {}
