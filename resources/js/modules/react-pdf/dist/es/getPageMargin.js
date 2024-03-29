import * as React from 'react';
import { PDFMargin } from './PDFMargin';
var fieldsNames = ['bottom', 'left', 'right', 'top'];
/**
 * @hidden
 * Returns the margin options by reading the props of he component and the `PDFMargin` child.
 * The props of the `PDFMargin` child are with greater priority.
 */
export function getPageMargin(props) {
    var marginChild = React.Children
        .toArray(props.children)
        .find(function (child) { return child && child.type === PDFMargin; });
    return marginChild ? getMarginComponentProps(marginChild) : props.margin;
}
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
