import { AppApi } from './api';
import { Tag, TagListResponse } from '../domain/tag';

export class TagApi {
    constructor(private api: AppApi) {}

    async getTag(id: number): Promise<Tag> {
        return (await this.api.INSTANCE.get<Tag>(`/tags/${id}`)).data;
    }

    async getTags(): Promise<TagListResponse> {
        return (await this.api.INSTANCE.get<TagListResponse>('/tags')).data;
    }

    async getTagsByKeyword(keyword: String): Promise<TagListResponse> {
        return (await this.api.INSTANCE.get<TagListResponse>(`/tags/search?keyword=${keyword}`))
            .data;
    }

    async postTag(name: string): Promise<Tag> {
        return (
            await this.api.INSTANCE.post('/tags', name, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            })
        ).data;
    }

    async patchTag(id: number, name: string): Promise<Tag> {
        return (
            await this.api.INSTANCE.patch(`/tags/${id}`, name, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            })
        ).data;
    }

    async deleteTag(id: number) {
        return await this.api.INSTANCE.delete(`tags/${id}`);
    }
}
