import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Breakpoints, defaultBreakpoints } from "./breakpoints";
import BreakpointTracker from "./breakpoint-tracker";

configure({ adapter: new Adapter() });

const globalAny: any = global;

describe("BreakpointTracker", (): void => {
    function renderChild(breakpoint: number): JSX.Element {
        return <p>{breakpoint}</p>;
    }

    test("should pass active breakpoint value in the render prop", (): void => {
        // update window.innerWidth to 1300 ("vp4")
        globalAny.window.innerWidth = 1300;

        const rendered: any = mount(<BreakpointTracker render={renderChild} />);

        expect(rendered.state("activeBreakpoint")).toBe(3);
        expect(rendered.find("p").text()).toEqual("3");
    });

    test("should provide default breakpoint values", (): void => {
        // reset window.innerWidth to 1024 (2)
        globalAny.window.innerWidth = 1024;

        const rendered: any = mount(<BreakpointTracker render={renderChild} />);

        expect(BreakpointTracker.breakpoints).toEqual(defaultBreakpoints);
        expect(rendered.state("activeBreakpoint")).toEqual(2);
    });

    test("should allow custom breakpoints to be set", (): void => {
        const customBreakpoints: Breakpoints = [0, 800, 1000, 1500];

        // window.innerWidth is 1024 (3)
        BreakpointTracker.breakpoints = customBreakpoints;

        const rendered: any = mount(<BreakpointTracker render={renderChild} />);

        expect(rendered.state("activeBreakpoint")).toEqual(2);
    });

    test("should add resize event listener to the window", (): void => {
        const map: any = {};
        const resizeCallback: any = jest.fn();

        // Mock window.removeEventListener
        window.addEventListener = jest.fn((event: string, callback: any) => {
            // if an event is added for resize, add a callback to mock
            if (event === "resize") {
                callback = resizeCallback;
            }

            map[event] = callback;
        });

        const rendered: any = mount(<BreakpointTracker render={renderChild} />);

        map.resize();

        expect(resizeCallback).toHaveBeenCalledTimes(1);
    });

    test("should remove resize event listener from the window when component unmounts", (): void => {
        const map: any = {};
        const resizeCallback: any = jest.fn();

        // Mock window.removeEventListener
        window.removeEventListener = jest.fn((event: string, callback: any) => {
            // if an event is added for resize, add a callback to mock
            if (event === "resize") {
                callback = resizeCallback;
            }

            map[event] = callback;
        });

        const rendered: any = mount(<BreakpointTracker render={renderChild} />);

        rendered.unmount();

        map.resize();

        expect(resizeCallback).toHaveBeenCalledTimes(1);
    });
});
