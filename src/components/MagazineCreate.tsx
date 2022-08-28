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
} from '../queries/useMagazineQuery';
import ImageInput from './imageinput/ImageInput';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MagazineCreate: React.FC<{
    onClickCloseButton: () => void;
}> = ({ onClickCloseButton }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { values, setValue } = useFormInputs({
        selectedTags: [] as Tag[],
        title: '',
        description: '',
        url: '',
        author: '',
        image: '' as string | File,
    });

    const tagListQuery = useTagsByKeywordQuery(searchKeyword);
    const createTag = useTagCreateMutation();
    const createMagazineMutation = useMagazineCreateMutation();
    const createMagazineImageMutation = useMagazineImageCreateMutation();

    const tagListResponse = tagListQuery.data || [];

    const createMagazine = async () => {
        const result = await createMagazineMutation.mutateAsync(
            {
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
        const needToCreate = typeof values.image != 'string';
        if (needToCreate) {
            await createMagazineImageMutation.mutateAsync(
                {
                    id: result.id,
                    files: [values.image as File],
                },
                {
                    onError(res) {
                        setErrorMessage(res.response?.data.message || '');
                    },
                }
            );
        }
        onClickCloseButton();
    };

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
                    image={values.image}
                    setImage={(file) => {
                        setValue('image', file);
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
                <Button onClick={createMagazine} variant={'contained'}>
                    생성하기
                </Button>
                <Button onClick={onClickCloseButton}>취소하기</Button>
            </FlexboxToCenterItems>
        </FlexboxColumnItems>
    );
};

export default MagazineCreate;
