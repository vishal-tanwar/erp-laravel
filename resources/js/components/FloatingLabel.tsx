import React, { InputHTMLAttributes } from "react"
import './FloatingLabel.scss';


type InputTypes = "text" | "email" | "password" | "number" | "tel" | "url" | 'textarea';

export interface FloatingLabelMessageProps {
    show?: boolean,
    type?: "error" | "success",
    text: string | React.JSX.Element | React.JSX.Element[]
}

interface FloatingLabelProps extends InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement > {
    controlId?: string,
    className?: string,
    labelClassName?: string,
    label: string,
    type?: InputTypes,
    placeholder?: string,
    message?: FloatingLabelMessageProps
}


const FloatingLabel: React.FC<FloatingLabelProps> = ({ placeholder, type, controlId, label, className, labelClassName, message, ...rest }): React.JSX.Element => {
    const _labelClasses: string = "float-label form-label";

    type = type || "text";

    return (
        <div className="float-label-wrapper">

            <div className="float-label-group">
                <input type={type} id={controlId} className={className ? className.concat(' form-control') : 'form-control'} placeholder={label} {...rest} />
                <label className={labelClassName ? labelClassName.concat(` ${_labelClasses}`) : _labelClasses} htmlFor={controlId}>{label}</label>
            </div>
            {message && message.show  ? <div className={`message message-${message.type ?? 'error'} ${message.show ? 'show' : 'hide'}`}>{message.text}</div> : ''}
        </div>

    )
}

export default FloatingLabel;
