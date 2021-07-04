import * as React from "react";
import * as renderer from "react-test-renderer";

/**
 * A set of snapshot test cases
 */
export type ISnapshotTestCases<T> = Array<ISnapshotTestCase<T>>;

/**
 * An prop object to supply for snapshots. Optionally, a
 * an array can be provided where the first index is a string representing
 * a snapshot description, with the second index being the prop data
 */
export type ISnapshotTestCase<T> = T | [string, T];

/**
 * An interface describing component example objects used for snapshots and component testing.
 */
export interface ISnapshotTestSuite<T> {
    /**
     * The name of the component
     */
    name: string;

    /**
     * The component constructor
     */
    component: React.ComponentClass<T>;

    /**
     * An array of prop instances for the component
     */
    data: ISnapshotTestCases<T>;

    /**
     * The JSON schema for the components data
     * @deprecated - this property is not required for snapshot testing and will be removed
     */
    schema?: any;

    /**
     * The detail view component data
     * @deprecated - this property is not required for snapshot testing and will be removed
     */
    detailData?: T;

    /**
     * Documentation for the component
     * @deprecated - this property is not required for snapshot testing and will be removed
     */
    documentation?: JSX.Element;
}

/**
 * Executes a single snapshot test given a component, component data, and a test title
 */
export function renderSnapshot<T>(data: T, component: React.ComponentClass<T>, title: string): void {
    test(title, (): void => {
        const renderedComponent: any = renderer.create(React.createElement(component, data));
        const componentJson: JSON = renderedComponent.toJSON();

        expect(componentJson).toMatchSnapshot();
    });
}

/**
 * Generate a set of snapshot tests given a snapshot suite
 */
export function generateSnapshots<T>(examples: ISnapshotTestSuite<T>): void {
    const data: ISnapshotTestCases<T> = examples.data;
    const component: React.ComponentClass<T> = examples.component;

    if (Array.isArray(data)) {
        data.forEach((example: ISnapshotTestCase<T>, index: number): void => {
            let title: string;
            let props: T;

            if (Array.isArray(example)) {
                title = `${examples.name} ${example[0]}`;
                props = example[1];
            } else {
                title = `${examples.name}: ${index}`;
                props = example;
            }

            renderSnapshot(props, component, title);
        });
    }
}
