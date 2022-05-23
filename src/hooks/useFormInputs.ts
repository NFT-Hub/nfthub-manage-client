import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * 1. parameter
 *  - init: 처음에 설정할 값 (맨 처음 선언시 단 한번만 작동함. 이후, init이 변화해도 반영되지 않음)
 *  - checkValidation: [미구현]
 *      - onChange: 값이 바뀔때마다 검증 후 errorMessage 설정
 *      - onSubmit: 이벤트 발생시, 검증 후 errorMessage 설정
 * 2. core
 *  - values: init으로 설정한 property 접근
 *  - setValue: 특정 값 업데이트
 *  - setValues: 전체 값 업데이트, 타입 동일해야함
 *  - errorMessage: 특정 input에 대한 에러메세지 접근
 *  - setError: 특정 input에 대한 에러메세지 설정
 *  - resetValue: 특정 값 init으로 초기화
 *  - resetValues: 모든 값 init으로 초기화
 *  - isAllFilled: 모든 값 채워졌는지 체크
 *  - isAllValid: 모든 값에 errorMessage가 있는지 체크
 *
 *  cf)
 *  values 중 일부의 값이 바뀌면 values 와 관련된 컴포넌트는 모두 재렌더링 된다는 점 참고
 * */

export type ValidationCallback<T, K extends keyof T> = (
    value: any,
    context: {
        values: T;
        errors: { [key in K]?: string };
    }
) => string;

function useFormInputs<T, V extends T[keyof T], K extends keyof T>(
    init: T,
    checkValidation: {
        [key in K]?: {
            onChange?: ValidationCallback<T, K>;
            onCheck?: ValidationCallback<T, K>;
        };
    } = {},
    options: {
        [key in K]?: {
            invalidValueBlock: boolean;
        };
    } = {}
) {
    const [initValues, setInitValues] = useState(init);
    const [values, setValues] = useState<T>(init);
    const [errors, setErrors] = useState<{ [key in K]?: string }>({});
    const context = useMemo(() => {
        return {
            values,
            errors,
        };
    }, [values, errors]);

    useEffect(() => {
        setValues(init);
    }, []);

    useEffect(() => {
        let messages: { [key in K]?: string } = {};
        (Object.keys(init) as K[]).forEach((key) => {
            messages[key] = '';
        });
        setErrors(messages);
    }, []);

    const onCheck = useCallback(() => {
        let isValid = true;
        (Object.keys(values) as K[]).forEach((key) => {
            const onCheckValidationChecker = checkValidation[key]?.onCheck;
            if (onCheckValidationChecker) {
                const error = onCheckValidationChecker(values[key], context);
                if (error) isValid = false;
                setError(key, error);
            }
        });
        return isValid;
    }, [context]);

    const setValue = useCallback(
        (key: keyof T, input: any, middleWare?: (input: any, prev: any) => any) => {
            setValues((prev) => {
                const prevValue = prev[key];
                const inputValue = middleWare ? middleWare(input, prevValue) : input;
                const onChangeValidationChecker = checkValidation[key]?.onChange;
                const errorMsg = onChangeValidationChecker
                    ? onChangeValidationChecker(inputValue, context)
                    : '';
                setError(key, errorMsg);
                const prevValueInvalidBlock = options[key]?.invalidValueBlock;
                const valueResult = !!errorMsg && prevValueInvalidBlock ? prevValue : inputValue;
                return { ...prev, [key]: valueResult };
            });
        },
        [context]
    );
    const setError = useCallback((key: keyof T, input: string) => {
        setErrors((prev) => ({ ...prev, [key]: input }));
    }, []);

    const resetValue = useCallback(
        (key: keyof T) => {
            setValues((prev) => ({ ...prev, [key]: initValues[key] }));
        },
        [initValues]
    );
    const resetValues = useCallback(() => {
        setValues(initValues);
    }, [initValues]);

    const resetError = useCallback((key: keyof T) => {
        setErrors((prev) => ({ ...prev, [key]: '' }));
    }, []);
    const resetErrors = useCallback(() => {
        let messages: { [key in K]?: string } = {};
        (Object.keys(init) as K[]).forEach((key) => {
            messages[key] = '';
        });
        setErrors(messages);
    }, [init]);

    const isAllFilled = useMemo(() => {
        return Object.values(values).every((value) => !value);
    }, [values]);
    const isAllValid = useMemo(() => {
        return Object.values(errors).every((value) => value === '');
    }, [errors]);

    return {
        values,
        errors,
        setValue,
        setValues,
        setError,
        resetValue,
        resetValues,
        resetError,
        resetErrors,
        isAllFilled,
        isAllValid,
        onCheck,
        initValues,
        setInitValues,
    };
}

export default useFormInputs;
