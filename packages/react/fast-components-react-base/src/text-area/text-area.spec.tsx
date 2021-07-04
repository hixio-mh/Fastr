import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow, ShallowWrapper } from "enzyme";
import { DisplayNamePrefix } from "../utilities";
import TextArea, {
    TextAreaClassNameContract,
    TextAreaHandledProps,
    TextAreaProps,
    TextAreaUnhandledProps,
} from "./text-area";

const managedClasses: TextAreaClassNameContract = {
    textArea: "text-area-class",
};

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("text-area", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect(`${DisplayNamePrefix}${(TextArea as any).name}`).toBe(
            TextArea.displayName
        );
    });

    test("should have correct root element type 'textarea'", () => {
        const rendered: ShallowWrapper = shallow(<TextArea />);
        expect(rendered.type()).toBe("textarea");
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<TextArea />);
        }).not.toThrow();
    });

    test("should return an object that includes all valid props which are not enumerated as handledProps", () => {
        const handledProps: TextAreaHandledProps = {
            managedClasses,
        };

        const unhandledProps: TextAreaUnhandledProps = {
            "aria-hidden": true,
        };
        const props: TextAreaProps = { ...handledProps, ...unhandledProps };
        const rendered: any = shallow(<TextArea {...props} />);

        expect(rendered.prop("aria-hidden")).not.toBe(undefined);
        expect(rendered.prop("aria-hidden")).toEqual(true);
    });

    test("should return an HTML `textarea` element", () => {
        const rendered: any = shallow(<TextArea managedClasses={managedClasses} />);

        expect(rendered.find("textarea").length).toBe(1);
    });

    test("should NOT render with a disabled value if no `disabled` prop is passed", () => {
        const rendered: any = shallow(<TextArea managedClasses={managedClasses} />);

        expect(rendered.prop("disabled")).toBe(undefined);
    });

    test("should render with a `disabled` value when `disabled` prop is passed", () => {
        const rendered: any = shallow(
            <TextArea managedClasses={managedClasses} disabled={true} />
        );

        expect(rendered.prop("disabled")).toBe(true);
    });

    test("should NOT render with a placeholder value if no `placeholder` prop is passed", () => {
        const rendered: any = shallow(<TextArea managedClasses={managedClasses} />);

        expect(rendered.prop("placeholder")).toBe(undefined);
    });

    test("should render with a placeholder value when `placeholder` prop is passed", () => {
        const rendered: any = shallow(
            <TextArea managedClasses={managedClasses} placeholder={"Test"} />
        );

        expect(rendered.prop("placeholder")).toEqual("Test");
    });
});
