import examples from "./examples.data";
import { generateSnapshots } from "@microsoft/fast-jest-snapshots-react";

describe("dialog snapshots", (): void => {
    generateSnapshots(examples);
});
