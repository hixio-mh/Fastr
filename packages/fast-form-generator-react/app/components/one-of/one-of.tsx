import * as React from "react";

export interface IOneOfProps {
    number?: number;
    string?: string;
}

/**
 * This test components API should have:
 * - two optional properties which in the JSON schema correspond to an oneOf
 */
export default class OneOf extends React.Component<IOneOfProps, {}> {
    public render(): JSX.Element {
        return (
            <span>
                {this.props.number}{this.props.string}
            </span>
        );
    }
}
