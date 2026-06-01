import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormErrorProps {
  error?: string;
  touched?: boolean;
}

/**
 * Form Field Error Display
 * Shows validation error messages next to form inputs
 * Usage: <FormError error={errors.email} touched={touched.email} />
 */
export const FormError = ({ error, touched }: FormErrorProps) => {
  if (!error || !touched) return null;

  return (
    <div className="flex items-center gap-2 mt-1 text-destructive text-sm">
      <AlertCircle className="w-4 h-4" />
      <span>{error}</span>
    </div>
  );
};

/**
 * Form Success Message
 */
export const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 text-green-600 text-sm">
      <CheckCircle className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};

/**
 * Form Field Wrapper with Error Handling
 * Combines label, input, and error display
 */
export const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  touched,
  required = false,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-foreground">
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      aria-invalid={error && touched ? 'true' : 'false'}
      aria-describedby={error && touched ? `${name}-error` : undefined}
      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
        error && touched
          ? 'border-destructive focus:ring-2 focus:ring-destructive'
          : 'border-input focus:border-primary focus:ring-2 focus:ring-primary'
      } focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
    />
    {error && touched && (
      <div id={`${name}-error`} className="flex items-center gap-2 text-destructive text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

/**
 * Validation Helper Functions
 */
export const validators = {
  required: (value: string) => (value.trim() ? '' : 'Este campo es requerido'),

  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Ingresa un email válido';
  },

  password: (value: string) => {
    if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (!/[A-Z]/.test(value)) return 'Debe contener al menos una letra mayúscula';
    if (!/[0-9]/.test(value)) return 'Debe contener al menos un número';
    return '';
  },

  phone: (value: string) => {
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(value) ? '' : 'Ingresa un teléfono válido';
  },

  minLength: (min: number) => (value: string) =>
    value.length >= min ? '' : `Mínimo ${min} caracteres`,

  maxLength: (max: number) => (value: string) =>
    value.length <= max ? '' : `Máximo ${max} caracteres`,

  match: (other: string) => (value: string) =>
    value === other ? '' : 'Los campos no coinciden',
};

/**
 * Form Field State Hook
 * Manages field value, touched state, and validation
 */
export const useFormField = (initialValue = '', validator?: (v: string) => string) => {
  const [value, setValue] = React.useState(initialValue);
  const [touched, setTouched] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (validator) {
      setError(validator(newValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validator) {
      setError(validator(value));
    }
  };

  return {
    value,
    setValue,
    touched,
    setTouched,
    error,
    setError,
    bind: { value, onChange: handleChange, onBlur: handleBlur },
    isValid: !error,
  };
};
