import { customElement } from "@microsoft/fast-element";
import {
    DataGrid,
    createDataGridTemplate,
    DataGridRow,
    createDataGridRowTemplate,
    DataGridCell,
    createDataGridCellTemplate,
} from "@microsoft/fast-foundation";
import { DataGridStyles as gridStyles } from "./data-grid.styles";
import { DataGridRowStyles as rowStyles } from "./data-grid-row.styles";
import { DataGridCellStyles as cellStyles } from "./data-grid-cell.styles";

/**
 * The FAST Data Grid Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fast-data-grid\>
 */
@customElement({
    name: "fast-data-grid",
    template: createDataGridTemplate("fast"),
    styles: gridStyles,
})
export class FASTDataGrid extends DataGrid {}

/**
 * Styles for DataGrid
 * @public
 */
export const DataGridStyles = gridStyles;

/**
 * The FAST Data Grid Row Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fast-data-grid-row\>
 */
@customElement({
    name: "fast-data-grid-row",
    template: createDataGridRowTemplate("fast"),
    styles: rowStyles,
})
export class FASTDataGridRow extends DataGridRow {}

/**
 * Styles for DataGrid row
 * @public
 */
export const DataGridRowStyles = rowStyles;

/**
 * The FAST Data Grid Cell Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fast-data-grid-cell\>
 */
@customElement({
    name: "fast-data-grid-cell",
    template: createDataGridCellTemplate("fast"),
    styles: cellStyles,
})
export class FASTDataGridCell extends DataGridCell {}

/**
 * Styles for DataGrid cell
 * @public
 */
export const DataGridCellStyles = cellStyles;
