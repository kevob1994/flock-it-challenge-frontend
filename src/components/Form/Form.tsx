import { FormikProps } from 'formik';
import { FC } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

export interface IForm {
  formik: FormikProps<any>;
  infoInputs: {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    dataTestId: string;
  }[];
}

export const Form: FC<IForm> = ({ formik, infoInputs }) => {
  return (
    <form
      className='space-y-4 md:space-y-6 mb-4'
      onSubmit={formik.handleSubmit}
    >
      {infoInputs.map((item) => (
        <Input
          key={item.name}
          name={item.name}
          type={item.type}
          label={item.label}
          onChange={formik.handleChange}
          value={formik.values?.[item.name]}
          error={(formik?.errors?.[item.name] as string) || ''}
          dataTestId={item.dataTestId}
        />
      ))}

      <Button
        type='submit'
        text='Iniciar sesión'
        fullWidth
        dataTestId={'form__login__submit'}
      />
    </form>
  );
};
