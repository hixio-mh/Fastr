import { set } from "lodash-es";
import { DataDictionary } from "../message-system";
import { linkedDataSchema } from "../schemas";
import {
    htmlMapper,
    htmlResolver,
    mapDataDictionary,
    MapperConfig,
    mapWebComponentDefinitionToJSONSchema,
    ResolverConfig,
} from "./mapping";
import { DataType, ReservedElementMappingKeyword } from "./types";

describe("mapDataDictionary", () => {
    test("should call a passed mapper and resolver function on a single data dictionary item", () => {
        const mapper: any = jest.fn();
        const resolver: any = jest.fn();

        mapDataDictionary({
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
                    type: "object",
                },
            },
            mapper,
            resolver,
        });

        expect(mapper).toHaveBeenCalledTimes(1);
        expect(resolver).toHaveBeenCalledTimes(1);
    });
    test("should call a passed mapper and resolver function on multiple dictionary items", () => {
        const mapper: any = jest.fn();
        const resolver: any = jest.fn();

        mapDataDictionary({
            dataDictionary: [
                {
                    "": {
                        schemaId: "foo",
                        data: {
                            a: "b",
                            children: [
                                {
                                    id: "foo",
                                },
                            ],
                        },
                    },
                    foo: {
                        schemaId: "foo",
                        parent: {
                            id: "",
                            dataLocation: "children",
                        },
                        data: {
                            c: "d",
                        },
                    },
                },
                "",
            ],
            schemaDictionary: {
                foo: {
                    type: "object",
                },
            },
            mapper,
            resolver,
        });

        expect(mapper).toHaveBeenCalledTimes(2);
        expect(resolver).toHaveBeenCalledTimes(2);
    });
    test("should map a single dictionary entry", () => {
        const mapper: any = function (config: MapperConfig<any>): any {
            config.dataDictionary[0][config.dictionaryId].data =
                config.dataDictionary[0][config.dictionaryId].data;
        };
        const resolver: any = function (config: ResolverConfig<any>): any {
            const dataBlob = config.dataDictionary[0][config.dataDictionary[1]].data;

            if (config.dataDictionary[0][config.dictionaryId].parent) {
                set(
                    dataBlob as object,
                    config.dataDictionary[0][config.dataDictionary[1]].parent
                        .dataLocation,
                    config.dataDictionary[0][config.parent].data
                );
            }

            return dataBlob;
        };

        const result: any = mapDataDictionary({
            dataDictionary: [
                {
                    "": {
                        schemaId: "foo",
                        data: {
                            a: "b",
                        },
                    },
                },
                "",
            ],
            schemaDictionary: {
                foo: {
                    type: "object",
                },
            },
            mapper,
            resolver,
        });

        expect(result).toEqual({
            a: "b",
        });
    });
    test("should map multiple dictionary entries", () => {
        const mapper: any = function (config: MapperConfig<any>): any {
            config.dataDictionary[0][config.dictionaryId].data =
                config.dataDictionary[0][config.dictionaryId].data;
        };
        const resolver: any = function (config: ResolverConfig<any>): any {
            if (config.dataDictionary[0][config.dictionaryId].parent) {
                set(
                    config.dataDictionary[0][config.parent].data as object,
                    config.dataDictionary[0][config.dictionaryId].parent.dataLocation,
                    config.dataDictionary[0][config.dictionaryId].data
                );

                return config.dataDictionary[0][config.parent].data;
            }

            return config.resolvedData;
        };
        const result: any = mapDataDictionary({
            dataDictionary: [
                {
                    "": {
                        schemaId: "foo",
                        data: {
                            a: "b",
                            children: [
                                {
                                    id: "foo",
                                },
                            ],
                        },
                    },
                    foo: {
                        schemaId: "foo",
                        parent: {
                            id: "",
                            dataLocation: "children",
                        },
                        data: {
                            c: "d",
                        },
                    },
                },
                "",
            ],
            schemaDictionary: {
                foo: {
                    type: "object",
                },
            },
            mapper,
            resolver,
        });

        expect(result).toEqual({
            a: "b",
            children: {
                c: "d",
            },
        });
    });
});

