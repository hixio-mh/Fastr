import { fastComponentSchemas, textSchema } from "@microsoft/site-utilities";
import Guidance from "../../.tmp/tabs/guidance";
import { placeholderIcon } from "../utilities/icons";
import { ComponentViewConfig } from "./data.props";

const startPlaceholderIcon = placeholderIcon("SlotStart", "Slot");
const endPlaceholderIcon = placeholderIcon("SlotEnd", "Slot");

export const fastTabsId = "fast-tabs";
export const fastTabId = "fast-tab";
export const fastTabPanelId = "fast-tab-panel";
export const fastButtonId = "fast-button";
const fastTabsConfig: ComponentViewConfig = {
    schema: fastComponentSchemas[fastTabsId],
    guidance: Guidance,
    scenarios: [
        {
            displayName: "Default",
            dataDictionary: [
                {
                    root: {
                        schemaId: fastTabsId,
                        data: {
                            SlotTab: [
                                {
                                    id: "Slot0",
                                },
                                {
                                    id: "Slot1",
                                },
                                {
                                    id: "Slot2",
                                },
                            ],
                            SlotTabpanel: [
                                {
                                    id: "Slot3",
                                },
                                {
                                    id: "Slot4",
                                },
                                {
                                    id: "Slot5",
                                },
                            ],
                        },
                    },
                    Slot0: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTab",
                        },
                        schemaId: fastTabId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot00",
                                },
                            ],
                        },
                    },
                    Slot00: {
                        parent: {
                            id: "Slot0",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab one",
                    },
                    Slot1: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTab",
                        },
                        schemaId: fastTabId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot10",
                                },
                            ],
                        },
                    },
                    Slot10: {
                        parent: {
                            id: "Slot1",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab two",
                    },
                    Slot2: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTab",
                        },
                        schemaId: fastTabId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot20",
                                },
                            ],
                        },
                    },
                    Slot20: {
                        parent: {
                            id: "Slot2",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab three",
                    },
                    Slot3: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTabpanel",
                        },
                        schemaId: fastTabPanelId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot30",
                                },
                            ],
                        },
                    },
                    Slot30: {
                        parent: {
                            id: "Slot3",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab panel 1",
                    },
                    Slot4: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTabpanel",
                        },
                        schemaId: fastTabPanelId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot40",
                                },
                            ],
                        },
                    },
                    Slot40: {
                        parent: {
                            id: "Slot4",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab panel 2",
                    },
                    Slot5: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTabpanel",
                        },
                        schemaId: fastTabPanelId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot50",
                                },
                            ],
                        },
                    },
                    Slot50: {
                        parent: {
                            id: "Slot5",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab panel 3",
                    },
                },
                "root",
            ],
        },
        {
            displayName: "With start and end",
            dataDictionary: [
                {
                    root: {
                        schemaId: fastTabsId,
                        data: {
                            SlotTab: [
                                {
                                    id: "Slot0",
                                },
                                {
                                    id: "Slot1",
                                },
                                {
                                    id: "Slot2",
                                },
                            ],
                            SlotTabpanel: [
                                {
                                    id: "Slot3",
                                },
                                {
                                    id: "Slot4",
                                },
                                {
                                    id: "Slot5",
                                },
                            ],
                            SlotStart: [
                                {
                                    id: "SlotStart",
                                },
                            ],
                            SlotEnd: [
                                {
                                    id: "SlotEnd",
                                },
                            ],
                        },
                    },
                    SlotStart: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotStart",
                        },
                        schemaId: fastButtonId,
                        data: {
                            appearance: "stealth",
                            Slot: [
                                {
                                    id: startPlaceholderIcon[1],
                                },
                            ],
                        },
                    },
                    ...startPlaceholderIcon[0],
                    SlotEnd: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotEnd",
                        },
                        schemaId: fastButtonId,
                        data: {
                            appearance: "stealth",
                            Slot: [
                                {
                                    id: endPlaceholderIcon[1],
                                },
                            ],
                        },
                    },
                    ...endPlaceholderIcon[0],
                    Slot0: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTab",
                        },
                        schemaId: fastTabId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot00",
                                },
                            ],
                        },
                    },
                    Slot00: {
                        parent: {
                            id: "Slot0",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab one",
                    },
                    Slot1: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTab",
                        },
                        schemaId: fastTabId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot10",
                                },
                            ],
                        },
                    },
                    Slot10: {
                        parent: {
                            id: "Slot1",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab two",
                    },
                    Slot2: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTab",
                        },
                        schemaId: fastTabId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot20",
                                },
                            ],
                        },
                    },
                    Slot20: {
                        parent: {
                            id: "Slot2",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab three",
                    },
                    Slot3: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTabpanel",
                        },
                        schemaId: fastTabPanelId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot30",
                                },
                            ],
                        },
                    },
                    Slot30: {
                        parent: {
                            id: "Slot3",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab panel 1",
                    },
                    Slot4: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTabpanel",
                        },
                        schemaId: fastTabPanelId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot40",
                                },
                            ],
                        },
                    },
                    Slot40: {
                        parent: {
                            id: "Slot4",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab panel 2",
                    },
                    Slot5: {
                        parent: {
                            id: "root",
                            dataLocation: "SlotTabpanel",
                        },
                        schemaId: fastTabPanelId,
                        data: {
                            Slot: [
                                {
                                    id: "Slot50",
                                },
                            ],
                        },
                    },
                    Slot50: {
                        parent: {
                            id: "Slot5",
                            dataLocation: "Slot",
                        },
                        schemaId: textSchema.id,
                        data: "Tab panel 3",
                    },
                },
                "root",
            ],
        },
    ],
};

export default fastTabsConfig;
