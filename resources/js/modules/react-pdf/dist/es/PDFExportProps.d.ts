/// <reference types="react" />
import { PaperSize, PageMargin } from '@progress/kendo-drawing/pdf';
/**
 * Represents the props of the KendoReact PDFExport component.
 */
export interface PDFExportProps {
    /**
     * @hidden
     */
    children?: React.ReactNode;
    /**
     * The author (metadata) of the PDF document.
     */
    author?: string;
    /**
     * A flag that indicates whether to produce actual hyperlinks in the exported PDF file. It is also possible to set a CSS selector. All matching links will be ignored.
     */
    avoidLinks?: boolean | string;
    /**
     * An optional CSS selector that specifies the elements which cause the page breaks.
     */
    forcePageBreak?: string;
    /**
     * An optional CSS selector that specifies the elements which should not be split across the pages.
     */
    keepTogether?: string;
    /**
     * The creator of the PDF document. Defaults to `KendoReact PDF Generator`.
     */
    creator?: string;
    /**
     * The date when the PDF document is created. Defaults to `new Date()`.
     */
    date?: Date;
    /**
     * The forced resolution of the images in the exported PDF document. By default, the images are exported at their full resolution.
     */
    imageResolution?: number;
    /**
     * Specifies the name of the exported PDF file. Defaults to `export.pdf`.
     */
    fileName?: string;
    /**
     * If set to `true`, the content is forwarded to `proxyURL` even if the browser supports local saving of files.
     */
    forceProxy?: boolean;
    /**
     * The keywords (metadata) of the PDF document.
     */
    keywords?: string;
    /**
     * A flag that indicates if the page will be in a landscape orientation. By default, the page is in a portrait orientation. Defaults to `false`.
     */
    landscape?: boolean;
    /**
     * Specifies the margins of the page.
     *
     * The supported units are:
     * * `"mm"`
     * * `"cm"`
     * * `"in"`
     * * `"pt"` (default).
     *
     * > Numbers are considered to be points (`"pt"`).
     */
    margin?: string | number | PageMargin;
    /**
     * A React functional or class component which is used as a template that is inserted into each page of the PDF document. The number of the current page (`pageNum`) and the total number of pages (`totalPages`) are passed to the component as properties.
     */
    pageTemplate?: any;
    /**
     * Specifies the paper size of the PDF document. Defaults to `"auto"` which means that the paper size is determined by the content. The size of the content in pixels matches the size of the output in points (1 pixel = 1/72 inch).
     *
     * If set, the content will be split across multiple pages. This enables the `repeatHeaders` and `scale` options, and allows you to specify a template.
     *
     * The supported values are:
     * * A predefined size. The supported paper sizes are: `A0-A10`, `B0-B10`, `C0-C10`, `Executive`, `Folio`, `Legal`, `Letter`, `Tabloid`.
     * * An array of two numbers which specify the width and height in points (1pt = 1/72in).
     * * An array of two strings which specify the width and height in units. The supported units are `"mm"`, `"cm"`, `"in"`, and `"pt"`.
     */
    paperSize?: PaperSize;
    /**
     * Specifies if the `<thead>` elements of the tables will be repeated on each page.
     */
    repeatHeaders?: boolean;
    /**
     * A scale factor. The text size on the screen might be too big for printing. To scale down the output in PDF, use this option. Defaults to `1`.
     */
    scale?: number;
    /**
     * A key/value dictionary of form values which will be sent to the proxy. Can be used to submit Anti-Forgery tokens and other metadata.
     */
    proxyData?: {
        [key: string]: string;
    };
    /**
     * The URL of the server-side proxy which streams the file to the end user. You need to use a proxy if the browser is not capable of saving files locally&mdash;for example, Internet Explorer 9 and Safari. It is your responsibility to implement the server-side proxy.
     *
     * In the request body, the proxy receives a `POST` request with the following parameters:
     * - `"contentType"`&mdash;The MIME type of the file.
     * - `"base64"`&mdash;The base-64 encoded file content.
     * - `"fileName"`&mdash;The file name, as requested by the caller.
     *
     * The proxy returns the decoded file with the `"Content-Disposition"` header set to `attachment;
     * filename="<fileName.pdf>"`.
     */
    proxyURL?: string;
    /**
     * A name or keyword which indicates where to display the document that is returned from the proxy. To display the document in a new window or iframe, the proxy has to have the `"Content-Disposition"` header set to `inline; filename="<fileName.pdf>"`. Defaults to `_self`.
     */
    proxyTarget?: string;
    /**
     * The producer (metadata) of the PDF document.
     */
    producer?: string;
    /**
     * The subject (metadata) of the PDF document.
     */
    subject?: string;
    /**
     * The title (metadata) of the PDF document.
     */
    title?: string;
}
