var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
import { getPageMargin } from './getPageMargin';
import KendoDrawingAdapter from './KendoDrawingAdapter';
/**
 * Represents the KendoReact PDFExport component.
 */
var PDFExport = /** @class */ (function (_super) {
    __extends(PDFExport, _super);
    function PDFExport(props) {
        var _this = _super.call(this, props) || this;
        _this.rootElForPDF = null;
        return _this;
    }
    /**
     * @hidden
     */
    PDFExport.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { ref: function (el) { _this.rootElForPDF = el; } }, this.props.children));
    };
    /**
     * Saves the content as a PDF file.
     *
     * @param callback - The callback to be executed after the PDF is saved.
     */
    PDFExport.prototype.save = function (callback) {
        new KendoDrawingAdapter(drawDOM, exportPDF, saveAs, this.rootElForPDF, this.getOptions()).savePDF(callback);
    };
    PDFExport.prototype.getOptions = function () {
        return Object.assign({}, this.props, { margin: getPageMargin(this.props) });
    };
    /**
     * @hidden
     */
    PDFExport.propTypes = {
        author: PropTypes.string,
        avoidLinks: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        forcePageBreak: PropTypes.string,
        keepTogether: PropTypes.string,
        creator: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        imageResolution: PropTypes.number,
        fileName: PropTypes.string,
        forceProxy: PropTypes.bool,
        keywords: PropTypes.string,
        landscape: PropTypes.bool,
        margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({
                left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })]),
        pageTemplate: PropTypes.any,
        paperSize: PropTypes.any,
        repeatHeaders: PropTypes.bool,
        scale: PropTypes.number,
        proxyData: PropTypes.any,
        proxyURL: PropTypes.string,
        proxyTarget: PropTypes.string,
        producer: PropTypes.string,
        subject: PropTypes.string,
        title: PropTypes.string
    };
    return PDFExport;
}(React.Component));
export { PDFExport };
