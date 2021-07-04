import BreakpointTracker, { BreakpointTrackerCallback } from "./breakpoint-tracker";
import { Breakpoint, Breakpoints, defaultBreakpoints } from "./breakpoints";

/* tslint:disable:no-string-literal */
describe("breakpointTracker", (): void => {
    let subscriber: any;
    let callback: any;

    beforeEach(() => {
        subscriber = {
            onBreakpointChanged: (notification: BreakpointTrackerCallback): void => {
                return;
            },
        };

        callback = jest.fn();
    });

    test("should successfully track subscribers", (): void => {
        BreakpointTracker.subscribe(callback);
        BreakpointTracker.notifySubscribers(1);

        expect(callback).toBeCalled();
    });

    test("should successfully remove subscribers", (): void => {
        BreakpointTracker.subscribe(callback);
        BreakpointTracker.unsubscribe(callback);
        BreakpointTracker.notifySubscribers(2);

        expect(callback).not.toBeCalled();
    });

    test("should initialize with default breakpoint values", (): void => {
        BreakpointTracker.subscribe(subscriber.onBreakpointChange);

        expect(BreakpointTracker.breakpoints).toEqual(defaultBreakpoints);
    });

    test("should provide a breakpoint value when `currentBreakpoint` is called", (): void => {
        BreakpointTracker.subscribe(subscriber.onBreakpointChange);

        expect(typeof BreakpointTracker.currentBreakpoint() === "number").toBe(true);
    });

    test("should set new breakpoint values when provided", (): void => {
        const newBreakpoints: Breakpoints = [0, 500, 900, 1400];

        // Expect default values
        expect(BreakpointTracker.breakpoints).toEqual(defaultBreakpoints);

        // Set new values
        BreakpointTracker.breakpoints = newBreakpoints;

        // Expect new values
        expect(BreakpointTracker.breakpoints).toEqual(newBreakpoints);

        // Update to default values
        BreakpointTracker.breakpoints = defaultBreakpoints;

        // Expect default values
        expect(BreakpointTracker.breakpoints).toEqual(defaultBreakpoints);
    });

    test("should update `currentBreakpoint` value when new breakpoint values provided", (): void => {
        const breakpointsOne: Breakpoints = [0, 500, 900, 1400];
        const breakpointsTwo: Breakpoints = [0, 200, 400, 600, 800];

        // set innerWidth to 700
        (window as any)["innerWidth"] = 700;

        // Set breakpoints set one
        BreakpointTracker.breakpoints = breakpointsOne;

        // Expect new values
        expect(BreakpointTracker.currentBreakpoint()).toEqual(1);

        // Set breakpoints set two
        BreakpointTracker.breakpoints = breakpointsTwo;

        // Expect new values
        expect(BreakpointTracker.currentBreakpoint()).toEqual(3);

        // Update to default values
        BreakpointTracker.breakpoints = defaultBreakpoints;
    });
});
