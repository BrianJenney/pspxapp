import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const StyleConfigForm = ({ addToAllForms, defaultVals = { styles: [] } }) => {
    const { control, formState, register, reset, getValues } = useForm({});

    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'styles',
        fields: [{ rule: '', val: '' }],
    });

    useEffect(() => {
        const formattedStyles = defaultVals.styles.map((style) => ({
            rule: style.split(': ')[0],
            val: style.split(': ')[1],
        }));

        if (formattedStyles.length) {
            reset({
                element: defaultVals.element,
                maxWidth: defaultVals.maxWidth,
                minWidth: defaultVals.minWidth,
                styles: [...formattedStyles],
            });
        } else {
            reset({
                styles: [{ rule: '', val: '' }],
            });
        }
    }, [
        defaultVals.element,
        defaultVals.maxWidth,
        defaultVals.minWidth,
        ...defaultVals.styles,
    ]);

    useEffect(() => {
        addToAllForms((prev) => [...prev, getValues]);
        return () => {
            reset({});
        };
    }, [addToAllForms]);

    return (
        <div style={{ width: '100%' }}>
            <form>
                <>
                    <Controller
                        name="element"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...register('element', {
                                    required: true,
                                })}
                                placeholder="Element Name (ex: #myBtn)"
                                style={{ width: '40%' }}
                                {...field}
                            />
                        )}
                    />
                    {errors?.element?.type === 'required' && (
                        <p>This field is required</p>
                    )}
                    <div>
                        <Space style={{ marginTop: '1em' }}>
                            <Controller
                                name="maxWidth"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...register('maxWidth')}
                                        placeholder="Max Width (for media queries)"
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="minWidth"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...register('minWidth')}
                                        placeholder="Min Width (for media queries)"
                                        {...field}
                                    />
                                )}
                            />
                        </Space>
                    </div>
                    <>
                        {fields.map((item, index) => (
                            <div key={item.id} style={{ marginTop: '1em' }}>
                                <Space>
                                    <Controller
                                        name={`styles[${index}].rule`}
                                        control={control}
                                        defaultValue={item.rule}
                                        render={({ field }) => (
                                            <Input
                                                {...register('rule', {
                                                    required: true,
                                                })}
                                                placeholder="property (ex: color)"
                                                {...field}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name={`styles[${index}].val`}
                                        control={control}
                                        defaultValue={item.val}
                                        render={({ field }) => (
                                            <Input
                                                {...register('val', {
                                                    required: true,
                                                })}
                                                placeholder="property value (ex: green)"
                                                {...field}
                                            />
                                        )}
                                    />
                                    <Space>
                                        {index > 0 && (
                                            <MinusCircleOutlined
                                                onClick={() => remove(index)}
                                            />
                                        )}
                                        <PlusCircleOutlined
                                            onClick={() => {
                                                append({
                                                    rule: '',
                                                    val: '',
                                                });
                                            }}
                                        />
                                    </Space>
                                </Space>
                            </div>
                        ))}
                    </>
                </>
            </form>
        </div>
    );
};

export default StyleConfigForm;
