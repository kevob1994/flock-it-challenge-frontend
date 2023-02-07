import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react';

type TypeInput = 'input' | 'textarea' | 'password';

interface IInputProps {
  searchIcon?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  value?: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  dataTestId?: string;
}

export const Input: FC<IInputProps> = ({
  searchIcon = false,
  placeholder,
  type = 'text',
  required = false,
  value,
  onChange,
  name,
  label,
  error,
  dataTestId,
}) => {
  return (
    <div className='mb-5'>
      {label && (
        <label className='block text-sm font-medium text-white mb-2'>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        {searchIcon && (
          <div className='absolute inset-y-0 right-5 flex items-center pl-3 pointer-events-none'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='text-gray-400'
            />
          </div>
        )}
        <input
          type={type}
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder={placeholder}
          required={required}
          value={value}
          name={name}
          onChange={onChange}
          data-testid={dataTestId}
        />
        {error && <span className='text-xs text-red-500'>{error}</span>}
      </div>
    </div>
  );
};
