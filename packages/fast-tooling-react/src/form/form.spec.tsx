import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";
import { BareForm, Form } from "./";
import { FormProps } from "./form.props";

import objectSchema from "../__tests__/schemas/objects.schema.json";
import arraySchema from "../__tests__/schemas/arrays.schema.json";
import childrenSchema from "../__tests__/schemas/children.schema.json";
import invalidDataSchema from "../__tests__/schemas/invalid-data.schema.json";
import pluginSchema from "../__tests__/schemas/plugin.schema.json";

import { StringUpdateSchemaPlugin } from "../../app/pages/form/plugin/plugin";
import { ControlConfig, ControlType, StandardControlPlugin } from "./templates";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

const formProps: FormProps = {
    childOptions: [],
    schema: {},
    data: "",
    onChange: jest.fn(),
};

describe("Form", () => {
    test("should not throw", () => {
        expect(() => {
            mount(<Form {...formProps} />);
        }).not.toThrow();
    });
    test("should update the location by clicking a section link if location is not controlled by the user", () => {
        const rendered: any = mount(
            <Form
                {...formProps}
                schema={objectSchema}
                data={{
                    objectNoRequired: {},
                }}
            />
        );
        const form: any = rendered.find("Form");

        expect(form.state("navigation")).toHaveLength(1);

        form.find("SectionLinkControl")
            .at(0)
            .find("a")
            .simulate("click");

        expect(form.state("navigation")).toHaveLength(2);
    });
    test("should not update the location by clicking a section link if location is not controlled by the user", () => {
        const locationCallback: any = jest.fn();
        const rendered: any = mount(
            <Form
                {...formProps}
                schema={objectSchema}
                data={{
                    objectNoRequired: {},
                }}
                location={{
                    dataLocation: "",
                    onChange: locationCallback,
                }}
            />
        );
        const form: any = rendered.find("Form");

        expect(form.state("navigation")).toHaveLength(1);

        form.find("SectionLinkControl")
            .at(0)
            .find("a")
            .simulate("click");

        expect(form.state("navigation")).toHaveLength(1);
        expect(locationCallback).toHaveBeenCalled();
        expect(locationCallback.mock.calls[0][0]).toEqual("objectNoRequired");
    });
    test("should update the location by clicking an array link if location is not controlled by the user", () => {
        const rendered: any = mount(
            <Form
                {...formProps}
                schema={arraySchema}
                data={{
                    strings: ["Foo", "Bar"],
                }}
            />
        );
        const form: any = rendered.find("Form");

        expect(form.state("navigation")).toHaveLength(1);

        form.find("ArrayControl")
            .at(0)
            .find("a")
            .at(0)
            .simulate("click");

        expect(form.state("navigation")).toHaveLength(2);
    });
    test("should not update the location by clicking an array link if location is not controlled by the user", () => {
        const locationCallback: any = jest.fn();
        const rendered: any = mount(
            <Form
                {...formProps}
                schema={arraySchema}
                data={{
                    strings: ["Foo", "Bar"],
                }}
                location={{
                    dataLocation: "",
                    onChange: locationCallback,
                }}
            />
        );
        const form: any = rendered.find("Form");

        expect(form.state("navigation")).toHaveLength(1);

        form.find("ArrayControl")
            .at(0)
            .find("a")
            .at(0)
            .simulate("click");

        expect(form.state("navigation")).toHaveLength(1);
        expect(locationCallback).toHaveBeenCalled();
        expect(locationCallback.mock.calls[0][0]).toEqual("strings[0]");
    });
    test("should update the location by clicking a children link if location is not controlled by the user", () => {
        const rendered: any = mount(
            <Form
                {...formProps}
                schema={childrenSchema}
                data={{
                    children: "Foo",
                }}
            />
        );
        const form: any = rendered.find("Form");

        expect(form.state("navigation")).toHaveLength(1);

        form.find("ChildrenControl")
            .at(0)
            .find("a")
            .at(0)
            .simulate("click");

        expect(form.state("navigation")).toHaveLength(2);
    });
    test("should not update the location by clicking a children link if location is not controlled by the user", () => {
        const locationCallback: any = jest.fn();
        const rendered: any = mount(
            <Form
                {...formProps}
                schema={childrenSchema}
                data={{
                    children: "Foo",
                }}
                location={{
                    dataLocation: "",
                    onChange: locationCallback,
                }}
            />
        );
        const form: any = rendered.find("Form");

        expect(form.state("navigation")).toHaveLength(1);

        form.find("ChildrenControl")
            .at(0)
            .find("a")
            .at(0)
            .simulate("click");

        expect(form.state("navigation")).toHaveLength(1);
        expect(locationCallback).toHaveBeenCalled();
        expect(locationCallback.mock.calls[0][0]).toEqual("children");
    });
    test("should update the location by clicking a breadcrumb link if location is not controlled by the user", () => {
        const rendered: any = mount(
            <Form
                {...formProps}
                schema={objectSchema}
                data={{
                    objectNoRequired: {},
                }}
            />
        );
        const form: any = rendered.find("Form");

        expect(form.state("navigation")).toHaveLength(1);

        form.find("SectionLinkControl")
            .at(0)
            .find("a")
            .simulate("click");

        expect(form.state("navigation")).toHaveLength(2);

        rendered
            .find("Form")
            .find("a")
            .at(0)
            .simulate("click");

        expect(form.state("navigation")).toHaveLength(1);
    });
    test("should not update the location by clicking a breadcrumb link if location is not controlled by the user", () => {
        const locationCallback: any = jest.fn();
        const rendered: any = mount(
            <Form
                {...formProps}
                schema={objectSchema}
                data={{
                    objectNoRequired: {},
                }}
                location={{
                    dataLocation: "objectNoRequired",
                    onChange: locationCallback,
                }}
            />
        );
        const form: any = rendered.find("Form");

        expect(form.state("navigation")).toHaveLength(2);

        rendered
            .find("Form")
            .find("a")
            .at(0)
            .simulate("click");

        expect(form.state("navigation")).toHaveLength(2);
        expect(locationCallback).toHaveBeenCalled();
        expect(locationCallback.mock.calls[0][0]).toEqual("");
    });
    test("should not throw if the `onSchemaChange` is not provided and a plugin modifies the schema", () => {
        const plugins: any = [
            new StringUpdateSchemaPlugin({
                id: "plugins/pluginModifiedString",
            }),
        ];

        expect(() => {
            mount(
                <Form
                    schema={pluginSchema}
                    data={{}}
                    onChange={jest.fn()}
                    plugins={plugins}
                />
            );
        }).not.toThrow();
    });
    test("should not throw if the `onSchemaChange` is not provided and data is updated that modifies the schema", () => {
        const plugins: any = [
            new StringUpdateSchemaPlugin({
                id: "plugins/pluginModifiedString",
            }),
        ];
        const rendered: any = mount(
            <Form
                schema={objectSchema}
                data={{}}
                onChange={jest.fn()}
                plugins={plugins}
            />
        );

        expect(() => rendered.setProps({ schema: pluginSchema })).not.toThrow();
    });
    test("should not trigger the `onSchemaChange` if the schema has plugins that do not modify the schema", () => {
        const callback: any = jest.fn();
        const plugins: any = [
            new StringUpdateSchemaPlugin({
                id: "unmatchedPluginIdentifier",
            }),
        ];
        const rendered: any = mount(
            <Form
                schema={pluginSchema}
                data={{}}
                onChange={jest.fn()}
                plugins={plugins}
                onSchemaChange={callback}
            />
        );

        expect(callback).toHaveBeenCalledTimes(0);
    });
    test("should trigger the `onSchemaChange` if the schema has plugins that modify the schema", () => {
        const callback: any = jest.fn();
        const plugins: any = [
            new StringUpdateSchemaPlugin({
                id: "plugins/pluginModifiedString",
            }),
        ];
        const rendered: any = mount(
            <Form
                schema={pluginSchema}
                data={{}}
                onChange={jest.fn()}
                plugins={plugins}
                onSchemaChange={callback}
            />
        );

        expect(callback).toHaveBeenCalledTimes(1);
    });
    test("should trigger the `onSchemaChange` if the schema has plugins that modify the schema when data has been updated and this affects the way the schema is rendered", () => {
        const callback: any = jest.fn();
        const plugins: any = [
            new StringUpdateSchemaPlugin({
                id: "plugins/pluginModifiedString",
            }),
        ];
        const rendered: any = mount(
            <Form
                schema={pluginSchema}
                data={{}}
                onChange={jest.fn()}
                plugins={plugins}
                onSchemaChange={callback}
            />
        );

        expect(callback.mock.calls[0][0].properties.pluginModifiedString.enum).toEqual([
            "red",
            "green",
            "blue",
        ]);

        rendered.setProps({ data: { pluginModifiedNumber: 2 } });

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback.mock.calls[1][0].properties.pluginModifiedString.enum).toEqual([
            "bar",
        ]);
    });
    test("should trigger the `onSchemaChange` if the schema has been updated and plugins have not updated the schema", () => {
        const callback: any = jest.fn();
        const rendered: any = mount(
            <Form
                schema={pluginSchema}
                data={{}}
                onChange={jest.fn()}
                onSchemaChange={callback}
            />
        );

        expect(callback).toHaveBeenCalledTimes(0);

        rendered.setProps({ schema: objectSchema });

        expect(callback).toHaveBeenCalledTimes(1);
    });
    test("should trigger the `onSchemaChange` if the schema has been changed and plugins have updated the schema", () => {
        const callback: any = jest.fn();
        const plugins: any = [
            new StringUpdateSchemaPlugin({
                id: "plugins/pluginModifiedString",
            }),
        ];
        const rendered: any = mount(
            <Form
                schema={objectSchema}
                data={{}}
                onChange={jest.fn()}
                plugins={plugins}
                onSchemaChange={callback}
            />
        );

        expect(callback).toHaveBeenCalledTimes(0);

        rendered.setProps({ schema: pluginSchema });

        expect(callback).toHaveBeenCalledTimes(1);
    });
    test("should show an updated schema form item if the schema has been changed by plugins and `onSchemaChange` has been provided", () => {
        const callback: any = jest.fn();
        const plugins: any = [
            new StringUpdateSchemaPlugin({
                id: "plugins/pluginModifiedString",
            }),
        ];
        const rendered: any = mount(
            <Form
                schema={pluginSchema}
                data={{}}
                onChange={jest.fn()}
                plugins={plugins}
                onSchemaChange={callback}
            />
        );

        expect(rendered.find("SelectControl")).toHaveLength(2);

        rendered.setProps({ data: { pluginModifiedNumber: 2 } });
        rendered.update();

        expect(rendered.find("SelectControl")).toHaveLength(1);
    });
    test("should show an updated schema form item if the schema has been changed by plugins and `onSchemaChange` has not been provided", () => {
        const plugins: any = [
            new StringUpdateSchemaPlugin({
                id: "plugins/pluginModifiedString",
            }),
        ];
        const rendered: any = mount(
            <Form
                schema={pluginSchema}
                data={{}}
                onChange={jest.fn()}
                plugins={plugins}
            />
        );

        expect(rendered.find("SelectControl")).toHaveLength(2);

        rendered.setProps({ data: { pluginModifiedNumber: 2 } });
        rendered.update();

        expect(rendered.find("SelectControl")).toHaveLength(1);
    });
    test("should set validation errors to the form state.", () => {
        const data: any = {
            validBooleanRequired: true,
            invalidBooleanWrongType: "foo",
            invalidNullWrongType: "bar",
            invalidStringWrongType: false,
            invalidNumberWrongType: "bar",
            invalidEnumWrongType: "hello",
            invalidObjectWrongType: true,
            invalidArrayWrongType: "world",
            objectExample: {
                invalidBooleanWrongType: "bat",
            },
            arrayExample: [true],
        };

        const rendered: any = mount(
            <Form
                schema={invalidDataSchema}
                data={data}
                onChange={jest.fn()}
                displayValidationInline={true}
            />
        );

        expect(rendered.find("ArrayControl")).toHaveLength(2);
        expect(rendered.find("ArrayControl").get(0).props.invalidMessage).toEqual(
            "should be array"
        );
        expect(rendered.find("ArrayControl").get(1).props.invalidMessage).toEqual(
            "Contains invalid data"
        );
    });
    test("should show a custom form control by id when a custom form control has been passed", () => {
        const id1: string = "foo";
        const id2: string = "bat";
        const id3: string = "none";
        const schema: any = {
            type: "object",
            properties: {
                foo: {
                    type: "string",
                    formControlId: id1,
                },
                bat: {
                    type: "string",
                    formControlId: id2,
                },
                bar: {
                    type: "string",
                    formControlId: id3,
                },
            },
        };
        const rendered: any = mount(
            <BareForm
                schema={schema}
                data={{}}
                onChange={jest.fn()}
                controlPlugins={[
                    new StandardControlPlugin({
                        id: id1,
                        control: (config: ControlConfig): React.ReactNode => {
                            return <div id={id1} />;
                        },
                    }),
                    new StandardControlPlugin({
                        id: id2,
                        control: (config: ControlConfig): React.ReactNode => {
                            return <div id={id2} />;
                        },
                    }),
                ]}
            />
        );

        expect(rendered.find(`#${id1}`)).toHaveLength(1);
        expect(rendered.find(`#${id2}`)).toHaveLength(1);
        expect(rendered.find(`#${id3}`)).toHaveLength(0);
    });
    test("should show a custom form control by type when a custom form control has been passed", () => {
        const id1: string = "foo";
        const rendered: any = mount(
            <BareForm
                schema={{
                    type: "object",
                    properties: {
                        foo: {
                            type: "string",
                        },
                        bar: {
                            type: "string",
                        },
                        bat: {
                            type: "boolean",
                        },
                    },
                }}
                data={{}}
                onChange={jest.fn()}
                controlPlugins={[
                    new StandardControlPlugin({
                        type: ControlType.textarea,
                        control: (config: ControlConfig): React.ReactNode => {
                            return <div id={id1} />;
                        },
                    }),
                ]}
            />
        );

        expect(rendered.find(`#${id1}`)).toHaveLength(2);
    });
    test("should show controls in categories if categories are passed", () => {
        const rendered: any = mount(
            <BareForm
                schema={{
                    type: "object",
                    properties: {
                        foo: {
                            type: "string",
                        },
                        bar: {
                            type: "number",
                        },
                        bat: {
                            type: "boolean",
                        },
                    },
                    formConfig: {
                        categories: [
                            {
                                title: "Category A",
                                expandable: true,
                                items: ["foo"],
                            },
                            {
                                title: "Category B",
                                items: ["bar"],
                            },
                        ],
                    },
                }}
                data={{}}
                onChange={jest.fn()}
            />
        );

        const categories: any = rendered.find("FormCategory");

        expect(categories).toHaveLength(2);
        expect(categories.at(0).find("TextareaControl")).toHaveLength(1);
        expect(categories.at(1).find("NumberFieldControl")).toHaveLength(1);
        expect(rendered.find("CheckboxControl")).toHaveLength(1);
    });
    test("should update controls if oneOf select has a value change", () => {
        const rendered: any = mount(
            <BareForm
                schema={{
                    oneOf: [
                        {
                            type: "object",
                            properties: {
                                foo: {
                                    type: "string",
                                },
                                bar: {
                                    type: "number",
                                },
                                bat: {
                                    type: "boolean",
                                },
                            },
                            required: ["foo", "bar", "bat"],
                            formConfig: {
                                categories: [
                                    {
                                        title: "Category A",
                                        expandable: true,
                                        items: ["foo"],
                                    },
                                    {
                                        title: "Category B",
                                        items: ["bar"],
                                    },
                                ],
                            },
                        },
                    ],
                }}
                data={undefined}
                onChange={callback}
            />
        );
        function callback(data: any): void {
            rendered.setProps({ data });
        }

        const categoriesBefore: any = rendered.find("FormCategory");

        expect(categoriesBefore).toHaveLength(0);
        expect(categoriesBefore.at(0).find("TextareaControl")).toHaveLength(0);
        expect(categoriesBefore.at(1).find("NumberFieldControl")).toHaveLength(0);
        expect(rendered.find("CheckboxControl")).toHaveLength(0);

        const select: any = rendered.find("select");

        select.simulate("change", { target: { value: "0" } });

        const categoriesAfter: any = rendered.find("FormCategory");

        expect(categoriesAfter).toHaveLength(2);
        expect(categoriesAfter.at(0).find("TextareaControl")).toHaveLength(1);
        expect(categoriesAfter.at(1).find("NumberFieldControl")).toHaveLength(1);
        expect(rendered.find("CheckboxControl")).toHaveLength(1);
    });
});
