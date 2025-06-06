import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import FormInput from './ui/FormInput'

interface EmployeeFormData {
    name: string;
    company: string;
    city: string;
    phone_number: string;
}

interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EmployeeFormData) => void;
    formData: EmployeeFormData;
    setFormData: (data: EmployeeFormData) => void;
    title: string;
    isSubmitting: boolean;
}

export default function EmployeeModal({
    isOpen,
    onClose,
    onSubmit,
    formData,
    setFormData,
    title,
    isSubmitting
}: EmployeeModalProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // Handle Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog 
                as="div" 
                className="relative z-50" 
                onClose={onClose}
                initialFocus={undefined}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                                <div className="absolute right-0 top-0 pr-4 pt-4">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="sm:flex sm:items-start w-full">
                                    <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-6">
                                            {title}
                                        </Dialog.Title>

                                        <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
                                            <FormInput
                                                id="name"
                                                name="name"
                                                type="text"
                                                label="Full Name"
                                                required
                                                pattern="^[a-zA-Z ]{2,}$"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter employee's full name"
                                                helperText="Enter at least 2 characters"
                                            />

                                            <FormInput
                                                id="company"
                                                name="company"
                                                type="text"
                                                label="Company"
                                                required
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                placeholder="Enter company name"
                                            />

                                            <FormInput
                                                id="city"
                                                name="city"
                                                type="text"
                                                label="City"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="Enter city name"
                                            />

                                            <FormInput
                                                id="phone_number"
                                                name="phone_number"
                                                type="tel"
                                                label="Phone Number"
                                                required
                                                pattern="^\+?[1-9]\d{1,14}$"
                                                value={formData.phone_number}
                                                onChange={handleInputChange}
                                                placeholder="+1234567890"
                                                helperText="Include country code (e.g., +1 for US)"
                                            />

                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                >
                                                    {isSubmitting ? 'Saving...' : 'Save'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={onClose}
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors duration-200"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
