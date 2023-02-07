import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import App from '@/App';

describe('Login', () => {
  test('Testing login', async () => {
    const wrapper = render(<App />);
    expect(wrapper).toBeTruthy();

    const emailInput = wrapper.getByTestId('form__login__email') as HTMLInputElement;
    expect(emailInput).toBeTruthy();

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

    expect(emailInput.value).toBe('test@test.com');

    const passwordInput = wrapper.getByTestId('form__login__password') as HTMLInputElement;
    expect(passwordInput).toBeTruthy();

    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    expect(passwordInput.value).toBe('12345678');

    const submitButton = wrapper.getByTestId('form__login__submit');
    expect(submitButton).toBeTruthy();

  });
});
