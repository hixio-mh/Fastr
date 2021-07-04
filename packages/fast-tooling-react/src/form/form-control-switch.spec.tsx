import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, render, shallow } from "enzyme";
import FormControlSwitch, { FormControlSwitchProps } from "./form-control-switch";
import { ContextComponent, DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import textareaSchema from "../__tests__/schemas/textarea.schema.json";
import oneOfSchema from "../__tests__/schemas/one-of.schema.json";
import checkboxSchema from "../__tests__/schemas/checkbox.schema.json";
import objectSchema from "../__tests__/schemas/objects.schema.json";
import arraySchema from "../__tests__/schemas/arrays.schema.json";
import childrenSchema from "../__tests__/schemas/children.schema.json";
import numberFieldSchema from "../__tests__/schemas/number-field.schema.json";
import {
    ArrayControlConfig,
    ChildrenControlConfig,
    CommonControlConfig,
    ControlConfig,
    ControlContext,
    LinkControlConfig,
    ListControlConfig,
    NumberTypeControlConfig,
    SingleLineControlPlugin,
    StandardControlPlugin,
    TextboxControlConfig,
} from "./templates";
import {
    ArrayControl,
    ButtonControl,
    ChildrenControl,
    NumberFieldControl,
    SelectControl,
    TextareaControl,
} from "./controls";
import { SectionLinkControl } from "./controls/control.section-link";
import { CheckboxControl } from "./controls/control.checkbox";
import { DisplayControl } from "./controls/control.display";
import { Controls } from "./form-section.props";

const selectControl: StandardControlPlugin = new StandardControlPlugin({
    control: (config: ListControlConfig): React.ReactNode => {
        return <SelectControl {...config} />;
    },
});
const arrayControl: StandardControlPlugin = new StandardControlPlugin({
    context: ControlContext.fill,
    control: (config: ArrayControlConfig): React.ReactNode => {
        return <ArrayControl {...config} />;
    },
});
const childrenControl: StandardControlPlugin = new StandardControlPlugin({
    context: ControlContext.fill,
    control: (config: ChildrenControlConfig): React.ReactNode => {
        return <ChildrenControl {...config} />;
    },
});
const numberFieldControl: StandardControlPlugin = new StandardControlPlugin({
    control: (config: NumberTypeControlConfig): React.ReactNode => {
        return <NumberFieldControl {...config} />;
    },
});
const checkboxControl: SingleLineControlPlugin = new SingleLineControlPlugin({
    control: (config: CommonControlConfig): React.ReactNode => {
        return <CheckboxControl {...config} />;
    },
});
const sectionLinkControl: StandardControlPlugin = new StandardControlPlugin({
    control: (config: LinkControlConfig): React.ReactNode => {
        return <SectionLinkControl {...config} />;
    },
});
const textareaControl: StandardControlPlugin = new StandardControlPlugin({
    control: (config: TextboxControlConfig): React.ReactNode => {
        return <TextareaControl {...config} />;
    },
});
const displayControl: StandardControlPlugin = new StandardControlPlugin({
    control: (config: ControlConfig): React.ReactNode => {
        return <DisplayControl {...config} />;
    },
});
const buttonControl: StandardControlPlugin = new StandardControlPlugin({
    control: (config: ControlConfig): React.ReactNode => {
        return <ButtonControl {...config} />;
    },
});

export const controls: Controls = {
    button: buttonControl,
    array: arrayControl,
    checkbox: checkboxControl,
    children: childrenControl,
    display: displayControl,
    textarea: textareaControl,
    select: selectControl,
    sectionLink: sectionLinkControl,
    numberField: numberFieldControl,
};

const TestFormControlSwitch: typeof FormControlSwitch &
    ContextComponent<any> = DragDropContext(HTML5Backend)(FormControlSwitch);

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

const formControlSwitchProps: FormControlSwitchProps = {
    index: 0,
    controls,
    propertyName: "",
    label: "Label",
    schema: {},
    data: {},
    required: false,
    untitled: "",
    schemaLocation: "",
    dataLocation: "",
    childOptions: [],
    onUpdateSection: null,
    onChange: null,
    invalidMessage: "",
};

describe("FormControlSwitch", () => {
    test("should not throw", () => {
        expect(() => {
            mount(<TestFormControlSwitch {...formControlSwitchProps} />);
        }).not.toThrow();
    });
    test("should render a number field when a number type is available", () => {
        const rendered: any = mount(
            <TestFormControlSwitch
                {...formControlSwitchProps}
                schema={numberFieldSchema.properties.quantity}
                schemaLocation={"properties.quantity"}
                dataLocation={"quantity"}
                propertyName={"quantity"}
                data={30}
            />
        );

        expect(rendered.find("NumberFieldControl")).toHaveLength(1);
    });
    test("should render a textarea when a string type is available", () => {
        const rendered: any = mount(
            <TestFormControlSwitch
                {...formControlSwitchProps}
                schema={textareaSchema.properties.textWithDefault}
                schemaLocation={"properties.text"}
                dataLocation={"text"}
                propertyName={"text"}
                data={"Foo"}
            />
        );

        expect(rendered.find("TextareaControl")).toHaveLength(1);
    });
    test("should render a checkbox when a boolean type is available", () => {
        const rendered: any = mount(
            <TestFormControlSwitch
                {...formControlSwitchProps}
                schema={checkboxSchema.properties.toggle}
                schemaLocation={"properties.toggle"}
                dataLocation={"toggle"}
                propertyName={"toggle"}
                data={true}
            />
        );

        expect(rendered.find("CheckboxControl")).toHaveLength(1);
    });
    test("should render a link when an object type is available", () => {
        const rendered: any = mount(
            <TestFormControlSwitch
                {...formControlSwitchProps}
                schema={objectSchema.properties.objectNoRequired}
                schemaLocation={"properties.objectNoRequired"}
                dataLocation={"objectNoRequired"}
                propertyName={"objectNoRequired"}
                data={{}}
            />
        );

        expect(rendered.find("SectionLinkControl")).toHaveLength(1);
    });
    test("should render the array UI when an array type is available", () => {
        const rendered: any = mount(
            <TestFormControlSwitch
                {...formControlSwitchProps}
                schema={arraySchema.properties.strings}
                schemaLocation={"properties.strings"}
                dataLocation={"strings"}
                propertyName={"strings"}
                data={[]}
            />
        );

        expect(rendered.find("ArrayControl")).toHaveLength(1);
    });
    test("should render the children UI when a children type is available", () => {
        const rendered: any = mount(
            <TestFormControlSwitch
                {...formControlSwitchProps}
                schema={childrenSchema.reactProperties.children}
                schemaLocation={"reactProperties.children"}
                dataLocation={"children"}
                propertyName={"children"}
                data={[]}
            />
        );

        expect(rendered.find("ChildrenControl")).toHaveLength(1);
    });
    test("should render a select when enums are available", () => {
        const rendered: any = mount(
            <TestFormControlSwitch
                {...formControlSwitchProps}
                schema={textareaSchema.properties.tag}
                schemaLocation={"properties.tag"}
                dataLocation={"tag"}
                propertyName={"tag"}
                data={"span"}
            />
        );

        expect(rendered.find("SelectControl")).toHaveLength(1);
    });
    test("should restrict the child options if ids have been passed", () => {
        const renderedWithDefault: any = mount(
            <TestFormControlSwitch
                {...formControlSwitchProps}
                childOptions={[
                    {
                        component: null,
                        schema: objectSchema,
                    },
                    {
                        component: null,
                        schema: arraySchema,
                    },
                    {
                        component: null,
                        schema: childrenSchema,
                    },
                ]}
                schema={childrenSchema.reactProperties.children}
                schemaLocation={"reactProperties.children"}
                dataLocation={"children"}
                propertyName={"children"}
                data={[]}
            />
        );

        const renderedWithoutDefaultAndIds: any = mount(
            <TestFormControlSwitch
                {...formControlSwitchProps}
                childOptions={[
                    {
                        component: null,
                        schema: objectSchema,
                    },
                    {
                        component: null,
                        schema: arraySchema,
                    },
                    {
                        component: null,
                        schema: childrenSchema,
                    },
                ]}
                schema={
                    childrenSchema.reactProperties.restrictedChildrenWithReactDefaults
                }
                schemaLocation={"reactProperties.restrictedChildrenWithReactDefaults"}
                dataLocation={"restrictedChildrenWithReactDefaults"}
                propertyName={"restrictedChildrenWithReactDefaults"}
                data={[]}
            />
        );

        const renderedWithDefaultAndIds: any = mount(
            <TestFormControlSwitch
                {...formControlSwitchProps}
                childOptions={[
                    {
                        component: null,
                        schema: objectSchema,
                    },
                    {
                        component: null,
                        schema: arraySchema,
                    },
                    {
                        component: null,
                        schema: childrenSchema,
                    },
                ]}
                schema={childrenSchema.reactProperties.restrictedWithChildren}
                schemaLocation={"reactProperties.restrictedWithChildren"}
                dataLocation={"restrictedWithChildren"}
                propertyName={"restrictedWithChildren"}
                data={[]}
            />
        );

        expect(renderedWithDefault.find("li")).toHaveLength(4);
        expect(renderedWithoutDefaultAndIds.find("li")).toHaveLength(1);
        expect(renderedWithDefaultAndIds.find("li")).toHaveLength(3);
    });
});
