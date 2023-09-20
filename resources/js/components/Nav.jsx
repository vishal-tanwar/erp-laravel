import React from 'react'
import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Nav = ({ children }) => {
    return <ul className='nav-links'>{children}</ul>
}

export const NavLink = ({ Icon, title, to, className, ...props }) => {
    return (
        <li>

        <Link to={to} className={className || ''} {...props}>
            {Icon}
            <span className="link_name">{title}</span>
        </Link>
            <ul className="sub-menu blank">
                <li><Link className="link_name" href={to}>Dashboard</Link></li>
            </ul>
        </li>
    );
}

export const Dropdown = ({ children, Icon, title, to, className, ...props }) => {

    const [isVisible, setVisible ] = React.useState( false );
    return (
        <li className={ isVisible ? 'showMenu' : '' }>
            <div className="iocn-link" onClick={() => { setVisible(!isVisible)}}>
                <a href="#">
                    {Icon}
                    <span className="link_name">{title}</span>
                </a>
                <MdChevronRight className='arrow'/>
            </div>
            <ul className="sub-menu">
                <li><Link className="link_name" to="#">{title}</Link></li>
                {children}
            </ul>
        </li>
    );
}

export const DropdownItem = ({to, title} ) => {
    return <li><Link to={to}>{title}</Link></li>
} 
