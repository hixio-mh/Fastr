import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ShallowRenderer from "react-test-renderer/shallow";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import examples from "./examples.data";
import {
    generateSnapshots,
    SnapshotTestSuite,
} from "@microsoft/fast-jest-snapshots-react";
import Dialog, {
    DialogClassNameContract,
    DialogHandledProps,
    DialogManagedClasses,
    DialogProps,
    DialogUnhandledProps,
} from "./dialog";
import { KeyCodes } from "@microsoft/fast-web-utilities";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("dialog snapshot", (): void => {
    generateSnapshots(examples as SnapshotTestSuite<DialogProps>);
});

describe("dialog", (): void => {
    const managedClasses: DialogClassNameContract = {
        dialog: "dialog-class",
        dialog_contentRegion: "dialog-content-region-class",
        dialog_modalOverlay: "dialog-modal-overlay-class",
    };

    test("should have a displayName that matches the component name", () => {
        expect((Dialog as any).name).toBe(Dialog.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<Dialog />);
            shallow(<Dialog modal={true} />);
        }).not.toThrow();
    });

    test("should return an object that includes all valid props which are not enumerated as handledProps", () => {
        const handledProps: DialogHandledProps = {
            managedClasses,
            label: "Dialog label",
        };

        const unhandledProps: any = {
            "data-m": "foo",
        } as DialogUnhandledProps;

        const props: DialogProps = { ...handledProps, ...unhandledProps };

        const rendered: any = shallow(<Dialog {...props} />);

        expect(rendered.prop("data-m")).not.toBe(undefined);
        expect(rendered.prop("data-m")).toEqual("foo");
    });

    test("should call the `onDismiss` callback after a click event on the modal overlay when `visible` prop is true", () => {
        const onDismiss: any = jest.fn();
        const rendered: any = shallow(
            <Dialog managedClasses={managedClasses} modal={true} onDismiss={onDismiss} />
        );

        rendered.find(`.${managedClasses.dialog_modalOverlay}`).simulate("click");

        expect(onDismiss).toHaveBeenCalledTimes(0);

        rendered.setProps({ visible: true });

        rendered.find(`.${managedClasses.dialog_modalOverlay}`).simulate("click");

        expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    test("should call the `onDismiss` callback when escape key is pressed and `visible` prop is true", () => {
        const onDismiss: any = jest.fn();
        const map: any = {};

        // Mock window.addEventListener
        window.addEventListener = jest.fn((event: string, callback: any) => {
            map[event] = callback;
        });

        const rendered: any = mount(
            <Dialog managedClasses={managedClasses} modal={true} onDismiss={onDismiss} />
        );

        map.keydown({ keyCode: KeyCodes.escape });

        expect(onDismiss).toHaveBeenCalledTimes(0);

        // set visible prop
        rendered.setProps({ visible: true });

        map.keydown({ keyCode: KeyCodes.escape });

        expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    test("should remove keydown event listener for the `onDismiss` callback when component unmounts", () => {
        const onDismiss: any = jest.fn();
        const map: any = {};

        // Mock window.removeEventListener
        window.removeEventListener = jest.fn((event: string, callback: any) => {
            map[event] = callback;
        });

        const rendered: any = mount(
            <Dialog
                managedClasses={managedClasses}
                modal={true}
                onDismiss={onDismiss}
                visible={true}
            />
        );

        rendered.unmount();

        map.keydown({ keyCode: KeyCodes.escape });

        expect(onDismiss).toHaveBeenCalledTimes(1);
    });
});
