import classNames from 'classnames';
import React, { FC, MouseEventHandler } from 'react';

interface IButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  variant?: 'filled' | 'outlined' | 'link';
  dataTestId?: string;
  className?: string;
}

export const Button: FC<IButtonProps> = ({
  text,
  type,
  onClick,
  fullWidth = false,
  variant = 'filled',
  dataTestId,
	className = ''
}) => {
  return (
    <button
      data-testid={dataTestId}
      type={type}
      onClick={onClick}
      className={classNames(className, {
        'w-full': fullWidth,
        'text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800':
          variant === 'filled',
        'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800':
          variant === 'outlined',
      })}
    >
      {text}
    </button>
  );
};
