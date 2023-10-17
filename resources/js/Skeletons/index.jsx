import React from "react";
import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export const SkeletonTable = ({ rows = 10, columns = 10 }) => {

    const [TableRows, setTableRows] = React.useState([]);

    React.useEffect(() => {

        setTableRows((rv, ri) => Array(rows).fill().map(() => {
            let cols = Array(columns).fill().map((v, i) => <td key={i}><Skeleton /></td>)
            return (
                <tr key={ri}>
                    {cols}
                </tr>
            )
        }))

    }, []);

    return (
        <>
            {...TableRows}
        </>
    )

}

export const SkeletonPaginate = () => <div className='d-flex justify-content-end'><Skeleton width={100} /></div>

export const SkeletonSummary = ({columns = 4}) => {

    return (
        <Row className="my-4">
            <Col xs={12}>
                <Skeleton width={180} height={35}/>
            </Col>
            <Col xs={12} className="mt-2">
                <Row>
                    {Array(columns).fill().map((v, i) => <Col key={i}><Skeleton height={120}/></Col>)}
                </Row>
            </Col>
        </Row>
    )
}