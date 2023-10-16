"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable = exports.setFirstCellClass = exports.createTableElement = exports.wrapTable = exports.appendNodes = void 0;
var FIRST_CLASS = 'k-first';
var HEADER_CLASS = 'k-grid-header';
var FOOTER_CLASS = 'k-grid-footer';
/**
 * @hidden
 */
var appendNodes = function (element, nodes) {
    var length = nodes.length;
    for (var idx = 0; idx < length; idx++) {
        element.appendChild(nodes[idx].cloneNode(true));
    }
};
exports.appendNodes = appendNodes;
/**
 * @hidden
 */
var wrapTable = function (table) {
    var wrapper = document.createElement('div');
    wrapper.className = 'k-grid k-grid-md';
    wrapper.appendChild(table);
    return wrapper;
};
exports.wrapTable = wrapTable;
/**
 * @hidden
 */
var createTableElement = function (sources) {
    var sourceCount = sources.length;
    var element = sources[0].cloneNode(true);
    var rowsCount = element.rows.length;
    if (sourceCount > 1) {
        for (var rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
            for (var sourceIdx = 1; sourceIdx < sourceCount; sourceIdx++) {
                (0, exports.appendNodes)(element.rows[rowIdx], sources[sourceIdx].rows[rowIdx].cells);
            }
        }
    }
    return element;
};
exports.createTableElement = createTableElement;
/**
 * @hidden
 */
var setFirstCellClass = function (header, headers) {
    if (headers.length > 1 && header.rows.length > 1) {
        for (var idx = 1; idx < header.rows.length; idx++) {
            var firstCellIndex = headers[0].rows[idx].cells.length;
            var cell = header.rows[idx].cells[firstCellIndex];
            if (String(cell.className).indexOf(FIRST_CLASS) === -1) {
                cell.className += " ".concat(FIRST_CLASS);
            }
        }
    }
};
exports.setFirstCellClass = setFirstCellClass;
/**
 * @hidden
 */
var createTable = function (colGroups, headers, bodies, footers) {
    var table = document.createElement('table');
    var colGroup = colGroups[0].cloneNode(true);
    for (var idx = 1; idx < colGroups.length; idx++) {
        (0, exports.appendNodes)(colGroup, colGroups[idx].querySelectorAll('col'));
    }
    var header = (0, exports.createTableElement)(headers);
    var body = (0, exports.createTableElement)(bodies);
    header.className = HEADER_CLASS;
    (0, exports.setFirstCellClass)(header, headers);
    table.appendChild(colGroup);
    table.appendChild(header);
    table.appendChild(body);
    if (footers.length) {
        var footer = (0, exports.createTableElement)(footers);
        footer.className = FOOTER_CLASS;
        table.appendChild(footer);
    }
    return (0, exports.wrapTable)(table);
};
exports.createTable = createTable;
