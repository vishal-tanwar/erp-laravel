import React from "react";

type PDFProps = {
    voucher: number,
} 


const PdfReceiving = ({ voucher }: PDFProps):React.JSX.Element => {

    return(
        <>
            <p>Voucher id: {voucher}</p>
        </>
    )

}

export default PdfReceiving;