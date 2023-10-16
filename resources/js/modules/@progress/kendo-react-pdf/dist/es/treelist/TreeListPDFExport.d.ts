import * as React from 'react';
import * as PropTypes from 'prop-types';
import { savePDF } from '../savePDF';
import { PDFExportProps } from '../PDFExportProps';
/**
 * The props of the TreeListPDFExport component
 * ([more information and examples in the documentation on PDF export]({% slug overview_pdfexport_treelist %})).
 */
export interface TreeListPDFExportProps extends PDFExportProps {
    /**
     * If set to true it will export all pages of the TreeList data. By default allPages is set to `false`.
     */
    allPages?: boolean;
}
/**
 * A React component which facilitates the PDF export of the TreeList.
 */
export declare class TreeListPDFExport extends React.Component<TreeListPDFExportProps, {}> {
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
        allPages: PropTypes.Requireable<boolean>;
    };
    /**
     * @hidden
     */
    saveTreeListPDF: any;
    constructor(props: any);
    /**
     * @hidden
     */
    render(): null;
    /**
     * Saves the content of the TreeList as a PDF file.
     *
     * @param data - The data that will be exported to the PDF. The data can be different from the currently displayed data in the TreeList.
     * @param columns - The columns that will be exported to the PDF. The columns collection can be different from the currently displayed in the TreeList.
     * @param callback - The callback that will be executed after the PDF is saved.
     */
    save(data?: any[], columns?: any[], callback?: () => void): void;
    protected getSavePDF(): typeof savePDF;
    private getTreeList;
}
