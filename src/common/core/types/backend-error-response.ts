export interface BackendErrorMessages {
    [key: string]: string;
}

export interface BackendErrorResponse<T = BackendErrorMessages> {
    status: 'error';
    messages: T;
}
