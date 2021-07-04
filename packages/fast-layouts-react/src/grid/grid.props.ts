import * as React from "react";
import { IManagedClasses } from "@microsoft/fast-jss-manager-react";
import { IGridClassNamesContract } from "./grid";
/**
 * The HTML tag for the Grid column: 'div' | 'section' | 'form' | 'article' | 'main';
 * @name GridTag
 * @typedef {GridTag}
 * @type {string}
 */
export enum GridTag {
    div = "div",
    section = "section",
    form = "form",
    article = "article",
    main = "main"
}

/**
 * Vertical alignment of a grid
 */
export enum GridAlignment {
    start = "start",
    center = "center",
    end = "end",
    stretch = "stretch"
}

/**
 * The scale factor for the grid gutter
 */
export type GridGutter = 0 | 2 | 3 | 6 | 12;

export interface IGridHandledProps {
    /**
     * The html tag for the grid container
     */
    tag?: GridTag;

    /**
     * The column the grid should occupy
     * Use this property to change the positioning of the grid within the page component
     */
    gridColumn?: number;

    /**
     * Adds a gutter between columns
     */
    gutter?: number | number[];

    /**
     * The number of columns the grid has
     */
    columnCount?: number;

    /**
     * The vertical alignment of columns
     */
    verticalAlign?: GridAlignment;

    /**
     * The horizontal alignment of columns
     */
    horizontalAlign?: GridAlignment;

    /**
     * The row that the grid should occupy.
     * Use this property to support -ms-grid when Grid is a child of an element who's display property is set to -ms-grid
     */
    row?: number;
}

export type GridProps = IGridHandledProps & IManagedClasses<IGridClassNamesContract> & React.HTMLAttributes<HTMLDivElement>;
