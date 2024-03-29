import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { exportElement } from './export-element';
/**
 * @hidden
 */
export function provideSaveGridPDF(savePDF) {
    return function (grid, pdfExportOptions, callback, data, columns) {
        if (pdfExportOptions === void 0) { pdfExportOptions = {}; }
        return saveGridPDF(savePDF, grid, pdfExportOptions, callback, data, columns);
    };
}
function saveGridPDF(savePDF, grid, pdfExportOptions, callback, data, columns) {
    if (pdfExportOptions === void 0) { pdfExportOptions = {}; }
    renderGrid();
    var gridOuterWrapper;
    var gridInnerWrapper;
    var finalContainer;
    function renderGrid() {
        gridOuterWrapper = document.createElement('div');
        gridOuterWrapper.setAttribute('style', 'position:absolute; left: -5000px; top: 0px;');
        gridInnerWrapper = document.createElement('div');
        gridOuterWrapper.appendChild(gridInnerWrapper);
        document.body.appendChild(gridOuterWrapper);
        ReactDOM.render(prepareRawGridForExport(), gridInnerWrapper, onGridRendered);
    }
    function onGridRendered() {
        savePDF(prepareFinalElementForExport(), pdfExportOptions, cleanUpAndInvokeCallback);
    }
    function cleanUpAndInvokeCallback() {
        document.body.removeChild(gridOuterWrapper);
        document.body.removeChild(finalContainer);
        gridOuterWrapper = finalContainer = undefined;
        if (callback) {
            callback();
        }
    }
    function prepareFinalElementForExport() {
        /* Ultimatelly, there is no need for double DOM-copying of the grid.
        The one in this method is a copied Angular implementation
        that has been plugged almost seemlessly. */
        finalContainer = document.createElement('div');
        finalContainer.className = 'k-grid-pdf-export-element';
        var result = exportElement(gridInnerWrapper);
        finalContainer.appendChild(result);
        document.body.appendChild(finalContainer);
        return result;
    }
    function prepareRawGridForExport() {
        var customDataProps = data && { data: data, total: data.length, pageSize: data.length, skip: 0 };
        // A custom width is needed because otherwise when all pages are exported,
        // the "hidden" PDF grid will be visible.
        var customStyleProp = { style: Object.assign({}, grid.props.style, { width: '1000px' }) };
        var customProps = Object.assign({}, customDataProps, customStyleProp);
        if (columns && columns.length > 0) {
            var notColumnChildren = getGridNotColumnChildren(grid);
            return React.cloneElement(grid, customProps, columns.concat(notColumnChildren));
        }
        else {
            return React.cloneElement(grid, customProps);
        }
    }
}
function getGridNotColumnChildren(grid) {
    return React.Children
        .toArray(grid.props.children)
        .filter(function (child) { return child && child.type &&
        child.type.displayName !== 'KendoReactGridColumn'; });
}
