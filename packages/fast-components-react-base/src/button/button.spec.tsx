import * as React from "react";
import * as ShallowRenderer from "react-test-renderer/shallow";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import examples from "./examples.data";
import Button, {
    ButtonClassNameContract,
    ButtonHandledProps,
    ButtonHTMLTags,
    ButtonManagedClasses,
    ButtonProps,
    ButtonUnhandledProps,
} from "./button";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("button", (): void => {
    const managedClasses: ButtonClassNameContract = {
        button: "test-button",
    };
    const href: string = "https://www.microsoft.com";

    test("should have a displayName that matches the component name", () => {
        expect((Button as any).name).toBe(Button.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<Button />);
        }).not.toThrow();
    });

    test("should return an object that includes all valid props which are not enumerated as handledProps", () => {
        const handledProps: ButtonHandledProps = {
            managedClasses,
        };

        const unhandledProps: ButtonUnhandledProps = {
            "aria-hidden": true,
        };

        const props: ButtonProps = { ...handledProps, ...unhandledProps };

        const rendered: any = shallow(<Button {...props} />);

        expect(rendered.prop("aria-hidden")).not.toBe(undefined);
        expect(rendered.prop("aria-hidden")).toEqual(true);
    });

    test("should render by default as a `button` element", () => {
        const rendered: any = shallow(<Button managedClasses={managedClasses} />);

        expect(rendered.type()).toBe("button");
    });

    test("should render as an `anchor` element if the `href` prop is passed", () => {
        const rendered: any = shallow(
            <Button href={href} managedClasses={managedClasses} />
        );

        expect(rendered.type()).toBe("a");
    });

    test("should render `aria-disabled` if `href` and `disabled` props are passed", () => {
        const rendered: any = shallow(
            <Button href={href} managedClasses={managedClasses} disabled={true} />
        );

        expect(rendered.prop("disabled")).toBe(undefined);
        expect(rendered.prop("aria-disabled")).toBe(true);
    });

    test("should render `disabled` if the `disabled` prop is passed and the href prop is not passed", () => {
        const rendered: any = shallow(
            <Button disabled={true} managedClasses={managedClasses} />
        );

        expect(rendered.prop("aria-disabled")).toBe(undefined);
        expect(rendered.prop("disabled")).toBe(true);
    });

    test("should accept and render children", () => {
        const rendered: any = shallow(
            <Button managedClasses={managedClasses}>Children</Button>
        );

        expect(rendered.prop("children")).not.toBe(undefined);
        expect(rendered.prop("children")).toEqual("Children");
    });

    // parametrized button class name tests
    [
        {
            name: "should correctly assign className from input props",
            buttonHandledProps: {} as ButtonHandledProps,
            className: "class-name",
            expectedClassName: "class-name",
        },
        {
            name:
                "should correctly assign className when is disabled and root class name is empty",
            buttonHandledProps: { disabled: true } as ButtonHandledProps,
            className: "",
            expectedClassName: null,
        },
        {
            name: "should correctly assign className when is disabled",
            buttonHandledProps: { disabled: true } as ButtonHandledProps,
            className: "class-name",
            expectedClassName: "class-name",
        },
        {
            name:
                "should correctly assign className when is disabled (name not present) and managed class given",
            buttonHandledProps: {
                disabled: true,
                managedClasses: {
                    button: "button-class",
                },
            } as ButtonHandledProps,
            className: "",
            expectedClassName: "button-class",
        },
        {
            name:
                "should correctly assign className when is disabled (name present) and managed class given",
            buttonHandledProps: {
                disabled: true,
                managedClasses: {
                    button: "button-class",
                    button__disabled: "disabled",
                },
            } as ButtonHandledProps,
            className: "",
            expectedClassName: "button-class disabled",
        },
        {
            name:
                "should correctly assign className when is disabled (name present), managed and root class name present",
            buttonHandledProps: {
                disabled: true,
                managedClasses: {
                    button: "button-name",
                    button__disabled: "disabled",
                },
            } as ButtonHandledProps,
            className: "root-name",
            expectedClassName: "button-name disabled root-name",
        },
    ].forEach(({ name, buttonHandledProps, className, expectedClassName }: any) => {
        test(name, () => {
            const buttonProps: ButtonProps = { ...buttonHandledProps };

            const rendered: any = shallow(
                <Button {...buttonProps} className={className} />
            );

            expect(rendered.prop("className")).toEqual(expectedClassName);
        });
    });
});
