import { Credentials } from "./credentials.dto";

export interface Response {
    status: 'success' | 'error';
    message: string;
    data: Credentials | undefined;
}