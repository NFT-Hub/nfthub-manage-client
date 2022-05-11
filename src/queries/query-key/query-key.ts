export enum QueryKeyType {
    user = 'user',
    tag = 'tag',
    category = 'category',
    magazine = 'magazine',
}

const KeyInstanceFactory = (key: QueryKeyType, ...clientAuth: (string | number)[]) => {
    const Key = {
        base: () => [key, ...clientAuth],
        lists: () => [...Key.base(), 'list'],
        list: (options: any) => [...Key.lists(), options],
        details: () => [...Key.base(), 'detail'],
        detail: (...args: any[]) => [...Key.details(), ...args]
    };
    return Key;
};

export const getQueryKey = (key: QueryKeyType) => {
    return KeyInstanceFactory(key);
};
