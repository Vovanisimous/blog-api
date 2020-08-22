import axios, { AxiosInstance, AxiosResponse } from "axios";

export class HttpTransport {
    private client: AxiosInstance = axios.create();
    private readonly handlers: Array<(error?: Error) => void> = [];

    public init(serverUrl: string): void {
        this.client = axios.create({
            baseURL: serverUrl,
        });
    }

    public subscribe(handler: (error?: Error) => void): void {
        this.handlers.push(handler);
    }

    public get<R extends object>(url: string, params?: object): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            this.client
                .get(url, { params })
                .then((response: AxiosResponse<R>) => {
                    return resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                    this.handlers.forEach((handler) => handler(error));
                });
        });
    }

    public put<R extends object, B extends object>(
        url: string,
        body: B,
        params?: object,
    ): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            this.client
                .put(url, { ...body }, { params })
                .then((response: AxiosResponse<R>) => {
                    return resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                    this.handlers.forEach((handler) => handler(error));
                });
        });
    }

    public post<R extends object, B extends object>(
        url: string,
        body: B,
        params?: object,
    ): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            this.client
                .post(url, { ...body }, { params })
                .then((response: AxiosResponse<R>) => {
                    return resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                    this.handlers.forEach((handler) => handler(error));
                });
        });
    }

    async delete<Response = void>(url: string, params?: object): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            this.client
                .delete(url, { params })
                .then((response) => {
                    return resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                    this.handlers.forEach((handler) => handler(error));
                });
        });
    }
}

export const transport = new HttpTransport();
