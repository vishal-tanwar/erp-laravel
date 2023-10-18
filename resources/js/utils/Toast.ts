import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import './swalStyle.scss';


type ToastTypes = "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "light"

interface IToastOptions {
    type?: ToastTypes,
    title?: string,
    icon?: SweetAlertIcon
    timer?: number,
    text?: string,
    position?: SweetAlertPosition,
    html?: string | HTMLElement | JQuery
}

const Toast = (options: IToastOptions = {}) => {

    const _default: IToastOptions = Object.assign<IToastOptions, IToastOptions>({
        type: "success",
        timer: 1500,
        text: "",
        position: 'top-right',
        icon: 'success',
        html: ''
    }, options);

    return Swal.mixin({
        html: _default.html,
        toast: true,
        icon: _default.icon,
        title: _default.title,
        position: _default.position,
        showConfirmButton: false,
        text: _default.text,
        timer: _default.timer,
        timerProgressBar: true,
        customClass: {
            popup: "colored-toast",
            timerProgressBar: `bg-${_default.type}`,
            icon: `text-${_default.type}`,
            title: `text-${_default.type}`,
            htmlContainer: `swal-content--${_default.type}`
        },
    })
}

export default Toast;