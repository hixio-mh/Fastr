import React from "react";
import * as ShallowRenderer from "react-test-renderer/shallow";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Hypertext, {
    HypertextClassNameContract,
    HypertextHandledProps,
    HypertextManagedClasses,
    HypertextProps,
    HypertextUnhandledProps,
} from "./hypertext";
import { DisplayNamePrefix } from "../utilities";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("hypertext", (): void => {
    const managedClasses: HypertextClassNameContract = {
        hypertext: "hypertext-class",
    };

    test("should have a displayName that matches the component name", () => {
        expect(`${DisplayNamePrefix}${(Hypertext as any).name}`).toBe(
            Hypertext.displayName
        );
    });

    test("should have correct root element type 'a'", () => {
        const rendered: ShallowWrapper = shallow(<Hypertext />);
        expect(rendered.type()).toBe("a");
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<Hypertext />);
        }).not.toThrow();
    });

    test("should return an object that includes all valid props which are not enumerated as handledProps", () => {
        const handledProps: HypertextHandledProps & HypertextManagedClasses = {
            managedClasses,
        };

        const unhandledProps: HypertextUnhandledProps = {
            "aria-hidden": true,
        };

        const props: HypertextProps = { ...handledProps, ...unhandledProps };

        const rendered: any = shallow(<Hypertext {...props} />);

        expect(rendered.prop("aria-hidden")).not.toBe(undefined);
        expect(rendered.prop("aria-hidden")).toEqual(true);
    });

    test("should render with an attribute of `href` if `href` is passed as an unhandled prop", () => {
        const testHref: string = "http://www.microsoft.com";
        const rendered: any = shallow(
            <Hypertext href={testHref} managedClasses={managedClasses} />
        );

        expect(rendered.prop("href")).toBe(testHref);
    });

    test("should NOT render with an attribute of `href` if `href` prop is NOT passed", () => {
        const rendered: any = shallow(<Hypertext managedClasses={managedClasses} />);

        expect(rendered.prop("href")).toBe(null);
    });

    test("should correctly handle children", () => {
        const handledProps: HypertextProps = {
            managedClasses,
            href: "http://www.microsoft.com",
        };
        const rendered: any = shallow(
            <Hypertext managedClasses={managedClasses}>Children</Hypertext>
        );

        expect(rendered.prop("children")).not.toBe(undefined);
        expect(rendered.prop("children")).toEqual("Children");
    });
});