describe("htmlMapper", () => {
    test("should map a string to data", () => {
        const textString = "Hello world";
        const text = document.createTextNode(textString);
        const dataDictionary: DataDictionary<any> = [
            {
                "": {
                    schemaId: "text",
                    data: textString,
                },
            },
            "",
        ];
        htmlMapper({
            version: 1,
        })({
            dataDictionary,
            dictionaryId: "",
            schema: {
                id: "text",
                type: "string",
            },
            mapperPlugins: [],
        });
        expect(dataDictionary[0][""].data).toEqual(text);
    });
    test("should map an element to data", () => {
        const dataDictionary: DataDictionary<any> = [
            {
                "": {
                    schemaId: "foo",
                    data: {},
                },
            },
            "",
        ];
        htmlMapper({
            version: 1,
            tags: [
                {
                    name: "div",
                    description: "foobar",
                    attributes: [],
                    slots: [],
                },
            ],
        })({
            dataDictionary,
            dictionaryId: "",
            schema: {
                id: "foo",
                [ReservedElementMappingKeyword.mapsToTagName]: "div",
                type: "object",
            },
            mapperPlugins: [],
        });
        expect(dataDictionary[0][""].data).toEqual(document.createElement("div"));
    });
    test("should map an element to boolean data", () => {
        const dataDictionary: DataDictionary<any> = [
            {
                "": {
                    schemaId: "foo",
                    data: {
                        foo: true,
                        bar: false,
                    },
                },
            },
            "",
        ];
        htmlMapper({
            version: 1,
            tags: [
                {
                    name: "div",
                    description: "foobar",
                    attributes: [
                        {
                            name: "foo",
                            description: "The foo property",
                            type: DataType.boolean,
                            default: "false",
                            required: false,
                        },
                        {
                            name: "bar",
                            description: "The bar property",
                            type: DataType.boolean,
                            default: "false",
                            required: false,
                        },
                    ],
                    slots: [],
                },
            ],
        })({
            dataDictionary,
            dictionaryId: "",
            schema: {
                id: "foo",
                [ReservedElementMappingKeyword.mapsToTagName]: "div",
                type: "object",
            },
            mapperPlugins: [],
        });
        const element = document.createElement("div");
        element.setAttribute("foo", "");
        expect(dataDictionary[0][""].data).toEqual(element);
    });
    test("should not map an element when that element is not an object", () => {
        expect(
            htmlMapper({
                version: 1,
                tags: [
                    {
                        name: "div",
                        description: "foobar",
                        attributes: [],
                        slots: [],
                    },
                ],
            })({
                dataDictionary: [
                    {
                        "": {
                            schemaId: "foo",
                            data: {},
                        },
                    },
                    "",
                ],
                dictionaryId: "",
                schema: {
                    id: "foo",
                    [ReservedElementMappingKeyword.mapsToTagName]: "div",
                    type: "string",
                },
                mapperPlugins: [],
            })
        ).toEqual(undefined);
    });
    test("should not map an element when that element is not available", () => {
        expect(
            htmlMapper({
                version: 1,
                tags: [],
            })({
                dataDictionary: [
                    {
                        "": {
                            schemaId: "foo",
                            data: {},
                        },
                    },
                    "",
                ],
                dictionaryId: "",
                schema: {
                    id: "foo",
                    [ReservedElementMappingKeyword.mapsToTagName]: "div",
                    type: "object",
                },
                mapperPlugins: [],
            })
        ).toEqual(undefined);
    });
    test("should map an element with an attribute", () => {
        const element = {
            id: "foo",
        };

        const mappedElement = document.createElement("div");
        mappedElement.setAttribute("id", "foo");
        const dataDictionary: DataDictionary<any> = [
            {
                "": {
                    schemaId: "foo",
                    data: element,
                },
            },
            "",
        ];
        htmlMapper({
            version: 1,
            tags: [
                {
                    name: "div",
                    description: "foobar",
                    attributes: [],
                    slots: [],
                },
            ],
        })({
            dataDictionary,
            dictionaryId: "",
            schema: {
                id: "foo",
                [ReservedElementMappingKeyword.mapsToTagName]: "div",
                type: "object",
            },
            mapperPlugins: [],
        });

        expect(dataDictionary[0][""].data).toEqual(mappedElement);
    });
    test("should map an element with an attribute and ignore any slots", () => {
        const element = {
            id: "foo",
            Slot: "Hello world",
        };

        const mappedElement = document.createElement("div");
        mappedElement.setAttribute("id", "foo");
        const dataDictionary: DataDictionary<any> = [
            {
                "": {
                    schemaId: "foo",
                    data: element,
                },
            },
            "",
        ];
        htmlMapper({
            version: 1,
            tags: [
                {
                    name: "div",
                    description: "foobar",
                    attributes: [],
                    slots: [
                        {
                            name: "",
                            description: "The default slot",
                        },
                    ],
                },
            ],
        })({
            dataDictionary,
            dictionaryId: "",
            schema: {
                id: "foo",
                [ReservedElementMappingKeyword.mapsToTagName]: "div",
                type: "object",
                properties: {
                    Slot: {
                        [ReservedElementMappingKeyword.mapsToSlot]: "",
                    },
                },
            },
            mapperPlugins: [],
        });
        expect(dataDictionary[0][""].data).toEqual(mappedElement);
    });
    test("should map an element nested within another element with a default slot", () => {
        const mapper = htmlMapper({
            version: 1,
            tags: [
                {
                    name: "button",
                    description: "foobar",
                    attributes: [],
                    slots: [
                        {
                            name: "",
                            description: "The default slot",
                        },
                    ],
                },
                {
                    name: "div",
                    description: "foobar",
                    attributes: [],
                    slots: [
                        {
                            name: "",
                            description: "The default slot",
                        },
                    ],
                },
            ],
        });

        const result: any = mapDataDictionary({
            dataDictionary: [
                {
                    "": {
                        schemaId: "foo",
                        data: {
                            Slot: [
                                {
                                    id: "foo",
                                },
                            ],
                        },
                    },
                    foo: {
                        schemaId: "bar",
                        parent: {
                            id: "",
                            dataLocation: "Slot",
                        },
                        data: {
                            Slot: [
                                {
                                    id: "bat",
                                },
                            ],
                        },
                    },
                    bat: {
                        schemaId: "bat",
                        parent: {
                            id: "foo",
                            dataLocation: "Slot",
                        },
                        data: "Hello world",
                    },
                },
                "",
            ],
            schemaDictionary: {
                foo: {
                    id: "foo",
                    [ReservedElementMappingKeyword.mapsToTagName]: "div",
                    type: "object",
                    properties: {
                        Slot: {
                            [ReservedElementMappingKeyword.mapsToSlot]: "",
                        },
                    },
                },
                bar: {
                    id: "bar",
                    [ReservedElementMappingKeyword.mapsToTagName]: "button",
                    type: "object",
                    properties: {
                        Slot: {
                            [ReservedElementMappingKeyword.mapsToSlot]: "",
                        },
                    },
                },
                bat: {
                    id: "bat",
                    type: "string",
                },
            },
            mapper,
            resolver: htmlResolver,
        });

        const mappedElement = document.createElement("div");
        const buttonElement = document.createElement("button");
        buttonElement.textContent = "Hello world";
        mappedElement.append(buttonElement);

        expect(result).toEqual(mappedElement);
    });
    test("should map an element nested within another element with a named slot", () => {
        const mapper = htmlMapper({
            version: 1,
            tags: [
                {
                    name: "button",
                    description: "foobar",
                    attributes: [],
                    slots: [
                        {
                            name: "",
                            description: "The default slot",
                        },
                    ],
                },
                {
                    name: "div",
                    description: "foobar",
                    attributes: [],
                    slots: [
                        {
                            name: "",
                            description: "The default slot",
                        },
                        {
                            name: "foo",
                            description: "The foo slot",
                        },
                    ],
                },
            ],
        });

        const result: any = mapDataDictionary({
            dataDictionary: [
                {
                    "": {
                        schemaId: "foo",
                        data: {
                            SlotFoo: [
                                {
                                    id: "foo",
                                },
                            ],
                        },
                    },
                    foo: {
                        schemaId: "bar",
                        parent: {
                            id: "",
                            dataLocation: "SlotFoo",
                        },
                        data: {
                            Slot: [
                                {
                                    id: "bat",
                                },
                            ],
                        },
                    },
                    bat: {
                        schemaId: "undefined",
                        parent: {
                            id: "foo",
                            dataLocation: "Slot",
                        },
                        data: "Hello world",
                    },
                },
                "",
            ],
            schemaDictionary: {
                foo: {
                    id: "foo",
                    [ReservedElementMappingKeyword.mapsToTagName]: "div",
                    type: "object",
                    properties: {
                        Slot: {
                            [ReservedElementMappingKeyword.mapsToSlot]: "",
                        },
                        SlotFoo: {
                            [ReservedElementMappingKeyword.mapsToSlot]: "foo",
                        },
                    },
                },
                bar: {
                    id: "bar",
                    [ReservedElementMappingKeyword.mapsToTagName]: "button",
                    type: "object",
                    properties: {
                        Slot: {
                            [ReservedElementMappingKeyword.mapsToSlot]: "",
                        },
                    },
                },
                bat: {
                    id: "bat",
                    type: "string",
                },
            },
            mapper,
            resolver: htmlResolver,
        });

        const mappedElement = document.createElement("div");
        const buttonElement = document.createElement("button");
        buttonElement.setAttribute("slot", "foo");
        buttonElement.textContent = "Hello world";
        mappedElement.append(buttonElement);

        expect(result).toEqual(mappedElement);
    });
    test("should map an element with multiple text strings into a slot", () => {
        const mapper = htmlMapper({
            version: 1,
            tags: [
                {
                    name: "button",
                    description: "foobar",
                    attributes: [],
                    slots: [
                        {
                            name: "",
                            description: "The default slot",
                        },
                    ],
                },
            ],
        });

        const result: any = mapDataDictionary({
            dataDictionary: [
                {
                    "": {
                        schemaId: "foo",
                        data: {
                            Slot: [
                                {
                                    id: "foo",
                                },
                                {
                                    id: "bar",
                                },
                            ],
                        },
                    },
                    foo: {
                        schemaId: "bar",
                        parent: {
                            id: "",
                            dataLocation: "Slot",
                        },
                        data: "Hello",
                    },
                    bar: {
                        schemaId: "bar",
                        parent: {
                            id: "",
                            dataLocation: "Slot",
                        },
                        data: "world",
                    },
                },
                "",
            ],
            schemaDictionary: {
                foo: {
                    id: "foo",
                    [ReservedElementMappingKeyword.mapsToTagName]: "button",
                    type: "object",
                    properties: {
                        Slot: {
                            [ReservedElementMappingKeyword.mapsToSlot]: "",
                        },
                    },
                },
                bar: {
                    id: "bar",
                    type: "string",
                },
            },
            mapper,
            resolver: htmlResolver,
        });

        const mappedElement = document.createElement("button");
        const text1 = document.createTextNode("Hello");
        const text2 = document.createTextNode("world");
        mappedElement.append(text1);
        mappedElement.append(text2);

        expect(result).toEqual(mappedElement);
    });
    test("should map an element with mixed text string and element into a slot", () => {
        const mapper = htmlMapper({
            version: 1,
            tags: [
                {
                    name: "button",
                    description: "foobar",
                    attributes: [],
                    slots: [
                        {
                            name: "",
                            description: "The default slot",
                        },
                    ],
                },
                {
                    name: "div",
                    description: "foobar",
                    attributes: [],
                    slots: [
                        {
                            name: "",
                            description: "The default slot",
                        },
                    ],
                },
            ],
        });

        const result: any = mapDataDictionary({
            dataDictionary: [
                {
                    "": {
                        schemaId: "bat",
                        data: {
                            Slot: [
                                {
                                    id: "foo",
                                },
                                {
                                    id: "bar",
                                },
                            ],
                        },
                    },
                    foo: {
                        schemaId: "bar",
                        parent: {
                            id: "",
                            dataLocation: "Slot",
                        },
                        data: "Hello world",
                    },
                    bar: {
                        schemaId: "foo",
                        parent: {
                            id: "",
                            dataLocation: "Slot",
                        },
                        data: {
                            Slot: [
                                {
                                    id: "bat",
                                },
                            ],
                        },
                    },
                    bat: {
                        schemaId: "bar",
                        parent: {
                            id: "bar",
                            dataLocation: "Slot",
                        },
                        data: "Button",
                    },
                },
                "",
            ],
            schemaDictionary: {
                foo: {
                    id: "foo",
                    [ReservedElementMappingKeyword.mapsToTagName]: "button",
                    type: "object",
                    properties: {
                        Slot: {
                            [ReservedElementMappingKeyword.mapsToSlot]: "",
                        },
                    },
                },
                bar: {
                    id: "bar",
                    type: "string",
                },
                bat: {
                    id: "bat",
                    [ReservedElementMappingKeyword.mapsToTagName]: "div",
                    type: "object",
                    properties: {
                        Slot: {
                            [ReservedElementMappingKeyword.mapsToSlot]: "",
                        },
                    },
                },
            },
            mapper,
            resolver: htmlResolver,
        });

        const mappedElement = document.createElement("div");
        mappedElement.textContent = "Hello world";
        const buttonElement = document.createElement("button");
        buttonElement.textContent = "Button";
        mappedElement.append(buttonElement);

        expect(result).toEqual(mappedElement);
    });
    test("should map an element with mixed text string and element into a slot", () => {
        const mapper = htmlMapper({
            version: 1,
            tags: [
                {
                    name: "button",
                    description: "foobar",
                    attributes: [],
                    slots: [
                        {
                            name: "",
                            description: "The default slot",
                        },
                    ],
                },
                {
                    name: "div",
                    description: "foobar",
                    attributes: [],
                    slots: [
                        {
                            name: "",
                            description: "The default slot",
                        },
                    ],
                },
            ],
        });

        const result: any = mapDataDictionary({
            dataDictionary: [
                {
                    "": {
                        schemaId: "bat",
                        data: {
                            Slot: [
                                {
                                    id: "foo",
                                },
                                {
                                    id: "bar",
                                },
                                {
                                    id: "bat",
                                },
                            ],
                        },
                    },
                    bar: {
                        schemaId: "foo",
                        parent: {
                            id: "",
                            dataLocation: "Slot",
                        },
                        data: {},
                    },
                    foo: {
                        schemaId: "bar",
                        parent: {
                            id: "",
                            dataLocation: "Slot",
                        },
                        data: "Hello world",
                    },
                    bat: {
                        schemaId: "bar",
                        parent: {
                            id: "",
                            dataLocation: "Slot",
                        },
                        data: "Button",
                    },
                },
                "",
            ],
            schemaDictionary: {
                foo: {
                    id: "foo",
                    [ReservedElementMappingKeyword.mapsToTagName]: "button",
                    type: "object",
                    properties: {
                        Slot: {
                            [ReservedElementMappingKeyword.mapsToSlot]: "",
                        },
                    },
                },
                bar: {
                    id: "bar",
                    type: "string",
                },
                bat: {
                    id: "bat",
                    [ReservedElementMappingKeyword.mapsToTagName]: "div",
                    type: "object",
                    properties: {
                        Slot: {
                            [ReservedElementMappingKeyword.mapsToSlot]: "",
                        },
                    },
                },
            },
            mapper,
            resolver: htmlResolver,
        });

        const mappedElement = document.createElement("div");
        const text1 = document.createTextNode("Hello world");
        const buttonElement = document.createElement("button");
        const text2 = document.createTextNode("Button");
        mappedElement.append(text1);
        mappedElement.append(buttonElement);
        mappedElement.append(text2);

        expect(result).toEqual(mappedElement);
    });
    test("should map an svg element to data", () => {
        const dataDictionary: DataDictionary<any> = [
            {
                "": {
                    schemaId: "foo",
                    data: {},
                },
            },
            "",
        ];
        htmlMapper({
            version: 1,
            tags: [
                {
                    name: "svg",
                    description: "foobar",
                    attributes: [],
                    slots: [],
                },
            ],
        })({
            dataDictionary,
            dictionaryId: "",
            schema: {
                id: "foo",
                [ReservedElementMappingKeyword.mapsToTagName]: "svg",
                type: "object",
            },
            mapperPlugins: [],
        });
        expect(dataDictionary[0][""].data).toEqual(
            document.createElementNS("http://www.w3.org/2000/svg", "svg")
        );
    });
    test("should map an svg element with an attribute specifying a URI to data", () => {
        const dataDictionary: DataDictionary<any> = [
            {
                "": {
                    schemaId: "foo",
                    data: {},
                },
            },
            "",
        ];
        htmlMapper({
            version: 1,
            tags: [
                {
                    name: "svg",
                    description: "foobar",
                    attributes: [
                        {
                            name: "foo",
                            description: "URI override",
                            type: DataType.string,
                            default: "http://www.w3.org/2000/svg",
                            required: true,
                        },
                    ],
                    slots: [],
                },
            ],
        })({
            dataDictionary,
            dictionaryId: "",
            schema: {
                id: "foo",
                [ReservedElementMappingKeyword.mapsToTagName]: "svg",
                type: "object",
                properties: {
                    foo: {
                        title: "URI override",
                        type: "string",
                    },
                },
            },
            mapperPlugins: [],
        });
        expect(dataDictionary[0][""].data).toEqual(
            document.createElementNS("http://www.w3.org/2000/svg", "svg")
        );
    });
});

