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
exports.PDFExport = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var kendo_drawing_1 = require("@progress/kendo-drawing");
var kendo_file_saver_1 = require("@progress/kendo-file-saver");
var getPageMargin_1 = require("./getPageMargin");
var KendoDrawingAdapter_1 = require("./KendoDrawingAdapter");
var licensing = require("@progress/kendo-licensing");
var package_metadata_1 = require("./package-metadata");
/**
 * Represents the KendoReact PDFExport component.
 */
var PDFExport = /** @class */ (function (_super) {
    __extends(PDFExport, _super);
    function PDFExport(props) {
        var _this = _super.call(this, props) || this;
        _this.rootElForPDF = null;
        if (typeof licensing !== 'undefined') {
            licensing.validatePackage(package_metadata_1.packageMetadata);
        }
        else {
            var message = "License activation failed for ".concat(package_metadata_1.packageMetadata.name, "\n");
            message += 'The @progress/kendo-licensing script is not loaded.\n';
            message += "See ".concat(package_metadata_1.packageMetadata.licensingDocsUrl, " for more information.\n");
            console.warn(message);
        }
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
        new KendoDrawingAdapter_1.default(kendo_drawing_1.drawDOM, kendo_drawing_1.exportPDF, kendo_file_saver_1.saveAs, this.rootElForPDF, this.getOptions()).savePDF(callback);
    };
    PDFExport.prototype.getOptions = function () {
        return Object.assign({}, this.props, { margin: (0, getPageMargin_1.getPageMargin)(this.props) });
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
exports.PDFExport = PDFExport;
