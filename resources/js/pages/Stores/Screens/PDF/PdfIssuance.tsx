import axios from "axios";
import React from "react";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
import Datepicker from "../../../../components/Datepicker";
import { MdCalendarMonth } from "react-icons/md";


type PDFProps = {
    voucherId: number,
}

interface IVoucher {
    id: number,
    type: string,
    voucher_number: string,
    invoice_id?: null,
    address?: null,
    city?: null,
    state?: null,
    email?: null,
    phone_number?: null,
    department?: null,
    requester?: null,
    receiving_date?: null,
    issuance_date: null | string,
    created_at: string,
    updated_at: string,
}

interface IItem {
    id: number,
    name: string,
    size: number | string,
    part: string | number,
    grade: string | number,
    group: string | number,
    sub_group: string | number,
    unit: string | number,
    store_id: string | number,
    suppliers: string | number,
    created_at: string,
    updated_at: string
}

interface IItems {
    id: number,
    quantity: string | number,
    total_gwt: string | number,
    total_pkt: string | number,
    pkt_receiver: null,
    item: IItem,
    location: {
        id: number,
        name: string,
    }
}

const PdfIssuance = ({ voucherId }: PDFProps): React.JSX.Element => {

    const [date, setDate] = React.useState<Date>(new Date());
    const [voucher, setVoucher] = React.useState<IVoucher>();
    const [items, setItems] = React.useState<IItems[]>([]);

    React.useEffect(() => {
        axios.get(`voucher?id=${voucherId}`).then(res => {
            setDate(new Date(res.data.data.issuance_date));
            setVoucher(res.data.data);
            setItems(res.data.data.items)
        });
    }, []);

    const formatSizes = (size) => {
        if (JSON.parse(size) instanceof Object) {
            return Object.values(JSON.parse(size)).join('x');
        }
        else {
            return size;
        }
    }

    return (
        <Form style={{
            marginTop: 15,
            marginBottom: 15,
            marginLeft: 10,
            marginRight: 10,
        }}>
            <Row><Col style={{
                display: "flex",
                justifyContent: "center",
            }}><h1 style={{

                marginBottom: 15,
                fontSize: 18,
            }}>Issuance Voucher</h1></Col></Row>
            <Row>
                <Col xs={6} >
                    <Form.Label></Form.Label>
                </Col>
                <Col xs={6} >
                    <Form.Label></Form.Label>
                </Col>
            </Row>

            <table className="table table-responsive" border={1} style={{
                borderCollapse: "collapse",
                width: "100%"
            }}>
                <tbody>
                    <tr >
                        <td style={{
                            textAlign: "left",
                            fontWeight: "bold"
                        }}><span>Voucher Number : {voucher?.voucher_number}</span></td>
                        <td style={{
                            textAlign: "right",
                            fontWeight: "bold"
                        }}><span>Date : {date.toDateString()}</span></td>
                    </tr>
                    <tr>
                        <td style={{
                            textAlign: "left",
                            fontWeight: "bold"
                        }}><span>Department: {voucher?.department}</span></td>
                        <td style={{
                            textAlign: "right",
                            fontWeight: "bold"
                        }}><span>Requester: {voucher?.requester}</span></td>
                    </tr>
                </tbody>
            </table>


            <Row className="my-4">
                <Col>
                    <table className="table table-bordered  table-responsive">
                        <thead>

                            <tr className="text-center">

                                <th scope="col">Item Name</th>
                                <th scope="col">Item Part</th>
                                <th scope="col">Item Size</th>
                                <th scope="col">Item Grade</th>
                                <th scope="col">Quanity</th>
                                <th scope="col">Location</th>
                                <th scope="col">Total GWT</th>
                                <th scope="col">Total pkt</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                items.map((item, index) => {

                                    return (<tr className="text-center" key={index}>

                                        <td>
                                            <span>{item?.item.name} </span>

                                        </td>
                                        <td>
                                            <span>{item?.item?.part} </span>

                                        </td>
                                        <td>
                                            <span>{formatSizes(item?.item.size)} </span>

                                        </td>
                                        <td>
                                            <span>{item.item.grade} </span>

                                        </td>
                                        <td>
                                            <span>{item.quantity} </span>

                                        </td>
                                        <td>
                                            <span>{item.location.name} </span>

                                        </td>
                                        <td>
                                            <span>{item.total_gwt} </span>

                                        </td>
                                        <td>
                                            <span>{item.total_pkt} </span>
                                        </td>

                                    </tr>)
                                })
                            }

                        </tbody>


                    </table>
                </Col>

            </Row>

        </Form>
    )

}

export default PdfIssuance;