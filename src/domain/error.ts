import { AxiosError } from 'axios';

export type NftHubErrorResponse = AxiosError<{
    exception: string;
    message: string;
}>;
