//Core
import { toast } from 'react-toastify';

export const notifications = {
    error: (message) => {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-error',
            bodyClassName: 'error-body',
            closeButton: false,
        });
    },
    success: (message) => {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-success',
            bodyClassName: 'success-body',
            closeButton: false,
        });
    },
    warning: (message) => {
        toast.warn(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-warn',
            bodyClassName: 'warn-body',
            closeButton: false,
        });
    },
    info: (message) => {
        toast.info(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'toast-info',
            bodyClassName: 'info-body',
            closeButton: false,
        });
    },
};
