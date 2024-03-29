"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeListPDFExport = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var getPageMargin_1 = require("../getPageMargin");
var savePDF_1 = require("../savePDF");
var provideSaveTreeListPDF_1 = require("./provideSaveTreeListPDF");
/**
 * A React component which facilitates the PDF export of the TreeList.
 */
var TreeListPDFExport = /** @class */ (function (_super) {
    __extends(TreeListPDFExport, _super);
    function TreeListPDFExport(props) {
        var _this = _super.call(this, props) || this;
        _this.saveTreeListPDF = (0, provideSaveTreeListPDF_1.provideSaveTreeListPDF)(_this.getSavePDF());
        return _this;
    }
    /**
     * @hidden
     */
    TreeListPDFExport.prototype.render = function () {
        return null;
    };
    /* eslint-disable max-len */
    /**
     * Saves the content of the TreeList as a PDF file.
     *
     * @param data - The data that will be exported to the PDF. The data can be different from the currently displayed data in the TreeList.
     * @param columns - The columns that will be exported to the PDF. The columns collection can be different from the currently displayed in the TreeList.
     * @param callback - The callback that will be executed after the PDF is saved.
     */
    // tslint:enable:max-line-length
    TreeListPDFExport.prototype.save = function (data, columns, callback) {
        this.saveTreeListPDF(this.getTreeList(), Object.assign({}, this.props, { margin: (0, getPageMargin_1.getPageMargin)(this.props) }), callback, data, columns || []);
    };
    TreeListPDFExport.prototype.getSavePDF = function () {
        return savePDF_1.savePDF;
    };
    TreeListPDFExport.prototype.getTreeList = function () {
        var children = this.props.children;
        if (children && children.props.data && children.props.columns) {
            return this.props.children;
        }
    };
    /**
     * @hidden
     */
    TreeListPDFExport.propTypes = {
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
        title: PropTypes.string,
        allPages: PropTypes.bool
    };
    return TreeListPDFExport;
}(React.Component));
exports.TreeListPDFExport = TreeListPDFExport;
