import { get } from "lodash-es";
import { CombiningKeyword, DataType, PropertyKeyword } from "./types";
import { ChildOptionItem } from ".";
import { getChildOptionBySchemaId } from "./location";

/**
 * This file contains all functionality for generating data
 */

const exampleString: string = "example text";

/**
 * Gets a single example from a schema
 */
function getDataFromSchema(schema: any, childOptions?: ChildOptionItem[]): any {
    if (isObjectDataType(schema)) {
        const exampleData: any = {};

        if (hasRequired(schema)) {
            for (const requiredItem of schema.required) {
                const propertyType: PropertyKeyword = get(
                    schema,
                    `${PropertyKeyword.properties}.${requiredItem}`
                )
                    ? PropertyKeyword.properties
                    : PropertyKeyword.reactProperties;

                switch (propertyType) {
                    case PropertyKeyword.properties:
                        exampleData[requiredItem] = getDataFromSchema(
                            schema[propertyType][requiredItem]
                        );
                        break;
                    case PropertyKeyword.reactProperties:
                        exampleData[requiredItem] = getReactChildrenFromSchema(
                            schema[propertyType][requiredItem],
                            childOptions
                        );
                        break;
                }
            }
        }

        return exampleData;
    }

    return getDataFromSchemaByDataType(schema);
}

/**
 * Gets an example by the type of data
 */
function getDataFromSchemaByDataType(schema: any): any {
    const defaultOrExample: any = getDefaultOrExample(schema);

    if (typeof defaultOrExample !== "undefined") {
        return defaultOrExample;
    }

    if (isObjectDataType(schema)) {
        if (hasRequired(schema)) {
            return getDataFromSchema(schema);
        }

        return {};
    }

    switch (schema.type) {
        case DataType.array:
            const arrayData: any[] = [];
            const minItems: number = schema.minItems ? schema.minItems : 2;

            for (let i: number = 0; i < minItems; i++) {
                arrayData.push(getDataFromSchema(schema.items));
            }

            return arrayData;
        case DataType.boolean:
            return true;
        case DataType.null:
            return null;
        case DataType.string:
            return exampleString;
        case DataType.number:
            return Math.round(Math.random() * 100);
        default:
            if (schema[CombiningKeyword.oneOf] || schema[CombiningKeyword.anyOf]) {
                const oneOfAnyOf: CombiningKeyword = schema[CombiningKeyword.oneOf]
                    ? CombiningKeyword.oneOf
                    : CombiningKeyword.anyOf;

                return getDataFromSchema(schema[oneOfAnyOf][0]);
            }
            break;
    }
}

/**
 * Gets a react child example
 */
function getReactChildrenFromSchema(schema: any, childOptions?: ChildOptionItem[]): any {
    const defaultOrExample: any = getDefaultOrExample(schema);

    if (typeof defaultOrExample !== "undefined") {
        return defaultOrExample;
    }

    if (Array.isArray(schema.defaults) && schema.defaults.includes("text")) {
        return exampleString;
    }

    if (
        Array.isArray(schema.ids) &&
        Array.isArray(childOptions) &&
        schema.type === DataType.children
    ) {
        const childOption: any = getChildOptionBySchemaId(schema.ids[0], childOptions);

        return {
            id: schema.ids[0],
            props: getDataFromSchema(childOption.schema, childOptions),
        };
    }
}

/**
 * If there is a default value or example values,
 * return a value to use
 */
function getDefaultOrExample(schema: any): any | void {
    if (typeof schema.default !== "undefined") {
        return schema.default;
    }

    if (hasExample(schema.examples)) {
        return schema.examples[0];
    }

    if (hasEnum(schema)) {
        return schema.enum[0];
    }
}

function isObjectDataType(schema: any): boolean {
    return schema.type === DataType.object || schema[PropertyKeyword.properties];
}

function hasExample(examples: any[]): boolean {
    return Array.isArray(examples) && examples.length > 0;
}

function hasRequired(schema: any): boolean {
    return Array.isArray(schema.required) && schema.required.length > 0;
}

function hasEnum(schema: any): boolean {
    return Array.isArray(schema.enum);
}

export { getDataFromSchema };
