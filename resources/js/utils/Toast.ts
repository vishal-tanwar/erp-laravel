import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import './swalStyle.scss';


type ToastTypes = "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "light" | 'error'

interface IToastOptions {
    type?: ToastTypes,
    title?: string | HTMLElement,
    icon?: SweetAlertIcon
    timer?: number,
    text?: string,
    position?: SweetAlertPosition,
    html?: string | HTMLElement
}


const Toast = (options: IToastOptions = {}):typeof Swal => {

    const _default: IToastOptions = Object.assign<IToastOptions, IToastOptions>({
        type: "success",
        timer: 1500,
        text: "",
        position: 'top-right',
        icon: 'success',
        html: ''
    }, options);

    const type:string|undefined = _default.type == 'error' ? 'danger' : _default.type;

    
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
            timerProgressBar: `bg-${type}`,
            icon: `text-${type}`,
            title: `text-${type}`,
            htmlContainer: `swal-content--${type}`
        },
    })
}

export default Toast;