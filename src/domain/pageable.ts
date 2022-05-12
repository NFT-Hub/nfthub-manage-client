export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    offset: number;
}

export interface Pagination<T> {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    sort: Sort;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    content: T[];
    empty: boolean;
}

export const paginationFactory = <T>(content: T[]): Pagination<T> => {
    return {
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
        sort: {
            sorted: true,
            unsorted: true,
            empty: true,
        },
        number: 0,
        numberOfElements: 0,
        pageable: {
            sort: {
                sorted: true,
                unsorted: true,
                empty: true,
            },
            pageNumber: 0,
            pageSize: 0,
            paged: true,
            unpaged: true,
            offset: 0,
        },
        size: 0,
        content: content,
        empty: true,
    };
};
