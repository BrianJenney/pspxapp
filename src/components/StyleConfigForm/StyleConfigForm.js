import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const StyleConfigForm = ({ addToAllForms, defaultVals }) => {
    console.log(defaultVals);
    const defaultStyles = (defaultVals?.styles || []).map(
        (styleRule) => styleRule.styles
    );

    console.log(
        defaultStyles.map((s) => ({
            rule: s.split(':')[0],
            val: s.split(':'[1]),
        }))
    );

    const { control, formState, register, reset, getValues } = useForm({
        defaultValues: {
            styles: defaultStyles.map((s) => ({
                rule: s.split(':')[0],
                val: s.split(':'[1]),
            })),
        },
    });

    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'styles',
        fields: [{ rule: '', val: '' }],
    });

    useEffect(() => {
        reset({
            styles: [{ rule: '', val: '' }],
        });
    }, [reset]);

    useEffect(() => {
        addToAllForms((prev) => [...prev, getValues]);
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
