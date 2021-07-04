import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import {
    Column,
    ColumnClassNamesContract,
    ColumnHandledProps,
    ColumnUnhandledProps,
} from "./column";

/**
 * Mock and allow control of canUseCssGrid return value
 */
jest.mock("@microsoft/fast-web-utilities", () => {
    return {
        ...jest.requireActual("@microsoft/fast-web-utilities"),
        canUseCssGrid: (): boolean => true,
    };
});

/**
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("Column", (): void => {
    const managedClasses: ColumnClassNamesContract = {
        column: "column",
    };
    test("should have a displayName that matches the component name", () => {
        expect(`${(Column as any).name}`).toBe(Column.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<Column />);
        }).not.toThrow();
    });

    test("should accept unhandledProps", () => {
        const unhandledProps: ColumnUnhandledProps = {
            "aria-hidden": true,
        };

        const props: ColumnHandledProps & ColumnUnhandledProps = {
            span: 2,
            ...unhandledProps,
        };

        const rendered: any = mount(
            <Column managedClasses={managedClasses} {...props} />
        );

        expect(rendered.first().prop("aria-hidden")).toEqual(true);
    });

    test("should set a default span value if no `span` prop is passed", () => {
        const rendered: any = mount(<Column managedClasses={managedClasses} />);

        expect(rendered.props().span).not.toBe(undefined);
        expect(rendered.props().span).toBe(12);
    });

    test("should set a span value equal to the `span` prop when passed", () => {
        const rendered: any = mount(<Column span={2} managedClasses={managedClasses} />);

        expect(rendered.props().span).toBe(2);
    });

    test("should set an inline style for gridColumn equal to the `span` prop when passed", () => {
        const rendered: any = shallow(
            <Column span={1} managedClasses={managedClasses} />
        );

        expect(rendered.props().style.gridColumn).toBe("span 1");
    });

    test("should set `gridColumn` inline style value in pixels equal to the `span` prop", () => {
        const rendered: any = shallow(
            <Column span={4} managedClasses={managedClasses} />
        );

        expect(rendered.props().style.gridColumn).toEqual("span 4");
    });

    test("should accept an array of span values", () => {
        const rendered: any = mount(
            <Column span={[12, 10, 8]} managedClasses={managedClasses} />
        );

        expect(() => rendered).not.toThrow();
        expect(rendered.props().span).toStrictEqual([12, 10, 8]);
    });

    test("should set `gridColumn` inline style value relative to the index of the current breakpoint", () => {
        const rendered: any = shallow(
            <Column span={[12, 10, 6]} managedClasses={managedClasses} />
        );

        expect(rendered.props().style.gridColumn).toEqual("span 6");

        /*tslint:disable-next-line:no-string-literal*/
        (window as any)["innerWidth"] = 0;

        // set props to force an update
        rendered.setProps({});

        expect(rendered.props().style.gridColumn).toEqual("span 12");
    });

    test("should set a position value equal to the `position` prop when passed", () => {
        const rendered: any = mount(
            <Column position={2} managedClasses={managedClasses} />
        );

        expect(rendered.props().position).toBe(2);
    });

    test("should set `gridColumn` inline style value with position value when `position` prop is passed", () => {
        const rendered: any = shallow(
            <Column span={12} position={1} managedClasses={managedClasses} />
        );

        expect(rendered.props().style.gridColumn).toEqual("1 / span 12");
    });

    test("should accept an array of position values", () => {
        const rendered: any = mount(
            <Column position={[8, 9]} managedClasses={managedClasses} />
        );

        expect(() => rendered).not.toThrow();
        expect(rendered.props().position).toStrictEqual([8, 9]);
    });

    test("should set `gridColumn` inline style value with position value relative to the index of the current breakpoint", () => {
        /*tslint:disable-next-line:no-string-literal*/
        (window as any)["innerWidth"] = 1399;

        const rendered: any = shallow(
            <Column
                span={[12, 10, 6]}
                position={[1, 2, 3]}
                managedClasses={managedClasses}
            />
        );

        expect(rendered.props().style.gridColumn).toEqual("3 / span 6");

        /*tslint:disable-next-line:no-string-literal*/
        (window as any)["innerWidth"] = 0;

        // set props to force an update
        rendered.setProps({});

        expect(rendered.props().style.gridColumn).toEqual("1 / span 12");
    });

    test("should set a row value equal to the `row` prop when passed", () => {
        const rendered: any = mount(<Column row={2} managedClasses={managedClasses} />);

        expect(rendered.props().row).toBe(2);
    });

    test("should set `gridRowStart` inline style value in pixels equal to the `row` prop", () => {
        const rendered: any = shallow(<Column row={2} managedClasses={managedClasses} />);

        expect(rendered.props().style.gridRowStart).toEqual("2");
    });

    test("should accept an array of row values", () => {
        const rendered: any = mount(
            <Column row={[4, 5]} managedClasses={managedClasses} />
        );

        expect(() => rendered).not.toThrow();
        expect(rendered.props().row).toStrictEqual([4, 5]);
    });

    test("should set `gridRowStart` inline style value in pixels relative to the index of the current breakpoint", () => {
        const rendered: any = shallow(
            <Column row={[3, 2, 1]} managedClasses={managedClasses} />
        );

        // previous window width was 0
        expect(rendered.props().style.gridRowStart).toEqual("3");

        /*tslint:disable-next-line:no-string-literal*/
        (window as any)["innerWidth"] = 1399;

        // set props to force an update
        rendered.setProps({});

        expect(rendered.props().style.gridRowStart).toEqual("1");
    });

    test("should set a order value equal to the `order` prop when passed", () => {
        const rendered: any = mount(<Column order={2} managedClasses={managedClasses} />);

        expect(rendered.props().order).toBe(2);
    });

    test("should set `order` inline style value in pixels equal to the `order` prop", () => {
        const rendered: any = shallow(
            <Column order={2} managedClasses={managedClasses} />
        );

        expect(rendered.props().style.order).toEqual(2);
    });

    test("should accept an array of order values", () => {
        const rendered: any = mount(
            <Column order={[1, 2]} managedClasses={managedClasses} />
        );

        expect(() => rendered).not.toThrow();
        expect(rendered.props().order).toStrictEqual([1, 2]);
    });

    test("should set `order` inline style value in pixels relative to the index of the current breakpoint", () => {
        const rendered: any = shallow(
            <Column order={[3, 2, 1]} managedClasses={managedClasses} />
        );

        // previous window width was 1399
        expect(rendered.props().style.order).toEqual(1);

        /*tslint:disable-next-line:no-string-literal*/
        (window as any)["innerWidth"] = 0;

        // set props to force an update
        rendered.setProps({});

        expect(rendered.props().style.order).toEqual(3);
    });

    test("should set a gutter value equal to the `gutter` prop when passed", () => {
        const rendered: any = mount(
            <Column gutter={2} managedClasses={managedClasses} />
        );

        expect(rendered.props().gutter).toBe(2);
    });
});
