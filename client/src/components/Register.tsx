import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../config/axios';
import { endpoints } from '../config/api';
import Layout from './Layout';
import FormInput from './ui/FormInput';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    email?: string;
  }>({});
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear field-specific error when user starts typing
    if (fieldErrors[e.target.name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({
        ...prev,
        [e.target.name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setSuccess('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(endpoints.register, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', response.data.token);
      setSuccess('Registration successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      if (error.response?.status === 400 && error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        
        // Set field-specific errors
        if (errorMessage.includes('Username already exists')) {
          setFieldErrors(prev => ({ ...prev, username: errorMessage }));
        } else if (errorMessage.includes('Email already exists')) {
          setFieldErrors(prev => ({ ...prev, email: errorMessage }));
        } else {
          setError(errorMessage);
        }
        
        console.error('Registration error:', errorMessage);
      } else if (error.message === 'Network Error') {
        setError('Unable to connect to the server. Please check your connection.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout showNav={false}>
      <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link 
              to="/login" 
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow-xl ring-1 ring-gray-900/10 sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}
              {success && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="text-sm text-green-700">{success}</div>
                </div>
              )}

              <FormInput
                id="username"
                name="username"
                type="text"
                label="Username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                helperText="Username must be at least 3 characters long"
                pattern=".{3,}"
                error={fieldErrors.username}
              />

              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email address"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                helperText="We'll never share your email with anyone else"
                error={fieldErrors.email}
              />

              <FormInput
                id="password"
                name="password"
                type="password"
                label="Password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                helperText="Password must be at least 8 characters"
                pattern=".{8,}"
              />

              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={
                  formData.confirmPassword && 
                  formData.password !== formData.confirmPassword 
                    ? "Passwords don't match" 
                    : undefined
                }
              />

              <div>
                <button
                  type="submit"
                  disabled={isLoading || (formData.password !== formData.confirmPassword)}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </div>
                  ) : (
                    'Create account'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
