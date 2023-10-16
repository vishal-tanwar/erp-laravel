"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportElement = void 0;
var table_query_1 = require("../common/table-query");
var utils_1 = require("../common/utils");
/**
 * @hidden
 */
var exportElement = function (wrapper) {
    var query = new table_query_1.GridQuery(wrapper);
    var content = query.content();
    var result;
    var headerWithoutFilter = query.header();
    if (headerWithoutFilter.childNodes.length > 1) {
        headerWithoutFilter.removeChild(headerWithoutFilter.childNodes[1]);
    }
    headerWithoutFilter.childNodes[0].childNodes.forEach(function (headerCell) { return headerCell.style.top = 0; });
    if (content) {
        var colGroups = [content.querySelector('colgroup')];
        var headers = [headerWithoutFilter];
        var bodies = [content.querySelector('tbody')];
        var footer = query.footer();
        var footers = footer ? [footer.querySelector('tfoot')] : [];
        result = (0, utils_1.createTable)(colGroups, headers, bodies, footers);
    }
    else {
        result = (0, utils_1.wrapTable)(query.table().cloneNode(true));
    }
    return result;
};
exports.exportElement = exportElement;