describe("mapWebComponentDefinitionToJSONSchema", () => {
    test("should not throw", () => {
        expect(() => mapWebComponentDefinitionToJSONSchema({ version: 1 })).not.toThrow();
    });
    test("should map attributes and slots to the JSON schema", () => {
        const name: string = "foo";
        const title: string = "FooBar";
        const description: string = "foo tag";
        const attrName: string = "attr";
        const attrTitle: string = "attr title";
        const attrDescription: string = "An attribute";
        const slotName: string = "";
        const slotTitle: string = "Default slot";
        const slotDescription: string = "The default slot";

        expect(
            mapWebComponentDefinitionToJSONSchema({
                version: 1,
                tags: [
                    {
                        name,
                        title,
                        description: "foo tag",
                        attributes: [
                            {
                                name: attrName,
                                title: attrTitle,
                                description: attrDescription,
                                type: DataType.string,
                                required: false,
                                default: "",
                            },
                        ],
                        slots: [
                            {
                                name: slotName,
                                title: slotTitle,
                                description: slotDescription,
                            },
                        ],
                    },
                ],
            })
        ).toEqual([
            {
                $schema: "http://json-schema.org/schema#",
                $id: name,
                id: name,
                title,
                description,
                type: "object",
                version: 1,
                [ReservedElementMappingKeyword.mapsToTagName]: name,
                properties: {
                    [attrName]: {
                        [ReservedElementMappingKeyword.mapsToAttribute]: attrName,
                        title: attrTitle,
                        description: attrDescription,
                        type: DataType.string,
                    },
                    [`Slot${slotName}`]: {
                        [ReservedElementMappingKeyword.mapsToSlot]: slotName,
                        title: slotTitle,
                        description: slotDescription,
                        ...linkedDataSchema,
                    },
                },
            },
        ]);
    });
    test("should map named slots to the JSON schema", () => {
        const name: string = "foo";
        const title: string = "foo title";
        const description: string = "foo tag";
        const slotName: string = "test";
        const slotTitle: string = "Default slot";
        const slotDescription: string = "Default slot description";

        expect(
            mapWebComponentDefinitionToJSONSchema({
                version: 1,
                tags: [
                    {
                        name,
                        title,
                        description: "foo tag",
                        attributes: [],
                        slots: [
                            {
                                name: slotName,
                                title: slotTitle,
                                description: slotDescription,
                            },
                        ],
                    },
                ],
            })
        ).toEqual([
            {
                $schema: "http://json-schema.org/schema#",
                $id: name,
                id: name,
                title,
                description,
                type: "object",
                version: 1,
                [ReservedElementMappingKeyword.mapsToTagName]: name,
                properties: {
                    SlotTest: {
                        [ReservedElementMappingKeyword.mapsToSlot]: slotName,
                        title: slotTitle,
                        description: slotDescription,
                        ...linkedDataSchema,
                    },
                },
            },
        ]);
    });
    test("should map named slots with only one character to the JSON schema", () => {
        const name: string = "foo";
        const title: string = "Foo";
        const description: string = "foo tag";
        const slotName: string = "t";
        const slotTitle: string = "Default slot";
        const slotDescription: string = "Default slot description";

        expect(
            mapWebComponentDefinitionToJSONSchema({
                version: 1,
                tags: [
                    {
                        name,
                        title,
                        description,
                        attributes: [],
                        slots: [
                            {
                                name: slotName,
                                title: slotTitle,
                                description: slotDescription,
                            },
                        ],
                    },
                ],
            })
        ).toEqual([
            {
                $schema: "http://json-schema.org/schema#",
                $id: name,
                id: name,
                title,
                description,
                type: "object",
                version: 1,
                [ReservedElementMappingKeyword.mapsToTagName]: name,
                properties: {
                    SlotT: {
                        [ReservedElementMappingKeyword.mapsToSlot]: slotName,
                        title: slotTitle,
                        description: slotDescription,
                        ...linkedDataSchema,
                    },
                },
            },
        ]);
    });
    test("should map named slots with dasjes  to the JSON schema", () => {
        const name: string = "foo";
        const title: string = "FooBar";
        const description: string = "foo tag";
        const slotName: string = "test-name";
        const slotTitle: string = "Default slot";
        const slotDescription: string = "Default slot description";

        expect(
            mapWebComponentDefinitionToJSONSchema({
                version: 1,
                tags: [
                    {
                        name,
                        title,
                        description,
                        attributes: [],
                        slots: [
                            {
                                name: slotName,
                                title: slotTitle,
                                description: slotDescription,
                            },
                        ],
                    },
                ],
            })
        ).toEqual([
            {
                $schema: "http://json-schema.org/schema#",
                $id: name,
                id: name,
                title,
                description,
                type: "object",
                version: 1,
                [ReservedElementMappingKeyword.mapsToTagName]: name,
                properties: {
                    SlotTestName: {
                        [ReservedElementMappingKeyword.mapsToSlot]: slotName,
                        title: slotTitle,
                        description: slotDescription,
                        ...linkedDataSchema,
                    },
                },
            },
        ]);
    });
    test("should map an optional enum in attributes to the enum in a JSON schema", () => {
        const name: string = "foo";
        const title: string = "FooBar";
        const description: string = "foo tag";
        const attrName: string = "attr";
        const attrTitle: string = "Attr title";
        const attrDescription: string = "An attribute";
        const attrEnum: string[] = ["foo", "bar"];

        expect(
            mapWebComponentDefinitionToJSONSchema({
                version: 1,
                tags: [
                    {
                        name,
                        title,
                        description,
                        attributes: [
                            {
                                name: attrName,
                                title: attrTitle,
                                description: attrDescription,
                                type: DataType.string,
                                default: "foobar",
                                values: [
                                    {
                                        name: attrEnum[0],
                                    },
                                    {
                                        name: attrEnum[1],
                                    },
                                ],
                                required: false,
                            },
                        ],
                        slots: [],
                    },
                ],
            })
        ).toEqual([
            {
                $schema: "http://json-schema.org/schema#",
                $id: name,
                id: name,
                title,
                description,
                type: "object",
                version: 1,
                [ReservedElementMappingKeyword.mapsToTagName]: name,
                properties: {
                    [attrName]: {
                        [ReservedElementMappingKeyword.mapsToAttribute]: attrName,
                        title: attrTitle,
                        description: attrDescription,
                        enum: attrEnum,
                        type: DataType.string,
                        default: "foobar",
                    },
                },
            },
        ]);
    });
    test("should map an optional number enum in attributes to the enum in a JSON schema", () => {
        const name: string = "foo";
        const title: string = "Foo title";
        const description: string = "foo tag";
        const attrName: string = "attr";
        const attrTitle: string = "Attr title";
        const attrDescription: string = "An attribute";
        const attrEnum: number[] = [1, 2];

        expect(
            mapWebComponentDefinitionToJSONSchema({
                version: 1,
                tags: [
                    {
                        name,
                        title,
                        description,
                        attributes: [
                            {
                                name: attrName,
                                title: attrTitle,
                                description: attrDescription,
                                type: DataType.number,
                                default: "foobar",
                                values: [
                                    {
                                        name: attrEnum[0].toString(),
                                    },
                                    {
                                        name: attrEnum[1].toString(),
                                    },
                                ],
                                required: false,
                            },
                        ],
                        slots: [],
                    },
                ],
            })
        ).toEqual([
            {
                $schema: "http://json-schema.org/schema#",
                $id: name,
                id: name,
                title,
                description,
                type: "object",
                version: 1,
                [ReservedElementMappingKeyword.mapsToTagName]: name,
                properties: {
                    [attrName]: {
                        [ReservedElementMappingKeyword.mapsToAttribute]: attrName,
                        title: attrTitle,
                        description: attrDescription,
                        enum: attrEnum,
                        type: DataType.number,
                        default: "foobar",
                    },
                },
            },
        ]);
    });
});
