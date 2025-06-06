export const API_URL = import.meta.env.VITE_API_URL;

export const endpoints = {
    login: '/users/login',
    register: '/users/register',
    me: '/users/me',
    employees: {
        list: '/employees',
        create: '/employees',
        update: (id: number) => `/employees/${id}`,
        delete: (id: number) => `/employees/${id}`,
    }
};
