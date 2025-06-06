import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export default function FormInput({ 
  label, 
  error, 
  helperText, 
  id, 
  className = '', 
  ...props 
}: FormInputProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-2">
        <input
          id={id}
          {...props}
          className={`block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
            error 
              ? 'ring-red-500 focus:ring-red-500' 
              : 'ring-gray-300 focus:ring-indigo-600'
          } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-description` : undefined}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
