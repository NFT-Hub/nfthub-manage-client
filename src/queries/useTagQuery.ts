import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getQueryKey, QueryKeyType } from './query-key/query-key';
import { AppApi } from '../api/api';
import { apiUrl, manageUrl } from '../api/url';
import { TagApi } from '../api/tag.api';
import { Tag } from '../domain/tag';
import { NftHubErrorResponse } from '../domain/error';

const getApi = () => {
    const api = new AppApi(apiUrl).setupPublic();
    return new TagApi(api);
};

const getManageApi = () => {
    const api = new AppApi(manageUrl).setupPublic();
    return new TagApi(api);
};

export const useTagsQuery = () => {
    const queryKey = getQueryKey(QueryKeyType.tag);
    return useQuery(queryKey.lists(), () => {
        return getApi().getTags();
    });
};

export const useTagsByKeywordQuery = (name: string) => {
    const queryKey = getQueryKey(QueryKeyType.tag);
    return useQuery(queryKey.detail(name), () => {
        return getApi().getTagsByKeyword(name);
    });
};

export const useTagQuery = (id: number) => {
    const queryKey = getQueryKey(QueryKeyType.tag);
    return useQuery(queryKey.detail(id), () => {
        return getApi().getTag(id);
    });
};

export const useTagInvalidation = () => {
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

export const useTagCreateMutation = () => {
    const { invalidList } = useTagInvalidation();
    return useMutation<Tag, NftHubErrorResponse, { name: string }>(
        ({ name }) => {
            return getManageApi().postTag(name);
        },
        {
            async onSuccess() {
                await invalidList();
            },
        }
    );
};

export const useTagUpdateMutation = () => {
    const { invalidList, invalidOne } = useTagInvalidation();
    return useMutation<Tag, NftHubErrorResponse, { id: number; name: string }>(
        ({ id, name }) => {
            return getManageApi().patchTag(id, name);
        },
        {
            async onSuccess(tag) {
                await invalidList();
                await invalidOne(tag.id);
            },
        }
    );
};

export const useTagDeleteMutation = () => {
    const { invalidList } = useTagInvalidation();
    return useMutation<unknown, NftHubErrorResponse, { id: number }>(
        ({ id }) => {
            return getManageApi().deleteTag(id);
        },
        {
            async onSuccess() {
                await invalidList();
            },
        }
    );
};
