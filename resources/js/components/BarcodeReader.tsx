import React from "react";
import BounceLoader from "./BounceLoader";


interface BarcodeProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onScan: (response: string, setBarcode: React.Dispatch<React.SetStateAction<string>>) => void
    isLoading?: boolean,
    className?: string,
}

export default function BarcodeReader({ onScan = () => {}, isLoading, className, ...props }: BarcodeProps):React.JSX.Element {

    const [barcode, setBarcode] = React.useState<string>('');


    React.useEffect((): void => {
        let scannedStr: string;

        window.document.addEventListener('keypress', function (e: KeyboardEvent) {

            if (e.code == "Enter") {
                if (scannedStr) {
                    setBarcode(scannedStr);
                }
                onScan(scannedStr, setBarcode);
                scannedStr = '';
                return;
            }

            if (e.key != "Shift") {
                if (!scannedStr) {
                    scannedStr = e.key;
                } else {
                    scannedStr += e.key;
                }
                return;
            }
        });

    }, [])


    return (
        <>
            <label>Scan Barcode</label>
            <div style={{
                position: "relative"
            }}>
                <input className={`${className ? className.concat(' form-control') : 'form-control' }`} type="text" {...props} disabled={isLoading}/>
                {
                    isLoading?
                    <span style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: 8,
                    }}><BounceLoader /></span>
                    : ''
                }
            </div>
        </>
    )
}