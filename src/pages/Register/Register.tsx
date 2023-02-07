import { FC, useContext } from 'react';
import { Container } from 'react-grid-system';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/auth';
import { Button, Form } from '@/components';
import { useFormik } from 'formik';

const schema = yup.object().shape({
  email: yup.string().required('Campo requerido').email('Mail inválido'),
  password: yup
    .string()
    .required('Campo requerido')
    .min(8, 'Al menos 8 caracteres'),
  repeat_password: yup
    .string()
    .required('Campo requerido')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  first_name: yup.string().required('Campo requerido'),
  last_name: yup.string().required('Campo requerido'),
});

export const Register: FC = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeat_password: '',
      first_name: '',
      last_name: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      register.mutate(values);
    },
  });

  const infoInputs = [
    {
      label: 'Nombre',
      name: 'first_name',
      type: 'text',
      dataTestId: 'form__register__first-name',
    },
    {
      label: 'Apellido',
      name: 'last_name',
      type: 'text',
      dataTestId: 'form__register__last-name',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      dataTestId: 'form__login__email',
    },
    {
      label: 'Contraseña',
      name: 'password',
      type: 'password',
      dataTestId: 'form__login__password',
    },
    {
      label: 'Repetir Contraseña',
      name: 'repeat_password',
      type: 'password',
      dataTestId: 'form__login__password-repeat',
    },
  ];

  return (
    <Container>
      <>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-5'>
                Crear cuenta
              </h1>
              <Form formik={formik} infoInputs={infoInputs} />
              <Button
                variant='outlined'
                text='Volver'
                fullWidth
                onClick={() => navigate('/login')}
              />
            </div>
          </div>
        </div>
      </>
    </Container>
  );
};
