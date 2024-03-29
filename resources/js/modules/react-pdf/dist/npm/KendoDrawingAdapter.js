"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var defaultFileName = 'export.pdf';
var defaultCreator = 'KendoReact PDF Generator';
/**
 * @hidden
 */
var KendoDrawingAdapter = /** @class */ (function () {
    function KendoDrawingAdapter(drawDOM, exportPDF, saveAs, domElement, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.drawDOM = drawDOM;
        this.exportPDF = exportPDF;
        this.saveAs = saveAs;
        this.domElement = domElement;
        this.options = options;
        this.convertPageTemplateToHtml = function (pageContext) {
            var pageTemplateContent = ReactDOMServer.renderToStaticMarkup(React.createElement(_this.options.pageTemplate, {
                pageNum: pageContext.pageNum, totalPages: pageContext.totalPages
            }));
            return "<span>".concat(pageTemplateContent, "</span>");
        };
    }
    KendoDrawingAdapter.prototype.savePDF = function (callback) {
        var _this = this;
        var savePromise = this.drawDOM(this.domElement, this.getDrawOptions())
            .then(function (group) { return _this.exportPDF(group, _this.getPDFOptions()); })
            .then(function (dataUri) { return _this.saveAs(dataUri, _this.options.fileName || defaultFileName, _this.getSaveOptions()); });
        if (callback) {
            savePromise.then(callback, callback);
        }
    };
    KendoDrawingAdapter.prototype.getDrawOptions = function () {
        return {
            avoidLinks: this.options.avoidLinks,
            forcePageBreak: this.options.forcePageBreak,
            keepTogether: this.options.keepTogether,
            margin: this.options.margin,
            paperSize: this.options.paperSize,
            landscape: this.options.landscape,
            repeatHeaders: this.options.repeatHeaders,
            scale: this.options.scale,
            template: this.options.pageTemplate && this.convertPageTemplateToHtml
        };
    };
    KendoDrawingAdapter.prototype.getPDFOptions = function () {
        return {
            author: this.options.author,
            creator: this.options.creator || defaultCreator,
            date: this.options.date,
            imgDPI: this.options.imageResolution,
            keywords: this.options.keywords,
            landscape: this.options.landscape,
            margin: this.options.margin,
            multiPage: true,
            paperSize: this.options.paperSize,
            producer: this.options.producer,
            subject: this.options.subject,
            title: this.options.title
        };
    };
    KendoDrawingAdapter.prototype.getSaveOptions = function () {
        return {
            forceProxy: this.options.forceProxy,
            proxyData: this.options.proxyData,
            proxyTarget: this.options.proxyTarget,
            proxyURL: this.options.proxyURL
        };
    };
    return KendoDrawingAdapter;
}());
exports.default = KendoDrawingAdapter;
