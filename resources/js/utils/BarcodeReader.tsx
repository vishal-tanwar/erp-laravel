import React, { ReactElement } from "react";

type Props = {
    barcode: string
}

type States = {
    barcode: string
}

class BarcodeReader extends React.Component<Props, Props>{

    constructor(props:Props){
        super(props);

        this.state = {
            barcode: ''
        }
    }

    componentDidMount(): void {
        
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        
    }

    shouldComponentUpdate(nextProps: Readonly<{}>): boolean {
        console.log( nextProps );
        return true;
    }

    componentWillUnmount(): void {
        
    }

    render():ReactElement {
        return (
            <>
            </>
        )
    }

}

export default BarcodeReader;