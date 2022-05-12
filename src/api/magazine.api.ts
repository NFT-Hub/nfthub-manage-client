import { AppApi, AppApiUtil, FetchParams } from './api';
import {
    MagazineCreateRequest,
    MagazinePageResponse,
    MagazineResponse,
    MagazineUpdateRequest,
} from '../domain/magazine';

export class MagazineApi {
    constructor(private api: AppApi) {}

    async getMagazines(options: FetchParams): Promise<MagazinePageResponse> {
        return (await this.api.INSTANCE.get(`/magazines${AppApiUtil.getUrlParams(options)}`)).data;
    }

    async getMagazine(id: number): Promise<MagazineResponse> {
        return (await this.api.INSTANCE.get(`/magazines/${id}`)).data;
    }

    async postMagazine(request: MagazineCreateRequest): Promise<MagazineResponse> {
        return (await this.api.INSTANCE.post(`/magazines`, request)).data;
    }

    async patchMagazine(id: number, request: MagazineUpdateRequest): Promise<MagazineResponse> {
        return (await this.api.INSTANCE.patch(`/magazines/${id}`, request)).data;
    }

    async deleteMagazine(id: number) {
        return (await this.api.INSTANCE.delete(`/magazines/${id}`)).data;
    }

    async putMagazineImage(id: number, files: File[]): Promise<MagazineResponse> {
        const form = new FormData();
        files.forEach((file) => form.append('file', file));
        return (await this.api.INSTANCE.put<MagazineResponse>(`/magazines/${id}/images`, form))
            .data;
    }

    async updateMagazineImage(id: number, imageId: number, file: File): Promise<MagazineResponse> {
        const form = new FormData();
        form.append('file', file);
        return (
            await this.api.INSTANCE.put<MagazineResponse>(
                `/magazines/${id}/images/${imageId}`,
                form
            )
        ).data;
    }

    async deleteMagazineImage(id: number, imageId: number) {
        return (await this.api.INSTANCE.delete(`/magazines/${id}/images/${imageId}`)).data;
    }

    async setMagazineImage(id: number, imageId: number): Promise<MagazineResponse> {
        return (await this.api.INSTANCE.put(`/magazines/${id}/images/${imageId}/main`)).data;
    }
}
