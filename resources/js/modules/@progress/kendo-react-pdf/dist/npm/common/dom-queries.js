"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFocusableChild = exports.findFocusable = exports.findElement = exports.isFocusable = exports.isVisible = exports.contains = exports.closestInScope = exports.closest = exports.matchesNodeName = exports.matchesClasses = exports.hasClasses = void 0;
var focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
var NODE_NAME_PREDICATES = {};
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
/**
 * @hidden
 */
var hasClasses = function (element, classNames) {
    var namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find(function (className) { return namesList.indexOf(className) >= 0; }));
};
exports.hasClasses = hasClasses;
/**
 * @hidden
 */
var matchesClasses = function (classNames) {
    return function (element) { return (0, exports.hasClasses)(element, classNames); };
};
exports.matchesClasses = matchesClasses;
/**
 * @hidden
 */
var matchesNodeName = function (nodeName) {
    if (!NODE_NAME_PREDICATES[nodeName]) {
        NODE_NAME_PREDICATES[nodeName] = function (element) {
            return String(element.nodeName).toLowerCase() === nodeName.toLowerCase();
        };
    }
    return NODE_NAME_PREDICATES[nodeName];
};
exports.matchesNodeName = matchesNodeName;
/**
 * @hidden
 */
var closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
exports.closest = closest;
/**
 * @hidden
 */
var closestInScope = function (node, predicate, scope) {
    while (node && node !== scope && !predicate(node)) {
        node = node.parentNode;
    }
    if (node !== scope) {
        return node;
    }
};
exports.closestInScope = closestInScope;
/**
 * @hidden
 */
var contains = function (parent, node, matchSelf) {
    if (matchSelf === void 0) { matchSelf = false; }
    var outside = !(0, exports.closest)(node, function (child) { return child === parent; });
    if (outside) {
        return false;
    }
    var el = (0, exports.closest)(node, function (child) { return child === node; });
    return el && (matchSelf || el !== parent);
};
exports.contains = contains;
/**
 * @hidden
 */
var isVisible = function (element) {
    var rect = element.getBoundingClientRect();
    var hasSize = rect.width > 0 && rect.height > 0;
    var hasPosition = rect.x !== 0 && rect.y !== 0;
    // Elements can have zero size due to styling, but they still count as visible.
    // For example, the selection checkbox has no size, but is made visible through styling.
    return (hasSize || hasPosition) && window.getComputedStyle(element).visibility !== 'hidden';
};
exports.isVisible = isVisible;
/**
 * @hidden
 */
var isFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        var tabIndex = element.getAttribute('tabIndex');
        var skipTab = tabIndex === '-1';
        var focusable = tabIndex !== null && !skipTab;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled && !skipTab;
        }
        return focusable && (!checkVisibility || (0, exports.isVisible)(element));
    }
    return false;
};
exports.isFocusable = isFocusable;
/**
 * @hidden
 */
var findElement = function (node, predicate, matchSelf) {
    if (matchSelf === void 0) { matchSelf = true; }
    if (!node) {
        return;
    }
    if (matchSelf && predicate(node)) {
        return node;
    }
    node = node.firstChild;
    while (node) {
        if (node.nodeType === 1) {
            var element = (0, exports.findElement)(node, predicate);
            if (element) {
                return element;
            }
        }
        node = node.nextSibling;
    }
};
exports.findElement = findElement;
/**
 * @hidden
 */
var findFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    return (0, exports.findElement)(element, function (node) { return (0, exports.isFocusable)(node, checkVisibility); });
};
exports.findFocusable = findFocusable;
/**
 * @hidden
 */
var findFocusableChild = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    return (0, exports.findElement)(element, function (node) { return (0, exports.isFocusable)(node, checkVisibility); }, false);
};
exports.findFocusableChild = findFocusableChild;
