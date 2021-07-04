import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import examples from "./examples.data";
import {
    generateSnapshots,
    SnapshotTestSuite,
} from "@microsoft/fast-jest-snapshots-react";
import MSFTMetatext, {
    MetatextHandledProps,
    MetatextManagedClasses,
    MetatextProps,
    MetatextTag,
    MetatextUnhandledProps,
} from "./metatext";
import { Metatext } from "./index";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("metatext snapshots", (): void => {
    generateSnapshots(examples as SnapshotTestSuite<MetatextProps>);
});

describe("metatext", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect((MSFTMetatext as any).name).toBe(MSFTMetatext.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<MSFTMetatext />);
        }).not.toThrow();
    });

    test("should accept unhandledProps", () => {
        const handledProps: MetatextHandledProps = {
            tag: MetatextTag.p,
        };

        const unhandledProps: MetatextUnhandledProps = {
            "aria-hidden": true,
        };

        const props: MetatextHandledProps & MetatextUnhandledProps = {
            ...handledProps,
            ...unhandledProps,
        };

        const rendered: any = mount(<Metatext {...props} />);

        expect(rendered.find(MetatextTag.p).prop("aria-hidden")).toEqual(true);
    });

    test("should render the correct `tag` when `tag` prop is passed", () => {
        const rendered: any = mount(<Metatext tag={MetatextTag.p} />);

        expect(rendered.exists(MetatextTag.p)).toBe(true);
    });
});
