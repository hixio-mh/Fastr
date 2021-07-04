import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, mount, render, shallow } from "enzyme";
import AutoSuggest, { AutoSuggestUnhandledProps } from "./auto-suggest";
import ListboxItem from "../listbox-item";
import { KeyCodes } from "@microsoft/fast-web-utilities";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

const itemA: JSX.Element = <ListboxItem id="a" value="a" />;
const itemB: JSX.Element = <ListboxItem id="b" value="b" />;
const itemC: JSX.Element = <ListboxItem id="c" value="c" />;

describe("auto suggest", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect((AutoSuggest as any).name).toBe(AutoSuggest.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<AutoSuggest listboxId="listboxId" />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: AutoSuggestUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(
            <AutoSuggest listboxId="listboxId" {...unhandledProps} />
        );

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });

    test("initial default state is correct", (): void => {
        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId">
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>
        );

        expect(rendered.state("value")).toBe("");
        expect(rendered.state("focusedItem")).toBe(null);
        expect(rendered.state("isMenuOpen")).toBe(false);
    });

    test("input region accessibility attributes are set correctly (autocomplete='both', )", (): void => {
        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId">
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>
        );

        const input: any = rendered.find("input");
        expect(input.prop("aria-autocomplete")).toEqual("both");
        expect(input.prop("role")).toEqual("combobox");
    });

    test("input region gets label applied from props", (): void => {
        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId" label="test-label">
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>
        );

        const input: any = rendered.find("input");
        expect(input.prop("aria-label")).toEqual("test-label");
    });

    test("input region is disabled when component is disabled", (): void => {
        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId" disabled={true}>
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>
        );

        const input: any = rendered.find("input");
        expect(input.prop("disabled")).toBe(true);
    });

    test("input region 'aria-owns' and 'aria-controls' attributes are null by default and point to listbox id when listbox is open", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId">
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>,
            { attachTo: container }
        );

        let input: any = rendered.find("input");
        expect(input.prop("aria-owns")).toBe(null);
        expect(input.prop("aria-controls")).toBe(null);
        expect(input.prop("aria-activedescendant")).toBe(null);
        input.simulate("keydown", { keyCode: KeyCodes.arrowDown });

        input = rendered.find("input");
        expect(input.prop("aria-owns")).toEqual("listboxId");
        expect(input.prop("aria-controls")).toEqual("listboxId");
        expect(input.prop("aria-activedescendant")).toEqual("a");

        rendered
            .find({ id: "a" })
            .find("ListboxItem")
            .simulate("keydown", { keyCode: KeyCodes.arrowDown });
        input = rendered.find("input");
        expect(input.prop("aria-owns")).toEqual("listboxId");
        expect(input.prop("aria-controls")).toEqual("listboxId");
        expect(input.prop("aria-activedescendant")).toEqual("b");

        document.body.removeChild(container);
    });

    test("input region 'aria-owns' and 'aria-controls' attributes are null by default and point to listbox id when listbox is open", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId">
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>,
            { attachTo: container }
        );

        let input: any = rendered.find("input");
        expect(input.prop("aria-owns")).toBe(null);
        expect(input.prop("aria-controls")).toBe(null);
        input.simulate("keydown", { keyCode: KeyCodes.arrowDown });

        input = rendered.find("input");
        expect(input.prop("aria-owns")).toEqual("listboxId");
        expect(input.prop("aria-controls")).toEqual("listboxId");

        rendered
            .find({ id: "a" })
            .find("ListboxItem")
            .simulate("keydown", { keyCode: KeyCodes.arrowDown });
        input = rendered.find("input");
        expect(input.prop("aria-owns")).toEqual("listboxId");
        expect(input.prop("aria-controls")).toEqual("listboxId");

        document.body.removeChild(container);
    });

    test("input region 'aria-activedescendant' is initially null and tracks focused item in listbox", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId">
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>,
            { attachTo: container }
        );

        let input: any = rendered.find("input");
        expect(input.prop("aria-activedescendant")).toBe(null);
        input.simulate("keydown", { keyCode: KeyCodes.arrowDown });

        input = rendered.find("input");
        expect(input.prop("aria-activedescendant")).toEqual("a");

        rendered
            .find({ id: "a" })
            .find("ListboxItem")
            .simulate("keydown", { keyCode: KeyCodes.arrowDown });
        input = rendered.find("input");
        expect(input.prop("aria-activedescendant")).toEqual("b");

        document.body.removeChild(container);
    });

    test("menu should open and have correct id on input region click", (): void => {
        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId">
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>
        );

        const input: any = rendered.find("input");
        expect(rendered.state("isMenuOpen")).toBe(false);
        input.simulate("click");
        expect(rendered.state("isMenuOpen")).toBe(true);

        const listbox: any = rendered.find('[role="listbox"]');
        expect(listbox.prop("id")).toBe("listboxId");
    });

    test("arrow keys properly traverse the listbox and input region and cause focus and value to changes appropriately", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId">
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>,
            { attachTo: container }
        );
        const input: any = rendered.find("input");
        expect(document.activeElement.id).toBe("");
        expect(rendered.state("value")).toEqual("");
        input.simulate("keydown", { keyCode: KeyCodes.arrowDown });
        expect(document.activeElement.id).toBe("a");
        expect(rendered.state("value")).toEqual("a");
        rendered
            .find({ id: "a" })
            .find("ListboxItem")
            .simulate("keydown", { keyCode: KeyCodes.arrowDown });
        expect(document.activeElement.id).toBe("b");
        expect(rendered.state("value")).toEqual("b");
        rendered
            .find({ id: "b" })
            .find("ListboxItem")
            .simulate("keydown", { keyCode: KeyCodes.arrowDown });
        expect(document.activeElement.id).toBe("c");
        expect(rendered.state("value")).toEqual("c");
        rendered
            .find({ id: "c" })
            .find("ListboxItem")
            .simulate("keydown", { keyCode: KeyCodes.arrowDown });
        expect(document.activeElement.id).toBe("");
        expect(rendered.state("value")).toEqual("c");
        input.simulate("keydown", { keyCode: KeyCodes.arrowUp });
        expect(document.activeElement.id).toBe("c");
        expect(rendered.state("value")).toEqual("c");
        rendered
            .find({ id: "c" })
            .find("ListboxItem")
            .simulate("keydown", { keyCode: KeyCodes.arrowUp });
        expect(document.activeElement.id).toBe("b");
        expect(rendered.state("value")).toEqual("b");
        rendered
            .find({ id: "b" })
            .find("ListboxItem")
            .simulate("keydown", { keyCode: KeyCodes.arrowUp });
        expect(document.activeElement.id).toBe("a");
        expect(rendered.state("value")).toEqual("a");
        rendered
            .find({ id: "a" })
            .find("ListboxItem")
            .simulate("keydown", { keyCode: KeyCodes.arrowUp });
        expect(document.activeElement.id).toBe("");
        expect(rendered.state("value")).toEqual("a");

        document.body.removeChild(container);
    });

    test("onValueChanged event handler called when text changes in input region", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const onValueChange: any = jest.fn();
        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId" onValueChange={onValueChange}>
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>,
            { attachTo: container }
        );

        expect(onValueChange).toHaveBeenCalledTimes(0);
        expect(rendered.state("value")).toBe("");
        const input: any = rendered.find("input");
        input.simulate("keydown", { keyCode: KeyCodes.arrowDown });
        expect(rendered.state("value")).toBe("a");
        expect(onValueChange).toHaveBeenCalledTimes(1);

        document.body.removeChild(container);
    });

    test("onInvoked event handler called on keydown of list item", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const onInvoked: any = jest.fn();
        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId" onInvoked={onInvoked}>
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>,
            { attachTo: container }
        );

        expect(onInvoked).toHaveBeenCalledTimes(0);
        const input: any = rendered.find("input");
        input.simulate("keydown", { keyCode: KeyCodes.arrowDown });
        rendered
            .find({ id: "a" })
            .find("ListboxItem")
            .simulate("keydown", { keyCode: KeyCodes.enter });
        expect(onInvoked).toHaveBeenCalledTimes(1);

        document.body.removeChild(container);
    });

    test("onInvoked event handler called on keydown of input element", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const onInvoked: any = jest.fn();
        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId" onInvoked={onInvoked}>
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>,
            { attachTo: container }
        );

        expect(onInvoked).toHaveBeenCalledTimes(0);
        const input: any = rendered.find("input");
        input.simulate("keydown", { keyCode: KeyCodes.enter });
        expect(onInvoked).toHaveBeenCalledTimes(1);

        document.body.removeChild(container);
    });

    test("intialValue prop applied correctly", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId" initialValue="test">
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>,
            { attachTo: container }
        );
        expect(rendered.state("value")).toBe("test");

        document.body.removeChild(container);
    });

    test("Custom input region render function is called", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const inputRenderFn: any = jest.fn();
        inputRenderFn.mockReturnValue("Test");
        const rendered: any = mount(
            <AutoSuggest listboxId="listboxId" inputRegion={inputRenderFn}>
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>,
            { attachTo: container }
        );
        expect(inputRenderFn).toHaveBeenCalledTimes(1);

        document.body.removeChild(container);
    });
});
