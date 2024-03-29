"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSaveTreeListPDF = void 0;
var ReactDOM = require("react-dom");
var React = require("react");
var export_element_1 = require("./export-element");
/**
 * @hidden
 */
function provideSaveTreeListPDF(savePDF) {
    return function (treeList, pdfExportOptions, callback, data, columns) {
        if (pdfExportOptions === void 0) { pdfExportOptions = {}; }
        return saveTreeListPDF(savePDF, treeList, pdfExportOptions, callback, data, columns);
    };
}
exports.provideSaveTreeListPDF = provideSaveTreeListPDF;
function saveTreeListPDF(savePDF, treeList, pdfExportOptions, callback, data, columns) {
    if (pdfExportOptions === void 0) { pdfExportOptions = {}; }
    rendertreeList();
    var treeListOuterWrapper;
    var treeListInnerWrapper;
    var finalContainer;
    function rendertreeList() {
        treeListOuterWrapper = document.createElement('div');
        treeListOuterWrapper.setAttribute('style', 'position:absolute; left: -5000px; top: 0px;');
        treeListInnerWrapper = document.createElement('div');
        treeListOuterWrapper.appendChild(treeListInnerWrapper);
        document.body.appendChild(treeListOuterWrapper);
        ReactDOM.render(prepareRawTreeListForExport(), treeListInnerWrapper, ontreeListRendered);
    }
    function ontreeListRendered() {
        savePDF(prepareFinalElementForExport(), pdfExportOptions, cleanUpAndInvokeCallback);
    }
    function cleanUpAndInvokeCallback() {
        document.body.removeChild(treeListOuterWrapper);
        document.body.removeChild(finalContainer);
        treeListOuterWrapper = finalContainer = undefined;
        if (callback) {
            callback();
        }
    }
    function prepareFinalElementForExport() {
        /* Ultimatelly, there is no need for double DOM-copying of the treeList.
        The one in this method is a copied Angular implementation
        that has been plugged almost seemlessly. */
        finalContainer = document.createElement('div');
        finalContainer.className = 'k-treelist-pdf-export-element';
        var result = (0, export_element_1.exportElement)(treeListInnerWrapper);
        finalContainer.appendChild(result);
        document.body.appendChild(finalContainer);
        return finalContainer;
    }
    function prepareRawTreeListForExport() {
        var customDataProps = pdfExportOptions.allPages && data ? { data: data, take: Number.MAX_VALUE, skip: 0 } : {};
        // A custom width is needed because otherwise when all pages are exported,
        // the "hidden" PDF treeList will be visible.
        var customStyleProp = { style: Object.assign({}, treeList.props.style, { width: '1000px' }) };
        var customProps = Object.assign({}, customDataProps, customStyleProp);
        if (columns && columns.length > 0) {
            return React.cloneElement(treeList, Object.assign({}, customProps, { columns: columns }));
        }
        else {
            return React.cloneElement(treeList, customProps);
        }
    }
}
