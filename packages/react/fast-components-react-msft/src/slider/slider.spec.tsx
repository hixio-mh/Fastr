import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import { DisplayNamePrefix } from "../utilities";
import MSFTSlider from "./slider";
import { Slider, SliderUnhandledProps } from "./index";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("slider", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect(`${DisplayNamePrefix}${(MSFTSlider as any).name}`).toBe(
            MSFTSlider.displayName
        );
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<MSFTSlider />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: SliderUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(<Slider {...unhandledProps} />);

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });
});
