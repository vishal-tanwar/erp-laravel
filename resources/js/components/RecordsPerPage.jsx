import React from "react";
import { Dropdown } from "react-bootstrap";

const RecordsPerPage = ({ currentRecords, setRecords }) => {

    const recordInpRef = React.useRef();

    const records = [
        5, 10, 20, 50, 100
    ]

    return (
        <Dropdown>
            <Dropdown.Toggle className="btn-light border border-black shadow" id="dropdown-basic">
                {currentRecords}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {records.map((r, i) => <Dropdown.Item onClick={() => setRecords(r)} key={i}>{r}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default RecordsPerPage;