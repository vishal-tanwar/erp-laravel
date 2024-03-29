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
import { getPageMargin } from '../getPageMargin';
import { savePDF } from '../savePDF';
import { provideSaveGridPDF } from './provideSaveGridPDF';
/**
 * A React component which facilitates the PDF export of the Grid.
 */
var GridPDFExport = /** @class */ (function (_super) {
    __extends(GridPDFExport, _super);
    function GridPDFExport(props) {
        var _this = _super.call(this, props) || this;
        _this.saveGridPDF = provideSaveGridPDF(_this.getSavePDF());
        return _this;
    }
    /**
     * @hidden
     */
    GridPDFExport.prototype.render = function () {
        return null;
    };
    /* eslint-disable max-len */
    /**
     * Saves the content of the Grid as a PDF file.
     *
     * @param data - The data can be different from the currently displayed data in the Grid. Can be used to export all Grid pages.
     * @param callback - The callback that will be executed after the PDF is saved.
     */
    // tslint:enable:max-line-length
    GridPDFExport.prototype.save = function (data, callback) {
        this.saveGridPDF(this.getGrid(), Object.assign({}, this.props, { margin: getPageMargin(this.props) }), callback, data, this.getCustomColumns());
    };
    GridPDFExport.prototype.getSavePDF = function () {
        return savePDF;
    };
    GridPDFExport.prototype.getGrid = function () {
        return React.Children
            .toArray(this.props.children)
            .find(function (child) { return child &&
            child.type.displayName === 'KendoReactGrid'; });
    };
    GridPDFExport.prototype.getCustomColumns = function () {
        return React.Children
            .toArray(this.props.children)
            .filter(function (child) { return child &&
            child.type.displayName === 'KendoReactGridColumn'; });
    };
    /**
     * @hidden
     */
    GridPDFExport.propTypes = {
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
    return GridPDFExport;
}(React.Component));
export { GridPDFExport };
