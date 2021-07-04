import JSS, { create, SheetsManager, SheetsRegistry } from "jss";
import presets from "jss-preset-default";

const jss: JSS = create(presets());
const stylesheetManager: SheetsManager = new SheetsManager();
const stylesheetRegistry: SheetsRegistry = new SheetsRegistry();

export { jss, stylesheetManager, stylesheetRegistry };
