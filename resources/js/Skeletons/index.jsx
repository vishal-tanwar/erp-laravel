import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export const SkeletonTable = ({rows = 10 , columns = 10 }) => {

    const [TableRows,setTableRows] = React.useState([]);

    React.useEffect(() => {

        setTableRows((rv, ri) => Array(rows).fill().map(() => {
            let cols = Array(columns).fill().map((v,i) => <td key={i}><Skeleton /></td>)
            return(
                <tr key={ri}>
                    {cols}
                </tr>
            )
        }) )

    }, []);

    return (
        <>
            {...TableRows}
        </>
    )

}

export const SkeletonPaginate = () => <div className='d-flex justify-content-end'><Skeleton width={100}/></div>