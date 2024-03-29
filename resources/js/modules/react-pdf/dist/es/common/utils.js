var FIRST_CLASS = 'k-first';
var HEADER_CLASS = 'k-grid-header';
var FOOTER_CLASS = 'k-grid-footer';
/**
 * @hidden
 */
export var appendNodes = function (element, nodes) {
    var length = nodes.length;
    for (var idx = 0; idx < length; idx++) {
        element.appendChild(nodes[idx].cloneNode(true));
    }
};
/**
 * @hidden
 */
export var wrapTable = function (table) {
    var wrapper = document.createElement('div');
    wrapper.className = 'k-grid k-grid-md';
    wrapper.appendChild(table);
    return wrapper;
};
/**
 * @hidden
 */
export var createTableElement = function (sources) {
    var sourceCount = sources.length;
    var element = sources[0].cloneNode(true);
    var rowsCount = element.rows.length;
    if (sourceCount > 1) {
        for (var rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
            for (var sourceIdx = 1; sourceIdx < sourceCount; sourceIdx++) {
                appendNodes(element.rows[rowIdx], sources[sourceIdx].rows[rowIdx].cells);
            }
        }
    }
    return element;
};
/**
 * @hidden
 */
export var setFirstCellClass = function (header, headers) {
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
/**
 * @hidden
 */
export var createTable = function (colGroups, headers, bodies, footers) {
    var table = document.createElement('table');
    var colGroup = colGroups[0].cloneNode(true);
    for (var idx = 1; idx < colGroups.length; idx++) {
        appendNodes(colGroup, colGroups[idx].querySelectorAll('col'));
    }
    var header = createTableElement(headers);
    var body = createTableElement(bodies);
    header.className = HEADER_CLASS;
    setFirstCellClass(header, headers);
    table.appendChild(colGroup);
    table.appendChild(header);
    table.appendChild(body);
    if (footers.length) {
        var footer = createTableElement(footers);
        footer.className = FOOTER_CLASS;
        table.appendChild(footer);
    }
    return wrapTable(table);
};
