import axios, { AxiosInstance } from 'axios';

export type FetchParams = {
    [k: string]: string | number | boolean | string[] | number[] | boolean[] | undefined;
};

export class AppApiUtil {
    static getUrlParams(params: FetchParams) {
        const result = Object.entries(params)
            .map(([key, option]) => {
                if (Array.isArray(option)) {
                    return (option as any[])
                        .filter((el) => this.validateOption(el))
                        .map((el) => `${key}=${el}`)
                        .join('&');
                }
                if (!this.validateOption(option)) return;
                return `${key}=${option}`;
            })
            .filter((el) => el)
            .join('&');
        return result ? `?${result}` : '';
    }

    static validateOption(option: string | number | boolean | undefined) {
        if (option === undefined) return false;
        if (option < 0) return false;
        if (option === '') return false;
        return true;
    }
}

export class AppApi {
    url: string;
    INSTANCE: AxiosInstance = axios;

    constructor(url: string) {
        this.url = url;
    }

    setup(token: string) {
        this.INSTANCE = axios.create({
            baseURL: `${this.url}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return this;
    }

    setupPublic() {
        this.INSTANCE = axios.create({
            baseURL: `${this.url}`,
        });
        return this;
    }
}
