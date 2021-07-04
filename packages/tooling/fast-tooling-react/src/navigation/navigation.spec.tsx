import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, render, shallow } from "enzyme";
import { NavigationProps } from "./navigation.props";
import { ModularNavigation, Navigation } from "./index";
import {
    DataType,
    InitializeMessageOutgoing,
    MessageSystem,
    MessageSystemType,
    NavigationConfig,
    Register,
} from "@microsoft/fast-tooling";
import { keyCodeAlt, keyCodeEnter } from "@microsoft/fast-web-utilities";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

const navigationProps: NavigationProps = {
    messageSystem: void 0,
};

describe("Navigation", () => {
    test("should not throw if there is no drag and drop available", () => {
        expect(() => {
            shallow(<ModularNavigation {...navigationProps} />);
        }).not.toThrow();
    });
    test("should not throw if drag and drop is available", () => {
        expect(() => {
            shallow(<Navigation {...navigationProps} />);
        }).not.toThrow();
    });
    test("should register with the message system", () => {
        const fastMessageSystem: MessageSystem = new MessageSystem({
            webWorker: "",
            dataDictionary: [
                {
                    "": {
                        schemaId: "foo",
                        data: {},
                    },
                },
                "",
            ],
            schemaDictionary: {
                foo: {
                    id: "foo",
                    type: "object",
                    properties: {
                        foo: {
                            type: "string",
                        },
                    },
                },
            },
        });

        expect(fastMessageSystem["register"].size).toEqual(0);

        const rendered: any = mount(
            <ModularNavigation {...navigationProps} messageSystem={fastMessageSystem} />
        );

        expect(fastMessageSystem["register"].size).toEqual(1);
    });
    test("should deregister the component with the message system on unmount", () => {
        const fastMessageSystem: MessageSystem = new MessageSystem({
            webWorker: "",
            dataDictionary: [
                {
                    "": {
                        schemaId: "foo",
                        data: {},
                    },
                },
                "",
            ],
            schemaDictionary: {
                foo: {
                    id: "foo",
                    type: "object",
                    properties: {
                        foo: {
                            type: "string",
                        },
                    },
                },
            },
        });

        const rendered: any = mount(
            <ModularNavigation {...navigationProps} messageSystem={fastMessageSystem} />
        );

        rendered.unmount();

        expect(fastMessageSystem["register"].size).toEqual(0);
    });
    test("should render a single navigation item as a collapsible item", () => {
        const schema: any = {
            id: "foo",
            type: "object",
            properties: {
                bar: {
                    type: "object",
                    properties: {
                        bat: {
                            type: "string",
                        },
                    },
                },
            },
        };
        const data: any = {
            bar: "hello world",
        };
        const navigation: NavigationConfig = [
            {
                "": {
                    self: "",
                    parent: null,
                    relativeDataLocation: "",
                    schemaLocation: "",
                    schema,
                    disabled: false,
                    data,
                    text: "bat",
                    type: DataType.object,
                    items: [],
                },
            },
            "",
        ];
        const fastMessageSystem: MessageSystem = new MessageSystem({
            webWorker: "",
            dataDictionary: [
                {
                    "": {
                        schemaId: schema.id,
                        data,
                    },
                },
                "",
            ],
            schemaDictionary: {
                [schema.id]: schema,
            },
        });

        const rendered: any = mount(
            <Navigation {...navigationProps} messageSystem={fastMessageSystem} />
        );

        fastMessageSystem["register"].forEach((registeredItem: Register) => {
            registeredItem.onMessage({
                data: {
                    type: MessageSystemType.initialize,
                    activeDictionaryId: "",
                    activeNavigationConfigId: "",
                    schema,
                    data,
                    dataDictionary: [
                        {
                            "": {
                                schemaId: schema.id,
                                data,
                            },
                        },
                        "",
                    ],
                    navigationDictionary: [
                        {
                            "": navigation,
                        },
                        "",
                    ],
                    navigation,
                    schemaDictionary: {
                        foo: schema,
                    },
                    historyLimit: 30,
                } as InitializeMessageOutgoing,
            } as any);
        });

        rendered
            .find("Navigation")
            .at(1)
            .setState({
                navigationDictionary: [
                    {
                        "": navigation,
                    },
                    "",
                ],
            });

        const item: any = rendered.find('div[role="treeitem"]');
        expect(item).toHaveLength(2);
    });
    test("should render a single navigation item as an end leaf item", () => {
        const schema: any = {
            id: "foo",
            type: "object",
            properties: {
                bar: {
                    type: "string",
                },
            },
        };
        const data: any = {
            bar: "hello world",
        };
        const navigation: NavigationConfig = [
            {
                "": {
                    self: "",
                    parent: null,
                    relativeDataLocation: "",
                    schemaLocation: "",
                    schema,
                    disabled: false,
                    data,
                    text: "bat",
                    type: DataType.object,
                    items: ["bar"],
                },
                bar: {
                    self: "bar",
                    parent: "",
                    relativeDataLocation: "bar",
                    schemaLocation: "properties.bar",
                    schema,
                    disabled: false,
                    data,
                    text: "bat",
                    type: DataType.string,
                    items: [],
                },
            },
            "",
        ];
        const fastMessageSystem: MessageSystem = new MessageSystem({
            webWorker: "",
            dataDictionary: [
                {
                    "": {
                        schemaId: schema.id,
                        data,
                    },
                },
                "",
            ],
            schemaDictionary: {
                [schema.id]: schema,
            },
        });

        const rendered: any = mount(
            <Navigation {...navigationProps} messageSystem={fastMessageSystem} />
        );

        fastMessageSystem["register"].forEach((registeredItem: Register) => {
            registeredItem.onMessage({
                data: {
                    type: MessageSystemType.initialize,
                    activeDictionaryId: "",
                    activeNavigationConfigId: "",
                    schema,
                    data,
                    dataDictionary: [
                        {
                            "": {
                                schemaId: schema.id,
                                data,
                            },
                        },
                        "",
                    ],
                    navigationDictionary: [
                        {
                            "": navigation,
                        },
                        "",
                    ],
                    navigation,
                    schemaDictionary: {
                        foo: schema,
                    },
                    historyLimit: 30,
                } as InitializeMessageOutgoing,
            } as any);
        });

        const renderedNavigation: any = rendered.find("Navigation").at(1);

        renderedNavigation.setState({
            navigationDictionary: [
                {
                    "": navigation,
                },
                "",
            ],
        });

        const item: any = rendered.find('div[role="treeitem"]');
        expect(item).toHaveLength(3);
    });
    test("should render an input if the display item has an editActiveItem state of true", () => {
        const schema: any = {
            id: "foo",
            type: "object",
            properties: {
                bar: {
                    type: "object",
                    properties: {
                        bat: {
                            type: "string",
                        },
                    },
                },
            },
        };
        const data: any = {
            bar: "hello world",
        };
        const navigation: NavigationConfig = [
            {
                "": {
                    self: "",
                    parent: null,
                    relativeDataLocation: "",
                    schemaLocation: "",
                    schema,
                    disabled: false,
                    data,
                    text: "bat",
                    type: DataType.object,
                    items: [],
                },
            },
            "",
        ];
        const fastMessageSystem: MessageSystem = new MessageSystem({
            webWorker: "",
            dataDictionary: [
                {
                    "": {
                        schemaId: schema.id,
                        data,
                    },
                },
                "",
            ],
            schemaDictionary: {
                [schema.id]: schema,
            },
        });

        const rendered: any = mount(
            <Navigation {...navigationProps} messageSystem={fastMessageSystem} />
        );

        fastMessageSystem["register"].forEach((registeredItem: Register) => {
            registeredItem.onMessage({
                data: {
                    type: MessageSystemType.initialize,
                    activeDictionaryId: "",
                    activeNavigationConfigId: "",
                    schema,
                    data,
                    dataDictionary: [
                        {
                            "": {
                                schemaId: schema.id,
                                data,
                            },
                        },
                        "",
                    ],
                    navigationDictionary: [
                        {
                            "": navigation,
                        },
                        "",
                    ],
                    navigation,
                    schemaDictionary: {
                        foo: schema,
                    },
                    historyLimit: 30,
                } as InitializeMessageOutgoing,
            } as any);
        });

        rendered
            .find("Navigation")
            .at(1)
            .setState({
                navigationDictionary: [
                    {
                        "": navigation,
                    },
                    "",
                ],
            });

        const inputs1: any = rendered.find("input");
        expect(inputs1).toHaveLength(0);
        const item: any = rendered.find("a");
        expect(item).toHaveLength(1);

        rendered.find("Navigation").at(1).setState({
            activeItemEditable: true,
        });

        const inputs2: any = rendered.find("input");
        expect(inputs2).toHaveLength(1);
    });
    test("should remove an input if the display item input has been defocused", () => {
        const schema: any = {
            id: "foo",
            type: "object",
            properties: {
                bar: {
                    type: "object",
                    properties: {
                        bat: {
                            type: "string",
                        },
                    },
                },
            },
        };
        const data: any = {
            bar: "hello world",
        };
        const navigation: NavigationConfig = [
            {
                "": {
                    self: "",
                    parent: null,
                    relativeDataLocation: "",
                    schemaLocation: "",
                    schema,
                    disabled: false,
                    data,
                    text: "bat",
                    type: DataType.object,
                    items: [],
                },
            },
            "",
        ];
        const fastMessageSystem: MessageSystem = new MessageSystem({
            webWorker: "",
            dataDictionary: [
                {
                    "": {
                        schemaId: schema.id,
                        data,
                    },
                },
                "",
            ],
            schemaDictionary: {
                [schema.id]: schema,
            },
        });

        const rendered: any = mount(
            <Navigation {...navigationProps} messageSystem={fastMessageSystem} />
        );

        fastMessageSystem["register"].forEach((registeredItem: Register) => {
            registeredItem.onMessage({
                data: {
                    type: MessageSystemType.initialize,
                    activeDictionaryId: "",
                    activeNavigationConfigId: "",
                    schema,
                    data,
                    dataDictionary: [
                        {
                            "": {
                                schemaId: schema.id,
                                data,
                            },
                        },
                        "",
                    ],
                    navigationDictionary: [
                        {
                            "": navigation,
                        },
                        "",
                    ],
                    navigation,
                    schemaDictionary: {
                        foo: schema,
                    },
                    historyLimit: 30,
                } as InitializeMessageOutgoing,
            } as any);
        });

        rendered
            .find("Navigation")
            .at(1)
            .setState({
                navigationDictionary: [
                    {
                        "": navigation,
                    },
                    "",
                ],
            });

        const item: any = rendered.find("a");

        rendered.find("Navigation").at(1).setState({
            activeItemEditable: true,
        });

        const inputs1: any = rendered.find("input");
        inputs1.simulate("blur");
        const inputs3: any = rendered.find("input");
        expect(inputs3).toHaveLength(0);
    });
    test("should remove an input if the display item input has logged an Enter key", () => {
        const schema: any = {
            id: "foo",
            type: "object",
            properties: {
                bar: {
                    type: "object",
                    properties: {
                        bat: {
                            type: "string",
                        },
                    },
                },
            },
        };
        const data: any = {
            bar: "hello world",
        };
        const navigation: NavigationConfig = [
            {
                "": {
                    self: "",
                    parent: null,
                    relativeDataLocation: "",
                    schemaLocation: "",
                    schema,
                    disabled: false,
                    data,
                    text: "bat",
                    type: DataType.object,
                    items: [],
                },
            },
            "",
        ];
        const fastMessageSystem: MessageSystem = new MessageSystem({
            webWorker: "",
            dataDictionary: [
                {
                    "": {
                        schemaId: schema.id,
                        data,
                    },
                },
                "",
            ],
            schemaDictionary: {
                [schema.id]: schema,
            },
        });

        const rendered: any = mount(
            <Navigation {...navigationProps} messageSystem={fastMessageSystem} />
        );

        fastMessageSystem["register"].forEach((registeredItem: Register) => {
            registeredItem.onMessage({
                data: {
                    type: MessageSystemType.initialize,
                    activeDictionaryId: "",
                    activeNavigationConfigId: "",
                    schema,
                    data,
                    dataDictionary: [
                        {
                            "": {
                                schemaId: schema.id,
                                data,
                            },
                        },
                        "",
                    ],
                    navigationDictionary: [
                        {
                            "": navigation,
                        },
                        "",
                    ],
                    navigation,
                    schemaDictionary: {
                        foo: schema,
                    },
                    historyLimit: 30,
                } as InitializeMessageOutgoing,
            } as any);
        });

        rendered
            .find("Navigation")
            .at(1)
            .setState({
                navigationDictionary: [
                    {
                        "": navigation,
                    },
                    "",
                ],
            });

        const item: any = rendered.find("a");

        rendered.find("Navigation").at(1).setState({
            activeItemEditable: true,
        });

        const inputs1: any = rendered.find("input");
        inputs1.simulate("keydown", { keyCode: keyCodeEnter });
        const inputs3: any = rendered.find("input");
        expect(inputs3).toHaveLength(0);
    });
});
