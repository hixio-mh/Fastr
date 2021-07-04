import React from "react";
import { Viewer } from "../../../src";

export interface PageState {
    height: number;
    width: number;
}

class BasicPage extends React.Component<{}, PageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            height: 800,
            width: 800,
        };
    }

    public render(): JSX.Element {
        return (
            <div style={{ width: "100%", height: "calc(100vh - 200px)" }}>
                <Viewer
                    height={this.state.height}
                    width={this.state.width}
                    iframeSrc={"/viewer/basic/content"}
                    responsive={true}
                    onUpdateHeight={this.handleUpdatedHeight}
                    onUpdateWidth={this.handleUpdatedWidth}
                />
            </div>
        );
    }

    private handleUpdatedHeight = (height: number): void => {
        this.setState({
            height,
        });
    };

    private handleUpdatedWidth = (width: number): void => {
        this.setState({
            width,
        });
    };
}

export default BasicPage;
