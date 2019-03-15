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
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-success',
            bodyClassName: 'success-body',
            closeButton: false,
        });
    },
    bonus: (message) => {
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-bonus',
            bodyClassName: 'bonus-body',
            closeButton: false,
        });
    },
    info: (message) => {
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-info',
            bodyClassName: 'info-body',
            closeButton: false,
        });
    },
};
