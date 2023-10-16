import * as React from 'react';
import * as PropTypes from 'prop-types';
/**
 * Represents the props of the KendoReact PDFMargin component.
 */
export interface PDFMarginProps {
    /**
     * The bottom margin.
     *
     * The supported units are:
     * * `"mm"`
     * * `"cm"`
     * * `"in"`
     * * `"pt"` (default).
     *
     * > Numbers are considered to be points (`"pt"`).
     */
    left?: number | string;
    /**
     * The top margin.
     *
     * The supported units are:
     * * `"mm"`
     * * `"cm"`
     * * `"in"`
     * * `"pt"` (default).
     *
     * > Numbers are considered to be points (`"pt"`).
     */
    top?: number | string;
    /**
     * The right margin.
     *
     * The supported units are:
     * * `"mm"`
     * * `"cm"`
     * * `"in"`
     * * `"pt"` (default).
     *
     * > Numbers are considered to be points (`"pt"`).
     */
    right?: number | string;
    /**
     * The bottom margin.
     *
     * The supported units are:
     * * `"mm"`
     * * `"cm"`
     * * `"in"`
     * * `"pt"` (default).
     *
     * > Numbers are considered to be points (`"pt"`).
     */
    bottom?: number | string;
}
/**
 * @hidden
 */
export declare class PDFMargin extends React.Component<PDFMarginProps, {}> {
    static propTypes: {
        left: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        top: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        right: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        bottom: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
    };
    render(): null;
}
