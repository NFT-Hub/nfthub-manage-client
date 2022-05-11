import { Pagination } from './pageable';
import { Category } from './category';
import { Tag } from './tag';

export interface MagazineImageResponse {
    id: number;
    url: string;
    main: boolean;
}

export interface MagazineResponse {
    id: number;
    title: string;
    description: string;
    url: string;
    author: string;
    category: Category;
    tags: Tag[];
    images: MagazineImageResponse[];
}

export interface MagazineCreateRequest {
    title: string;
    description: string;
    url: string;
    author: string;
    categoryId?: number;
    tagIds?: number[];
}

export type MagazineUpdateRequest = Partial<MagazineCreateRequest>;

export type MagazinesPageResponse = Pagination<MagazinesPageResponse>;
