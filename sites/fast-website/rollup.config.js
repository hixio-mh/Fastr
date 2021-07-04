import alias from "@rollup/plugin-alias";
import path from "path";
import commonJS from "rollup-plugin-commonjs";
import ejs from "rollup-plugin-ejs";
import resolve from "rollup-plugin-node-resolve";
import svg from "rollup-plugin-svg";
import typescript from "rollup-plugin-typescript2";

export default [
    {
        input: "src/index-rollup.ts",
        output: [
            {
                file: "temp/index-rollup.js",
                format: "es",
            },
        ],
        plugins: [
            alias({
                entries: {
                    svg: path.resolve(__dirname, "src/app/svg"),
                },
            }),
            resolve(),
            commonJS(),
            ejs({
                render: {
                    data: null,
                },
                compilerOptions: {
                    client: true,
                },
            }),
            svg(),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: true,
                    },
                },
            }),
        ],
    },
];
