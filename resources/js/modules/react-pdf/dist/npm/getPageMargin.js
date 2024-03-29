"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageMargin = void 0;
var React = require("react");
var PDFMargin_1 = require("./PDFMargin");
var fieldsNames = ['bottom', 'left', 'right', 'top'];
/**
 * @hidden
 * Returns the margin options by reading the props of he component and the `PDFMargin` child.
 * The props of the `PDFMargin` child are with greater priority.
 */
function getPageMargin(props) {
    var marginChild = React.Children
        .toArray(props.children)
        .find(function (child) { return child && child.type === PDFMargin_1.PDFMargin; });
    return marginChild ? getMarginComponentProps(marginChild) : props.margin;
}
exports.getPageMargin = getPageMargin;
function getMarginComponentProps(marginComponent) {
    var result = {};
    for (var idx = 0; idx < fieldsNames.length; idx++) {
        var fieldName = fieldsNames[idx];
        var value = marginComponent.props[fieldName];
        if (value !== undefined) {
            result[fieldName] = value;
        }
    }
    return result;
}
