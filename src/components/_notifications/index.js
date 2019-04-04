//Core
import { toast } from 'react-toastify';

export const notifications = {
    error: (message, timeout = 5000) => {
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-error',
            bodyClassName: 'error-body',
            closeButton: false,
            autoClose: timeout,
        });
    },
    success: (message, timeout = 5000) => {
        if (localStorage.getItem('buff-notifications') === 'false') {
            return false;
        }
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-success',
            bodyClassName: 'success-body',
            closeButton: false,
            autoClose: timeout,
        });
    },
    bonus: (message, timeout = 5000) => {
        if (localStorage.getItem('buff-notifications') === 'false') {
            return false;
        }
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-bonus',
            bodyClassName: 'bonus-body',
            closeButton: false,
            autoClose: timeout,
        });
    },
    info: (message, timeout = 5000) => {
        if (localStorage.getItem('buff-notifications') === 'false') {
            return false;
        }
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-info',
            bodyClassName: 'info-body',
            closeButton: false,
            autoClose: timeout,
        });
    },
};
