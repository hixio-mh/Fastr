import * as puppeteer from "puppeteer";
import { Browser, Page } from "puppeteer";
import * as fs from "fs";
import * as path from "path";
import { Page as SketchPage } from "@brainly/html-sketchapp";

/**
 * Store in-page script content as a string to be loaded into the browser
 */
const aSketchPage: string = fs
    .readFileSync(path.resolve(__dirname, "./aSketchPage.js"))
    .toString();

/**
 * A configuration object used to extract symbols from a given url
 */
export interface SymbolLibrarySource {
    /**
     * The URL of a symbol source
     */
    url: string;

    /**
     * Selectors for which to extract symbols from
     */
    selectors: string | string[];
}

/**
 * Configuration object for the extractSymbolLibrary function
 */
export interface ExtractSymbolLibraryConfig {
    /**
     * The sources to extract symbols from
     */
    sources: SymbolLibrarySource | SymbolLibrarySource[];

    /**
     * The name of the library
     */
    name: string;

    /**
     * The width of the page to create
     */
    pageWidth: number;

    /**
     * The height of the page to create
     */
    pageHeight: number;
}

const extractSymbolLibraryConfigDefaults: ExtractSymbolLibraryConfig = {
    sources: [],
    name: "Symbol library",
    pageWidth: 1600,
    pageHeight: 1600,
};

/**
 * Ensure our source object structure is consistent
 */
function normalizeSources(
    sources: SymbolLibrarySource | SymbolLibrarySource[]
): SymbolLibrarySource[] {
    return Array.isArray(sources) ? sources : [sources];
}

/**
 * Extracts sketch symbol library given a config
 */
export async function extractSymbolLibrary(
    config: ExtractSymbolLibraryConfig
): Promise<string> {
    // Apply defaults to config
    config = Object.assign({}, extractSymbolLibraryConfigDefaults, config);
    const standardizedSources: SymbolLibrarySource[] = normalizeSources(config.sources);
    const browser: Browser = await puppeteer.launch();
    const page: Page = await browser.newPage();
    let symbols: string[][] = [];

    await page.setViewport({
        width: config.pageWidth,
        height: config.pageHeight,
    });

    page.on("console", (message: any) => {
        // Uncomment the following line for debugging
        // console.log(message);
    });

    for (const source of standardizedSources) {
        symbols = symbols.concat(await getSymbolsFromSource(source, page));
    }

    symbols = positionSymbols(symbols, config.pageWidth);

    return new Promise<string>(
        (resolve: (result: string) => void, reject: (error: Error) => void): void => {
            const sketchPage: SketchPage = new SketchPage({
                width: config.pageWidth,
                height: config.pageHeight,
            });

            sketchPage.setName(config.name);

            const flattenedLayers: string[] = symbols.reduce(
                (accumulator: string[], currentValue: string[]) => {
                    return accumulator.concat(currentValue);
                },
                []
            );

            const sketchPageJson: any = sketchPage.toJSON();

            sketchPageJson.layers = flattenedLayers;
            browser.close();
            resolve(JSON.stringify(sketchPageJson));
        }
    );
}

/**
 * Extract symbol data from a single source
 */
async function getSymbolsFromSource(
    source: SymbolLibrarySource,
    page: Page
): Promise<string[]> {
    // Navigate to the source URL
    await page.goto(source.url, {
        waitUntil: "domcontentloaded",
    });

    // Load the script into the browser that will allow generating sketch symbols
    await page.addScriptTag({
        content: aSketchPage,
    });

    const symbols: string[] = await page.evaluate(
        `sketchLibrary.getAsketchSymbols(${JSON.stringify(source)})`
    );

    return new Promise<string[]>(
        (resolve: (result: string[]) => void, reject: (error: Error) => void): void => {
            resolve(symbols);
        }
    );
}

/**
 * Positions symbols so they don't overlap.
 */
function positionSymbols(symbols: any, pageWidth: number = 1600): any {
    let x: number = 0;
    let y: number = 0;
    let rowHeight: number = 0;
    const verticalGutter: number = 28;
    const horizontalGutter: number = 28;

    return symbols.map((symbol: any) => {
        const width: number = symbol.frame.width;
        const height: number = symbol.frame.height;

        // If it can fit on the current row
        if (width <= pageWidth - x) {
            symbol.frame.x = x;
            symbol.frame.y = y;

            x = x + width + horizontalGutter;

            if (height > rowHeight) {
                rowHeight = height;
            }
        } else {
            x = width + horizontalGutter;
            y = y + rowHeight + verticalGutter;
            rowHeight = height;
            symbol.frame.x = 0;
            symbol.frame.y = y;
        }

        return symbol;
    });
}
