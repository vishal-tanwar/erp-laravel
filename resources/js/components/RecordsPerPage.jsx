import React from "react";
import { Dropdown } from "react-bootstrap";

const RecordsPerPage = ({ currentRecords, setRecords }) => {

    const recordInpRef = React.useRef();

    const records = [
        5, 10, 20, 50, 100
    ]

    return (
        <Dropdown>
            <Dropdown.Toggle className="shadow" id="dropdown-basic">
                <span className="me-1">Records per Page: </span> 
                <span>{currentRecords}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {records.map((r, i) => <Dropdown.Item onClick={() => setRecords(r)} key={i}>{r}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default RecordsPerPage;