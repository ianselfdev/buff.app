//Core
import { toast } from 'react-toastify';

export const notifications = {
    error: (message) => {
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-error',
            bodyClassName: 'error-body',
            closeButton: false,
        });
    },
    success: (message) => {
        if (localStorage.getItem('buff-notifications') === 'false') {
            return false;
        }
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-success',
            bodyClassName: 'success-body',
            closeButton: false,
        });
    },
    bonus: (message) => {
        if (localStorage.getItem('buff-notifications') === 'false') {
            return false;
        }
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-bonus',
            bodyClassName: 'bonus-body',
            closeButton: false,
        });
    },
    info: (message) => {
        if (localStorage.getItem('buff-notifications') === 'false') {
            return false;
        }
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-info',
            bodyClassName: 'info-body',
            closeButton: false,
        });
    },
};
