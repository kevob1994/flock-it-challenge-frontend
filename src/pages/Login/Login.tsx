import { FC, useContext } from 'react';
import { Container } from 'react-grid-system';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthContext } from '@/context/auth';
import { Button, Form, Input } from '@/components';
import { useFormik } from 'formik';

const schema = yup.object().shape({
  email: yup.string().required('Campo requerido').email('Mail inválido'),
  password: yup
    .string()
    .required('Campo requerido')
    .min(8, 'Al menos 8 caracteres'),
});

export const Login: FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      login.mutate(values);
    },
  });

  const infoInputs = [
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
  ];

  return (
    <Container>
      <>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1
                className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'
                data-testid={'title-login'}
              >
                Inicio de sesión
              </h1>
              <Form formik={formik} infoInputs={infoInputs} />
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                No tienes cuenta todavia?{' '}
                <a
                  className='font-medium text-primary-600 hover:underline text-blue-500 cursor-pointer'
                  onClick={() => navigate('/register')}
                >
                  Registrate
                </a>
              </p>
            </div>
          </div>
        </div>
      </>
    </Container>
  );
};
