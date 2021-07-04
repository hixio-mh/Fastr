import { updateActiveSection } from "./form-section.props";

export type PropsOnChange = (data: any) => void;

export type DataOnChange = (location: string, data: any, isArray?: boolean, index?: number) => void;

export type LocationOnChange = (schemaLocation: string, dataLocation: string) => void;

export type FormTag = "form" | "div";

export interface IChildOptionItem {
    name: string;
    component: React.ReactNode;
    schema: any;
}

/**
 * The schema form props
 */
export interface IFormProps {
    /**
     * The optional class name
     */
    className?: string;

    /**
     * The schema to base the form on
     */
    schema: any;

    /**
     * The data to map to the form
     */
    data: any;

    /**
     * The onChange event for updating the data
     */
    onChange: PropsOnChange;

    /**
     * The optional components to be added as children
     */
    childOptions?: IChildOptionItem[];

    /**
     * The custom passed location of a subsection to initially activate
     */
    location?: IFormLocation;

    /**
     * The configuration for mapping form items to layout controls
     */
    componentMappingToPropertyNames?: IFormComponentMappingToPropertyNamesProps;

    /**
     * The configuration for mapping attributes to form items
     */
    attributeSettingsMappingToPropertyNames?: IFormAttributeSettingsMappingToPropertyNames;

    /**
     * The configuration for ordering properties by their names
     */
    orderByPropertyNames?: IFormOrderByPropertyNamesProps;
}

/**
 * The schema form state
 */
export interface IFormState {
    /**
     * The current title
     */
    titleProps: string;

    /**
     * The current schema being edited
     */
    schema: any;

    /**
     * Current active schema location
     */
    activeSchemaLocation: string;

    /**
     * Current active data location
     */
    activeDataLocation: string;

    /**
     * The cached data
     */
    dataCache: any;

    /**
     * The tracking data of any active or previous
     * component locations
     */
    componentTracker?: IComponentItem[];

    /**
     * The location, which can be the root or a sub location,
     * which corresponds to a different section
     */
    location?: any;
}

/**
 * The tracking data used for components
 * which comes into use when navigating between components
 * eg. children
 */
export interface IComponentItem {
    /**
     * The data location
     */
    dataLocation: string;

    /**
     * The schema location
     */
    schemaLocation: string;

    /**
     * The schema
     */
    schema: any;
}

export interface IFormLocation {
    /**
     * The data location
     */
    dataLocation: string;

    /**
     * The schema location
     */
    schemaLocation: string;

    /**
     * The location change callback
     */
    onChange: LocationOnChange;
}

export interface IAttributeSettingsCommon {
    /**
     * The list of property names to change the attribute
     */
    propertyNames: string[];
}

export interface ITextareaAttributeRows extends IAttributeSettingsCommon {
    /**
     * The value to set the attribute to
     */
    value: number;
}

export interface ITextareaAttributeSettingsMappingToPropertyNames {
    /**
     * The rows attribute
     */
    rows: ITextareaAttributeRows[];
}

/**
 * The configuration for the mapping of attribute settings to property names
 */
export interface IFormAttributeSettingsMappingToPropertyNames {
    /**
     * The textarea component
     */
    textarea: ITextareaAttributeSettingsMappingToPropertyNames;
}

export type AttributeSettingsMappingToPropertyNames = ITextareaAttributeSettingsMappingToPropertyNames;

/**
 * The configuration for the mapping property names to form controls
 */
export interface IFormComponentMappingToPropertyNamesProps {
    /**
     * A custom color that maps to a CSS color value using a color picker
     * Maps to string values - Text field
     */
    customColor?: string[];

    /**
     * A swatch picker that makes to CSS color values provided
     * Maps to string enum values - Select
     */
    swatch?: string[];

    /**
     * An alignment choosing from a combination of "top", "center", "bottom"
     * Maps to string enum values - Select
     */
    alignVertical?: string[];

    /**
     * An alignment choosing from a combination of "left", "center", "right"
     * Maps to string enum values - Select
     */
    alignHorizontal?: string[];

    /**
     * A file upload for facilitating images etc
     * Maps to string values - Text field
     */
    fileUpload?: string[];

    /**
     * A theme selector, accepts "light" or "dark"
     */
    theme?: string[];

    /**
     * A glyph selector, accepts an array of possible glyphs
     */
    glyphPicker?: string[];
}

/**
 * The property order properties within a category
 */
export interface IFormOrderByPropertyNamesProperties {
    /**
     * Name of the property
     */
    propertyName: string | string[];

    /**
     * Weight of the property for ordering
     */
    weight: number;
}

/**
 * The property order categories
 */
export interface IFormOrderByPropertyNamesCategories {
    /**
     * The category title
     */
    title: string;

    /**
     * The weight given to the category
     */
    weight: number;

    /**
     * The properties belonging to the category
     */
    properties: IFormOrderByPropertyNamesProperties[];

    /**
     * Allows category to be expandable
     */
    expandable?: boolean;
}

/**
 * The configuration for the weights of properties as the appear in order
 */
export interface IFormOrderByPropertyNamesProps {
    /**
     * Shows the categories when there are more than this number
     */
    showCategoriesAtPropertyCount: number;

    /**
     * The weight to give the property names not listed in any category
     */
    defaultCategoryWeight: number;

    /**
     * The categories to drop properties into
     */
    categories: IFormOrderByPropertyNamesCategories[];
}

/**
 * The direction of movement between components
 */
export enum ComponentTree {
    up = "up",
    down = "down"
}

/**
 * A single breadcrumb items configuration
 */
export interface IBreadcrumbItemConfig {
    /**
     * Subschema to be used to generate the item
     */
    subSchema: any;

    /**
     * The root level schema
     */
    schema: any;

    /**
     * The configuration for the breadcrumbs
     */
    config: IBreadcrumbItemsConfig;

    /**
     * The string to be used if no title is provided
     */
    untitled: string;

    /**
     * The location of the subschema relative to the root schema
     */
    schemaLocation: string;

    /**
     * THe current location of the data
     */
    activeDataLocation: string;
}

/**
 * The breadcrumbs configuration
 */
export interface IBreadcrumbItemsConfig {
    /**
     * The schema location represented by a lodash location string used for get/set
     */
    activeSchemaLocation: string;

    /**
     * The data location represented by a lodash location string used for get/set
     */
    activeDataLocation: string;

    /**
     * The root level schema
     */
    schema: any;

    /**
     * The internal update to an active section callback
     */
    onUpdateActiveSection: updateActiveSection;

    /**
     * The update to an active section via location provided by props
     */
    onUpdateLocation?: LocationOnChange;
}
