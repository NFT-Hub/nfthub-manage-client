import { AppApi, FetchParams } from '../api/api';
import { apiUrl, manageUrl } from '../api/url';
import { getQueryKey, QueryKeyType } from './query-key/query-key';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { NftHubErrorResponse } from '../domain/error';
import { MagazineApi } from '../api/magazine.api';
import { MagazineCreateRequest, MagazineResponse, MagazineUpdateRequest } from '../domain/magazine';

const getApi = () => {
    const api = new AppApi(apiUrl).setupPublic();
    return new MagazineApi(api);
};

const getManageApi = () => {
    const api = new AppApi(manageUrl).setupPublic();
    return new MagazineApi(api);
};

export const useMagazinesQuery = (options: FetchParams) => {
    const queryKey = getQueryKey(QueryKeyType.tag);
    return useQuery(queryKey.lists(), () => {
        return getApi().getMagazines(options);
    });
};

export const useMagazineQuery = (id: number) => {
    const queryKey = getQueryKey(QueryKeyType.tag);
    return useQuery(queryKey.detail(id), () => {
        return getApi().getMagazine(id);
    });
};

export const useMagazineInvalidation = () => {
    const queryClient = useQueryClient();
    const queryKey = getQueryKey(QueryKeyType.tag);
    const invalidList = async () => {
        await queryClient.invalidateQueries(queryKey.lists());
    };
    const invalidOne = async (id: number) => {
        await queryClient.invalidateQueries(queryKey.detail(id));
    };
    return {
        invalidList,
        invalidOne,
    };
};

export const useMagazineCreateMutation = () => {
    const { invalidList } = useMagazineInvalidation();
    return useMutation<MagazineResponse, NftHubErrorResponse, { request: MagazineCreateRequest }>(
        ({ request }) => {
            return getManageApi().postMagazine(request);
        },
        {
            async onSuccess() {
                await invalidList();
            },
        }
    );
};

export const useMagazineUpdateMutation = () => {
    const { invalidList, invalidOne } = useMagazineInvalidation();
    return useMutation<
        MagazineResponse,
        NftHubErrorResponse,
        { id: number; request: MagazineUpdateRequest }
    >(
        ({ id, request }) => {
            return getManageApi().patchMagazine(id, request);
        },
        {
            async onSuccess(tag) {
                await invalidList();
                await invalidOne(tag.id);
            },
        }
    );
};

export const useMagazineDeleteMutation = () => {
    const { invalidList } = useMagazineInvalidation();
    return useMutation<unknown, NftHubErrorResponse, { id: number }>(
        ({ id }) => {
            return getManageApi().deleteMagazine(id);
        },
        {
            async onSuccess() {
                await invalidList();
            },
        }
    );
};

export const useSetMagazineImageMainMutation = () => {
    const { invalidList, invalidOne } = useMagazineInvalidation();
    return useMutation<MagazineResponse, NftHubErrorResponse, { id: number; imageId: number }>(
        ({ id, imageId }) => {
            return getManageApi().setMagazineImage(id, imageId);
        },
        {
            async onSuccess(tag) {
                await invalidList();
                await invalidOne(tag.id);
            },
        }
    );
};

export const useMagazineImageCreateMutation = () => {
    const { invalidList, invalidOne } = useMagazineInvalidation();
    return useMutation<MagazineResponse, NftHubErrorResponse, { id: number; files: File[] }>(
        ({ id, files }) => {
            return getManageApi().putMagazineImage(id, files);
        },
        {
            async onSuccess(tag) {
                await invalidList();
                await invalidOne(tag.id);
            },
        }
    );
};

export const useMagazineImageUpdateMutation = () => {
    const { invalidList, invalidOne } = useMagazineInvalidation();
    return useMutation<
        MagazineResponse,
        NftHubErrorResponse,
        { id: number; imageId: number; file: File }
    >(
        ({ id, file, imageId }) => {
            return getManageApi().updateMagazineImage(id, imageId, file);
        },
        {
            async onSuccess(tag) {
                await invalidList();
                await invalidOne(tag.id);
            },
        }
    );
};

export const useMagazineImageDeleteMutation = () => {
    const { invalidList, invalidOne } = useMagazineInvalidation();
    return useMutation<MagazineResponse, NftHubErrorResponse, { id: number; imageId: number }>(
        ({ id, imageId }) => {
            return getManageApi().deleteMagazineImage(id, imageId);
        },
        {
            async onSuccess(tag) {
                await invalidList();
                await invalidOne(tag.id);
            },
        }
    );
};
