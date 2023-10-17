import React from 'react';
import { Pagination } from 'react-bootstrap';
import { BiFirstPage, BiLastPage } from 'react-icons/bi';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

import PaginateCss from './paginate.module.css?iniline';


export const Paginate = ({ onPageChange, currentPage, pageCount, nextLabel, previousLabel, lastLabel, firstLabel }) => {

    const [lowerPages, setLowerPages] = React.useState([]);
    const [upperPages, setUpperPages] = React.useState([]);
    const [middlePages, setMiddlePages] = React.useState([]);
    const [nextPage, setNextPage ] = React.useState(0);
    const [previousPage, setPreviousPage ] = React.useState(0);

    const lastPage = pageCount;
    const firstPage = 1;
    
    const onClick = (e, value) => {
        e.preventDefault();
        setPreviousPage(Math.max(1, value - 1));
        setNextPage(Math.min(pageCount, value + 1));
        onPageChange(value);

    }

    

    React.useEffect(() => {

        
        setPreviousPage( Math.max(1, currentPage - 1) );
        setNextPage( Math.min(pageCount, currentPage + 1) );

        if (!pageCount) {
            throw new Error("Error:: provide the pageCount");
        }

        if (pageCount > 10) {

            setLowerPages(() => {
                const lp = [];
                for (let i = 1; i <= 3; i++) {
                    lp.push(<li className="page-item">
                        <a className={`page-link`} role="button" href="#" onClick={(e) => onClick(e, i)}>
                            <span aria-hidden="true">{i}</span>
                        </a>
                    </li>)
                }

                return lp;

            })

        } else {

            setLowerPages(() => {
                
                return Array(pageCount).fill().map( (v,i) => <li className="page-item" key={++i}>
                <a className={`page-link ${currentPage == i ? 'active' : ''}`} role="button" href="#" onClick={(e) => onClick(e, i)}>
                    <span aria-hidden="true">{i}</span>
                </a>
            </li> )

            })
            
        }


    }, []);

    

    return (
        <div className='d-flex justify-content-end'>

            <Pagination>

                <li className={`page-item`} >
                    <a className={`page-link ${ PaginateCss.item }`} role="button" href="#" onClick={(e) => onClick(e, firstPage)}>
                        <span aria-hidden="true">{firstLabel ?? <BiFirstPage />}</span>
                    </a>
                </li>

                <li className="page-item">
                    <a className={`page-link ${PaginateCss.item}`} role="button" href="#" onClick={(e) => onClick(e, previousPage )}>
                        <span aria-hidden="true">{previousLabel ?? <GrFormPrevious />}</span>
                    </a>
                </li>

                {...lowerPages}

                {middlePages.length > 0 ? <> <Pagination.Ellipsis /> {...middlePages} <Pagination.Ellipsis /> </> : ''}

                {...upperPages}

                <li className="page-item">
                    <a className={`page-link ${PaginateCss.item}`} role="button" href="#" onClick={(e) => onClick(e, nextPage)}>
                        <span aria-hidden="true">{nextLabel ?? <GrFormNext />}</span>
                    </a>
                </li>

                <li className="page-item">
                    <a className={`page-link ${ PaginateCss.item }`} role="button" href="#" onClick={(e) => onClick(e, lastPage)}>
                        <span aria-hidden="true">{lastLabel ?? <BiLastPage />}</span>
                    </a>
                </li>

            </Pagination>
        </div>
    )

}