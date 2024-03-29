import { matchesClasses, matchesNodeName, findElement } from './dom-queries';
/**
 * @hidden
 */
export var HEADER_CLASS = 'k-grid-header';
/**
 * @hidden
 */
export var FOOTER_CLASS = 'k-grid-footer';
var TABLE = 'TABLE';
var matchesTable = matchesNodeName(TABLE);
/**
 * @hidden
 */
var GridQuery = /** @class */ (function () {
    function GridQuery(element) {
        this.element = element;
        this.list = findElement(element, matchesClasses('k-grid'));
    }
    GridQuery.prototype.content = function () {
        return findElement(this.list, matchesClasses('k-grid'));
    };
    GridQuery.prototype.header = function () {
        this.headerWrap = this.headerWrap || findElement(this.element, matchesClasses(HEADER_CLASS));
        return findElement(this.headerWrap, matchesClasses("".concat(HEADER_CLASS)));
    };
    GridQuery.prototype.footer = function () {
        this.footerWrap = this.footerWrap || findElement(this.element, matchesClasses(FOOTER_CLASS));
        return findElement(this.footerWrap, matchesClasses("".concat(FOOTER_CLASS)));
    };
    GridQuery.prototype.table = function () {
        return findElement(this.element, matchesTable);
    };
    return GridQuery;
}());
export { GridQuery };
