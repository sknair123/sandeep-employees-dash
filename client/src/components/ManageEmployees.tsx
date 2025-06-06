import { useState, useEffect } from 'react';
import axios from '../config/axios';
import { endpoints } from '../config/api';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import EmployeeModal from './EmployeeModal';

interface Employee {
    id: number;
    name: string;
    company: string;
    city: string;
    phone_number: string;
}

interface EmployeeFormData {
    name: string;
    company: string;
    city: string;
    phone_number: string;
}

export default function ManageEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<EmployeeFormData>({
        name: '',
        company: '',
        city: '',
        phone_number: ''
    });

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(endpoints.employees.list);
            setEmployees(response.data);
        } catch (err: any) {
            setError('Failed to fetch employees');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSubmit = async (data: EmployeeFormData) => {
        setIsSubmitting(true);
        setError('');
        try {
            if (editingEmployee) {
                await axios.put(endpoints.employees.update(editingEmployee.id), {
                    ...data,
                    id: editingEmployee.id
                });
            } else {
                await axios.post(endpoints.employees.create, data);
            }
            await fetchEmployees();
            setIsModalOpen(false);
            setEditingEmployee(null);
            setFormData({ name: '', company: '', city: '', phone_number: '' });
        } catch (err: any) {
            setError('Failed to save employee');
            console.error('Error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) {
            return;
        }
        try {
            await axios.delete(endpoints.employees.delete(id));
            await fetchEmployees();
        } catch (err: any) {
            setError('Failed to delete employee');
            console.error('Error:', err);
        }
    };

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setFormData({
            name: employee.name,
            company: employee.company,
            city: employee.city,
            phone_number: employee.phone_number
        });
        setIsModalOpen(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Manage Employees
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Add, edit, and manage your employee records.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingEmployee(null);
                        setFormData({ name: '', company: '', city: '', phone_number: '' });
                        setIsModalOpen(true);
                    }}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <PlusIcon className="h-5 w-5 mr-1.5" aria-hidden="true" />
                    Add Employee
                </button>
            </div>

            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            )}

            <EmployeeModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingEmployee(null);
                    setFormData({ name: '', company: '', city: '', phone_number: '' });
                }}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                isSubmitting={isSubmitting}
            />

            {employees.length === 0 ? (
                <div className="text-center rounded-lg border-2 border-dashed border-gray-300 p-12">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No employees</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new employee.</p>
                </div>
            ) : (
                <div className="mt-4 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">City</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone Number</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {employees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {employee.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employee.company}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employee.city}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employee.phone_number}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button
                                                        onClick={() => handleEdit(employee)}
                                                        className="inline-flex items-center text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        <PencilSquareIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                                                        <span className="sr-only">Edit {employee.name}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(employee.id)}
                                                        className="inline-flex items-center text-red-600 hover:text-red-900"
                                                    >
                                                        <TrashIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                                                        <span className="sr-only">Delete {employee.name}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
