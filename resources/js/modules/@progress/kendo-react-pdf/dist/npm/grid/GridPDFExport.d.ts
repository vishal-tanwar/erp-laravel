import * as React from 'react';
import * as PropTypes from 'prop-types';
import { savePDF } from '../savePDF';
import { PDFExportProps } from '../PDFExportProps';
/**
 * The props of the GridPDFExport component
 * ([more information and examples in the documentation on PDF export]({% slug overview_pdfexport_grid %})).
 */
export interface GridPDFExportProps extends PDFExportProps {
}
/**
 * A React component which facilitates the PDF export of the Grid.
 */
export declare class GridPDFExport extends React.Component<GridPDFExportProps, {}> {
    /**
     * @hidden
     */
    static propTypes: {
        author: PropTypes.Requireable<string>;
        avoidLinks: PropTypes.Requireable<NonNullable<string | boolean | null | undefined>>;
        forcePageBreak: PropTypes.Requireable<string>;
        keepTogether: PropTypes.Requireable<string>;
        creator: PropTypes.Requireable<string>;
        date: PropTypes.Requireable<Date>;
        imageResolution: PropTypes.Requireable<number>;
        fileName: PropTypes.Requireable<string>;
        forceProxy: PropTypes.Requireable<boolean>;
        keywords: PropTypes.Requireable<string>;
        landscape: PropTypes.Requireable<boolean>;
        margin: PropTypes.Requireable<NonNullable<string | number | PropTypes.InferProps<{
            left: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
            top: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
            right: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
            bottom: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        }> | null | undefined>>;
        pageTemplate: PropTypes.Requireable<any>;
        paperSize: PropTypes.Requireable<any>;
        repeatHeaders: PropTypes.Requireable<boolean>;
        scale: PropTypes.Requireable<number>;
        proxyData: PropTypes.Requireable<any>;
        proxyURL: PropTypes.Requireable<string>;
        proxyTarget: PropTypes.Requireable<string>;
        producer: PropTypes.Requireable<string>;
        subject: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
    };
    /**
     * @hidden
     */
    saveGridPDF: any;
    constructor(props: any);
    /**
     * @hidden
     */
    render(): null;
    /**
     * Saves the content of the Grid as a PDF file.
     *
     * @param data - The data can be different from the currently displayed data in the Grid. Can be used to export all Grid pages.
     * @param callback - The callback that will be executed after the PDF is saved.
     */
    save(data?: any[], callback?: () => void): void;
    protected getSavePDF(): typeof savePDF;
    private getGrid;
    private getCustomColumns;
}
