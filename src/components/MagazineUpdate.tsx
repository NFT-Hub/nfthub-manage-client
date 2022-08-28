import {
    FlexboxColumnItems,
    FlexboxToCenterItems,
    FlexboxRowItems,
    FlexboxRowSpaceBetween,
} from '../../styles/layout';
import {
    Button,
    IconButton,
    TextField,
    Typography,
    Popover,
    ListItem,
    ListItemButton,
    ListItemText,
    Autocomplete,
    Checkbox,
    Chip,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useTagCreateMutation, useTagsByKeywordQuery, useTagsQuery } from '../queries/useTagQuery';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Tag } from '../domain/tag';
import { MagazineResponse } from '../domain/magazine';
import useFormInputs from '../hooks/useFormInputs';
import {
    useMagazineCreateMutation,
    useMagazineImageCreateMutation,
    useMagazineImageDeleteMutation,
    useMagazineImageUpdateMutation,
    useMagazineInvalidation,
    useMagazineQuery,
    useMagazineUpdateMutation,
} from '../queries/useMagazineQuery';
import { Category } from '../domain/category';
import ImageInput from './imageinput/ImageInput';
import { ValidationCheck } from './imageinput/formValidation';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MagazineUpdate: React.FC<{
    onClickCloseButton: () => void;
    id: number;
}> = ({ onClickCloseButton, id }) => {
    const { data } = useMagazineQuery(id);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { values, setValue, setValues, onCheck } = useFormInputs(
        {
            selectedTags: [] as Tag[],
            title: '',
            description: '',
            url: '',
            author: '',
            category: undefined as Category | undefined,
            firstImage: data?.images[0]?.url || ('' as string | File),
        },
        {
            firstImage: {
                onCheck: (value: string | File) => {
                    if (typeof value === 'string') {
                        return '';
                    }
                    return ValidationCheck.file(value as File)
                        .max(10, '10mb 이하의 이미지 파일을 업로드해주세요.')
                        .type('image', 'jpg, jpeg, png 이미지를 업로드 해주세요.').errorMessage;
                },
                onChange: (value: string | File) => {
                    return ValidationCheck.file(value as File)
                        .max(10, '10mb 이하의 이미지 파일을 업로드해주세요.')
                        .type('image', 'jpg, jpeg, png 이미지를 업로드 해주세요.').errorMessage;
                },
            },
        }
    );

    useEffect(() => {
        if (!data) return;
        setValues({
            selectedTags: data.tags,
            title: data.title,
            description: data.description,
            url: data.url,
            author: data.author,
            category: data.category,
            firstImage: data?.images[0]?.url || '',
        });
    }, [data]);

    const tagListQuery = useTagsByKeywordQuery(searchKeyword);

    const { invalidList } = useMagazineInvalidation();
    const createTag = useTagCreateMutation();
    const updateMagazineMutation = useMagazineUpdateMutation();
    const updateMagazineImageMutation = useMagazineImageUpdateMutation();
    const createMagazineImageMutation = useMagazineImageCreateMutation();

    const updateMagazine = async () => {
        if (!onCheck()) {
            setErrorMessage('입력사항을 확인해주세요');
            return;
        }
        await updateMagazineMutation.mutateAsync(
            {
                id: id,
                request: {
                    title: values.title,
                    author: values.author,
                    description: values.description,
                    tagIds: values.selectedTags.map((el) => el.id),
                    url: values.url,
                },
            },
            {
                onError(res) {
                    setErrorMessage(res.response?.data.message || '');
                },
            }
        );
        const previousImage = data?.images[0];
        const isNewImage = typeof values.firstImage != 'string';
        const needToCreate = isNewImage && !previousImage;
        const needToUpdate = isNewImage && previousImage;
        if (needToCreate) {
            await createMagazineImageMutation.mutateAsync(
                {
                    id: id,
                    files: [values.firstImage as File],
                },
                {
                    onError(res) {
                        setErrorMessage(res.response?.data.message || '');
                    },
                }
            );
        }
        if (needToUpdate) {
            await updateMagazineImageMutation.mutateAsync(
                {
                    id: id,
                    imageId: previousImage.id,
                    file: values.firstImage as File,
                },
                {
                    onError(res) {
                        setErrorMessage(res.response?.data.message || '');
                    },
                }
            );
        }
        setErrorMessage('수정이 완료되었습니다.');
        onClickCloseButton();
    };

    const tagListResponse = tagListQuery.data || [];

    return (
        <FlexboxColumnItems>
            <TextField
                sx={{
                    maxWidth: '500px',
                }}
                label={'Title'}
                multiline={true}
                maxRows={2}
                value={values.title}
                onChange={(e) => {
                    setValue('title', e.target.value);
                }}
            />
            <TextField
                label={'Description'}
                multiline={true}
                minRows={4}
                maxRows={5}
                value={values.description}
                onChange={(e) => {
                    setValue('description', e.target.value);
                }}
            />
            <TextField
                label={'Url'}
                value={values.url}
                onChange={(e) => {
                    setValue('url', e.target.value);
                }}
            />
            <TextField
                label={'Author'}
                value={values.author}
                onChange={(e) => {
                    setValue('author', e.target.value);
                }}
            />
            <Autocomplete
                multiple
                options={tagListResponse}
                value={values.selectedTags}
                onChange={(e, value) => {
                    setValue('selectedTags', value);
                }}
                isOptionEqualToValue={(option, value) => {
                    return option.name === value.name;
                }}
                noOptionsText={
                    <>
                        <ListItemButton
                            onClick={() => {
                                createTag.mutateAsync(
                                    { name: searchKeyword },
                                    {
                                        onSuccess(data) {
                                            setValue('selectedTags', data, (input, prev) => {
                                                return [...prev, input];
                                            });
                                            setSearchKeyword('');
                                        },
                                    }
                                );
                            }}
                        >
                            생성하기
                        </ListItemButton>
                    </>
                }
                getOptionLabel={(tag) => tag.name}
                renderOption={(props, option, { selected }) => {
                    return (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.name}
                        </li>
                    );
                }}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <Chip label={option.name} {...getTagProps({ index })} />
                    ))
                }
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onChange={(e) => {
                            setSearchKeyword(e.target.value);
                        }}
                        label="Tags"
                        placeholder="Select Tags"
                    />
                )}
            />
            <div>
                <ImageInput
                    id={'0'}
                    image={values.firstImage}
                    setImage={(file) => {
                        setValue('firstImage', file);
                    }}
                />
            </div>
            {errorMessage && (
                <FlexboxToCenterItems>
                    <Typography
                        sx={{
                            color: 'red',
                        }}
                    >
                        {errorMessage}
                    </Typography>
                </FlexboxToCenterItems>
            )}

            <FlexboxToCenterItems>
                <Button onClick={updateMagazine} variant={'contained'}>
                    수정하기
                </Button>
                <Button onClick={onClickCloseButton}>취소하기</Button>
            </FlexboxToCenterItems>
        </FlexboxColumnItems>
    );
};

export default MagazineUpdate;
