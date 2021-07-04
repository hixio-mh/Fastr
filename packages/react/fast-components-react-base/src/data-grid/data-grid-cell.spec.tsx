import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { DataGridCellClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { merge } from "lodash-es";
import { keyCodeArrowDown } from "@microsoft/fast-web-utilities";
import { configure, mount, ReactWrapper } from "enzyme";
import { DisplayNamePrefix } from "../utilities";
import DataGridCell from "./data-grid-cell";
import { DataGridContext } from "./data-grid-context";
import { DataGridColumn, DataGridProps } from "./data-grid.props";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("data grid cell", (): void => {
    const managedClasses: DataGridCellClassNameContract = {
        dataGridCell: "dataGridCell",
    };

    const rowData1: object = {
        name: "Thomas",
        age: 25,
    };

    const rowData2: object = {
        name: "Richard",
        age: 26,
    };

    const rowData3: object = {
        name: "Harold",
        age: 27,
    };

    const column1: DataGridColumn = {
        columnDataKey: "name",
        title: "Name",
        columnWidth: "200px",
    };

    const column2: DataGridColumn = {
        columnDataKey: "age",
        title: "Age",
        columnWidth: "200px",
    };

    const gridProps: DataGridProps = {
        dataRowKey: "name",
        rows: [rowData1, rowData2, rowData3],
        columns: [column1, column2],
        rowHeight: 60,
    };

    test("should have a displayName that matches the component name", () => {
        expect(`${DisplayNamePrefix}${(DataGridCell as any).name}`).toBe(
            DataGridCell.displayName
        );
    });

    test("cellId, role and base class gets written to dom element", (): void => {
        const rendered: ReactWrapper = mount(
            <DataGridContext.Provider
                value={
                    {
                        onCellFocused: null,
                        onCellKeyDown: null,
                        focusRowKey: null,
                        focusColumnKey: null,
                        desiredVisibleRowIndex: null,
                        desiredFocusRowKey: null,
                        desiredFocusColumnKey: null,
                        dataGridProps: gridProps,
                    } as any
                }
            >
                <DataGridCell
                    rowData={rowData1}
                    column={column1}
                    columnIndex={0}
                    managedClasses={managedClasses}
                />
            </DataGridContext.Provider>
        );

        const cell: any = rendered.children();
        expect(cell.prop("data-cellid")).toEqual("name");
        expect(cell.prop("role")).toEqual("gridcell");
        expect(cell.prop("className")).toContain(managedClasses.dataGridCell);
    });

    test("tab index is 0 when context indicates cell has default focus", (): void => {
        const rendered: ReactWrapper = mount(
            <DataGridContext.Provider
                value={
                    {
                        focusRowKey: "Thomas",
                        focusColumnKey: "name",
                        dataRowKey: "name",
                        columns: [column1, column2],
                    } as any
                }
            >
                <DataGridCell
                    rowData={rowData1}
                    column={column1}
                    columnIndex={0}
                    managedClasses={managedClasses}
                />
            </DataGridContext.Provider>
        );

        const cell: any = rendered.children();
        expect(cell.prop("tabIndex")).toEqual(0);
    });

    test("tab index is -1 when context indicates cell does not have default focus", (): void => {
        const rendered: ReactWrapper = mount(
            <DataGridContext.Provider
                value={
                    {
                        focusRowKey: "NotThomas",
                        focusColumnKey: "name",
                        dataRowKey: "name",
                        columns: [column1, column2],
                    } as any
                }
            >
                <DataGridCell
                    rowData={rowData1}
                    column={column1}
                    columnIndex={0}
                    managedClasses={managedClasses}
                />
            </DataGridContext.Provider>
        );

        const cell: any = rendered.children();
        expect(cell.prop("tabIndex")).toEqual(-1);
    });

    test("onCellKeyDown callback is called on keydown", (): void => {
        const onCellKeyDown: any = jest.fn();

        const rendered: ReactWrapper = mount(
            <DataGridContext.Provider
                value={
                    {
                        onCellKeyDown,
                        dataRowKey: "name",
                        columns: [column1, column2],
                    } as any
                }
            >
                <DataGridCell
                    rowData={rowData1}
                    column={column1}
                    columnIndex={0}
                    managedClasses={managedClasses}
                />
            </DataGridContext.Provider>
        );

        expect(onCellKeyDown).toHaveBeenCalledTimes(0);
        const cell: any = rendered.children();
        cell.simulate("keyDown", { keyCode: keyCodeArrowDown });
        expect(onCellKeyDown).toHaveBeenCalledTimes(1);
    });

    test("onFocus callback is called on on focus", (): void => {
        const onCellFocused: any = jest.fn();

        const rendered: ReactWrapper = mount(
            <DataGridContext.Provider
                value={
                    {
                        onCellFocused,
                        dataRowKey: "name",
                        columns: [column1, column2],
                    } as any
                }
            >
                <DataGridCell
                    rowData={rowData1}
                    column={column1}
                    columnIndex={0}
                    managedClasses={managedClasses}
                />
            </DataGridContext.Provider>
        );

        expect(onCellFocused).toHaveBeenCalledTimes(0);
        const cell: any = rendered.children();
        cell.simulate("focus");
        expect(onCellFocused).toHaveBeenCalledTimes(1);
    });

    test("Custom cell render function is called", (): void => {
        const cellRenderFunction: any = jest.fn();
        cellRenderFunction.mockReturnValue("Test");
        const updatedColumns: DataGridColumn = merge({}, column1, {
            cell: cellRenderFunction,
        });

        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        const rendered: ReactWrapper = mount(
            <DataGridContext.Provider
                value={
                    {
                        dataRowKey: "name",
                        columns: [column1, column2],
                    } as any
                }
            >
                <DataGridCell
                    rowData={rowData1}
                    column={updatedColumns}
                    columnIndex={0}
                    managedClasses={managedClasses}
                />
            </DataGridContext.Provider>
        );

        expect(cellRenderFunction).toHaveBeenCalledTimes(1);
    });
});
