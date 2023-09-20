import React, { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom';



export default function NavLink({ children, title, to, className, ...props} )
{
    return <Link to={to} className={`d-flex align-items-center gap-2 py-2 rounded-sm mb-0.5 last:mb-0 ${className || ''}`} {...props}>{ children ?? title}</Link>
}

