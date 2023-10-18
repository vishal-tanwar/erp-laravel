import React from "react";

export default function BarcodeReader({onEnterBarCode}){

    const [barcode, setBarcode ] = React.useState('');
    const [isChecked, setChecked ] = React.useState('');
    const focusRef = React.useRef();


    const handleRead = (e) => {
       
        if (e.code == "Enter") {
            if (barcode) {
                setBarcode(barcode);
            }
            onEnterBarCode( { barcode, setBarcode });
            return;
        }

        if (e.key != "Shift") {
            setBarcode(prev => prev + e.key);
            return;
        }

    }

    return (
        <>
            
            <input type="text" defaultValue={barcode} onKeyUp={(e) => handleRead(e)} ref={focusRef} />
            <input type="checkbox" checked={isChecked} onChange={ () => setChecked( prev => { 
                let newCheck = !prev;
                if( newCheck ) {
                    focusRef.current.focus() 
                }
                return newCheck;
            } ) }/>
        </>
    )
}