import { GridQuery } from '../common/table-query';
import { wrapTable, createTable } from '../common/utils';
/**
 * @hidden
 */
export var exportElement = function (wrapper) {
    var query = new GridQuery(wrapper);
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
        result = createTable(colGroups, headers, bodies, footers);
    }
    else {
        result = wrapTable(query.table().cloneNode(true));
    }
    return result;
};
