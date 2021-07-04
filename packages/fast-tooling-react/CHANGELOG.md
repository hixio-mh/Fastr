# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.32.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.32.0...@microsoft/fast-tooling-react@1.32.1) (2020-02-07)

**Note:** Version bump only for package @microsoft/fast-tooling-react





# [1.32.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.31.0...@microsoft/fast-tooling-react@1.32.0) (2020-01-29)


### Features

* convert the section to a control ([#2628](https://github.com/Microsoft/fast-dna/issues/2628)) ([6763227](https://github.com/Microsoft/fast-dna/commit/6763227d9e0eaa99a46cf8b06c109c0b25f9024a))





# [1.31.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.30.0...@microsoft/fast-tooling-react@1.31.0) (2020-01-24)


### Bug Fixes

* checkbox control is visually represented with a checkmark when used outside of the SingleLineControlPlugin ([#2605](https://github.com/Microsoft/fast-dna/issues/2605)) ([3d0c9d6](https://github.com/Microsoft/fast-dna/commit/3d0c9d6798eba5241ff3385a4e1b036ca551d8a6))
* ensure a controlled select never has an undefined value where it may fall back to a previously set value ([#2601](https://github.com/Microsoft/fast-dna/issues/2601)) ([ef954e9](https://github.com/Microsoft/fast-dna/commit/ef954e9d27a8cc0e7bde7d9383651482f352bd8c))
* performance enhancement, update functions to plain objects for styling ([#2611](https://github.com/Microsoft/fast-dna/issues/2611)) ([ec8e6b5](https://github.com/Microsoft/fast-dna/commit/ec8e6b500308778c8c1f3c8d9e7daa3a673c2ed6))
* re-address the validation issue caused by removing required from form elements and ensure all plugin configurations can be passed to the default plugins ([#2616](https://github.com/Microsoft/fast-dna/issues/2616)) ([a6a2a61](https://github.com/Microsoft/fast-dna/commit/a6a2a6195dd4e07396159e05fb0f6836f8137036))


### Features

* add default classes and stylings to differentiate when the value of an item is not set but a default has been provided ([#2583](https://github.com/Microsoft/fast-dna/issues/2583)) ([e1ea19a](https://github.com/Microsoft/fast-dna/commit/e1ea19a1f0661477a39c6098d032e5657a4baf48))
* add the ControlTemplateUtilities to the root level export for greater flexibility when using the control plugin system ([#2607](https://github.com/Microsoft/fast-dna/issues/2607)) ([f19d3f6](https://github.com/Microsoft/fast-dna/commit/f19d3f6149892ed6fa9062343d1a1bb4e54164d4))
* allow all controls to be overridden and provide the control to be used as an uninitialized react component in the config ([#2592](https://github.com/Microsoft/fast-dna/issues/2592)) ([4c1cd8c](https://github.com/Microsoft/fast-dna/commit/4c1cd8c3f6adcd4d099638cb84953773fffb8fe2))





# [1.30.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.29.0...@microsoft/fast-tooling-react@1.30.0) (2020-01-21)


### Bug Fixes

* ensure that setting a value to null does not trigger any default button click behavior ([#2573](https://github.com/Microsoft/fast-dna/issues/2573)) ([8999afd](https://github.com/Microsoft/fast-dna/commit/8999afd5d6d87c9c174057b9c4e13b89989c1d47))


### Features

* allow viewing of all validation errors present on an object ([#2572](https://github.com/Microsoft/fast-dna/issues/2572)) ([129020e](https://github.com/Microsoft/fast-dna/commit/129020e2b0261c2ce0650de587427a4442b22aa5))





# [1.29.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.28.1...@microsoft/fast-tooling-react@1.29.0) (2020-01-09)


### Bug Fixes

* adjust precision when assigning errors to data locations ([#2564](https://github.com/Microsoft/fast-dna/issues/2564)) ([83c22e8](https://github.com/Microsoft/fast-dna/commit/83c22e8307ce656840d92abafeffc1b04acc4a87))
* check the data against the defaults for all data types ([#2562](https://github.com/Microsoft/fast-dna/issues/2562)) ([df5062a](https://github.com/Microsoft/fast-dna/commit/df5062af3de92c1972c091903c79063f33f975f1))
* remove redundant checks when assigning validation errors to invalid messages ([#2570](https://github.com/Microsoft/fast-dna/issues/2570)) ([92214d3](https://github.com/Microsoft/fast-dna/commit/92214d31cc678eb422590a345537243b8eda2a2d))


### Features

* add default controls to the export and fix documentation for overriding controls with types ([#2563](https://github.com/Microsoft/fast-dna/issues/2563)) ([e0a9c38](https://github.com/Microsoft/fast-dna/commit/e0a9c3834c65999ced2051b0a1e15b1937c610d7))





## [1.28.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.28.0...@microsoft/fast-tooling-react@1.28.1) (2020-01-07)


### Bug Fixes

* adjust and harden some small style properties on control indicators in the form ([#2556](https://github.com/Microsoft/fast-dna/issues/2556)) ([12726e8](https://github.com/Microsoft/fast-dna/commit/12726e8bb82eeba5792c327bfce7fa993b13ebb1))
* allow empty strings in the textarea form control for value and default ([#2557](https://github.com/Microsoft/fast-dna/issues/2557)) ([e508fdb](https://github.com/Microsoft/fast-dna/commit/e508fdbf66228df72b0a9600537fda88de7475d4))
* ensure root level items in the form have default ([#2555](https://github.com/Microsoft/fast-dna/issues/2555)) ([8c4bce4](https://github.com/Microsoft/fast-dna/commit/8c4bce42b232439b26fff51ce49ec3b259a57df9))





# [1.28.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.27.2...@microsoft/fast-tooling-react@1.28.0) (2020-01-07)


### Features

* add an unsafe prop to use for validation instead of the provided data ([#2550](https://github.com/Microsoft/fast-dna/issues/2550)) ([6bd8646](https://github.com/Microsoft/fast-dna/commit/6bd8646bf95f19733d3770c996d1773ddbdde2a7))
* allow custom messages to be sent from the Viewer iframe ([#2551](https://github.com/Microsoft/fast-dna/issues/2551)) ([e2e721b](https://github.com/Microsoft/fast-dna/commit/e2e721b138485d363b46def95860e7af9449ac5a))





## [1.27.2](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.27.1...@microsoft/fast-tooling-react@1.27.2) (2020-01-06)


### Bug Fixes

* [object:Object] shows up when change is saved ([#2534](https://github.com/Microsoft/fast-dna/issues/2534)) ([d5fcc11](https://github.com/Microsoft/fast-dna/commit/d5fcc11752b658a5610062b67ec4138841d90451))





## [1.27.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.27.0...@microsoft/fast-tooling-react@1.27.1) (2019-12-23)

**Note:** Version bump only for package @microsoft/fast-tooling-react





# [1.27.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.26.1...@microsoft/fast-tooling-react@1.27.0) (2019-12-18)


### Features

* mark child options and react properties as deprecated ([#2527](https://github.com/Microsoft/fast-dna/issues/2527)) ([814ff90](https://github.com/Microsoft/fast-dna/commit/814ff90ff00c44163210d072cb0c00d6e2e74cf1))





## [1.26.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.26.0...@microsoft/fast-tooling-react@1.26.1) (2019-12-13)


### Bug Fixes

* validation error are not updated after property value change ([#2518](https://github.com/Microsoft/fast-dna/issues/2518)) ([051d5a3](https://github.com/Microsoft/fast-dna/commit/051d5a3e8feab5662d9c9438790c1b9bba142692))





# [1.26.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.25.0...@microsoft/fast-tooling-react@1.26.0) (2019-12-13)


### Bug Fixes

* account for nested oneOfs when generating example data ([#2512](https://github.com/Microsoft/fast-dna/issues/2512)) ([353a8f5](https://github.com/Microsoft/fast-dna/commit/353a8f56cb2df165db5f11cbfa67856f9845345d))
* address an overflow issue in form validation messages when displayed inline ([#2516](https://github.com/Microsoft/fast-dna/issues/2516)) ([8427db7](https://github.com/Microsoft/fast-dna/commit/8427db7ecf5da9b2d77a652bb01738209d00a92b))
* losing focus in oneOfs when editing the form ([#2499](https://github.com/Microsoft/fast-dna/issues/2499)) ([b88b3fe](https://github.com/Microsoft/fast-dna/commit/b88b3fe7e49b8be7fee829d138b7f86616f720c4))


### Features

* deprecate the form plugins and onSchemaChange callback ([#2515](https://github.com/Microsoft/fast-dna/issues/2515)) ([633233e](https://github.com/Microsoft/fast-dna/commit/633233e9bc30ed7cf03e5410a4a48778279b8062))
* display errors next to each array item in the Form ([#2514](https://github.com/Microsoft/fast-dna/issues/2514)) ([2aa6f63](https://github.com/Microsoft/fast-dna/commit/2aa6f63ef863d0dd7217aac2c717354b03dff22c))





# [1.25.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.24.1...@microsoft/fast-tooling-react@1.25.0) (2019-12-11)


### Bug Fixes

* addresses an issue where items in another part of the object updating would remove the dictionary keys being displayed ([#2489](https://github.com/Microsoft/fast-dna/issues/2489)) ([486345f](https://github.com/Microsoft/fast-dna/commit/486345f123f23848f57e4508180ba724d3de13eb))


### Features

* allow an object to be disabled, which will disable all of its properties and sub-properties ([#2486](https://github.com/Microsoft/fast-dna/issues/2486)) ([30c686a](https://github.com/Microsoft/fast-dna/commit/30c686a39a828b9e49271812ac4814aec78d6569))
* pass the schema to the control to allow arbitrary metadata to be accessed ([#2487](https://github.com/Microsoft/fast-dna/issues/2487)) ([8b9ba19](https://github.com/Microsoft/fast-dna/commit/8b9ba199dbff306ee39d05950ab266ae100ed20f))
* performance enhancement when the JSON schema has deeply nested oneOfs ([#2491](https://github.com/Microsoft/fast-dna/issues/2491)) ([b8ff537](https://github.com/Microsoft/fast-dna/commit/b8ff5373129a0e2f636848d51c982d1b7869a26b))
* show additional properties when false and present a way to remove them ([#2490](https://github.com/Microsoft/fast-dna/issues/2490)) ([774fd39](https://github.com/Microsoft/fast-dna/commit/774fd390859e05abc92408e24924e397f06224db))





## [1.24.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.24.0...@microsoft/fast-tooling-react@1.24.1) (2019-12-05)


### Bug Fixes

* update the README ([#2456](https://github.com/Microsoft/fast-dna/issues/2456)) ([1896857](https://github.com/Microsoft/fast-dna/commit/189685717cc46b04b35003bb6878a03014b7da21))





# [1.24.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.23.1...@microsoft/fast-tooling-react@1.24.0) (2019-11-19)


### Bug Fixes

* update state for sections and children control when schemas or data have been updated ([#2425](https://github.com/Microsoft/fast-dna/issues/2425)) ([473e8f8](https://github.com/Microsoft/fast-dna/commit/473e8f89187e446bf2fd86fd967966eb6d12ce16))


### Features

* update React peer dependencies  ([6ac2327](https://github.com/Microsoft/fast-dna/commit/6ac232744a4c2a7c2ce903b6719213ded838d557))





## [1.23.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.23.0...@microsoft/fast-tooling-react@1.23.1) (2019-11-11)


### Bug Fixes

* ensure categories are included when the schema also includes oneOf ([#2416](https://github.com/Microsoft/fast-dna/issues/2416)) ([ca6a106](https://github.com/Microsoft/fast-dna/commit/ca6a106bed94a60a7704814c72470cd361a845eb))





# [1.23.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.22.2...@microsoft/fast-tooling-react@1.23.0) (2019-11-07)


### Bug Fixes

* address a case where string components were untitled in the breadcrumb navigation ([#2390](https://github.com/Microsoft/fast-dna/issues/2390)) ([99032bf](https://github.com/Microsoft/fast-dna/commit/99032bf49f074e84491e65810f174b27af21d03e))
* allows oneOfs to be undefined if no values have been set ([#2404](https://github.com/Microsoft/fast-dna/issues/2404)) ([d6bc35a](https://github.com/Microsoft/fast-dna/commit/d6bc35a05cb16ccf683ae3ba7ea9caa4c30cb525))


### Features

* add new utilities for commonly used data manipulation ([#2383](https://github.com/Microsoft/fast-dna/issues/2383)) ([cbb7e7f](https://github.com/Microsoft/fast-dna/commit/cbb7e7fca7ab96ef8ffeb572745d111c15b462c3))
* allow properties to be categorized ([#2394](https://github.com/Microsoft/fast-dna/issues/2394)) ([095cdc9](https://github.com/Microsoft/fast-dna/commit/095cdc9781c2c615edf7ce8197b42318a51b6c18))





## [1.22.2](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.22.1...@microsoft/fast-tooling-react@1.22.2) (2019-10-25)


### Bug Fixes

* addresses a positioning issue for the form children control ([#2385](https://github.com/Microsoft/fast-dna/issues/2385)) ([81e5097](https://github.com/Microsoft/fast-dna/commit/81e50970d5938a879541df37a7f1aa98ea4d4528))
* addresses an issue where navigation to string children was causing an error to throw ([#2389](https://github.com/Microsoft/fast-dna/issues/2389)) ([09903e6](https://github.com/Microsoft/fast-dna/commit/09903e6e0940873a729a7194d3d0510bc18e8753))
* use dot notation for manipulating objects and arrays during duplication ([#2384](https://github.com/Microsoft/fast-dna/issues/2384)) ([86fad8e](https://github.com/Microsoft/fast-dna/commit/86fad8eb251b892772b6f8a51dcf82d720369e91))





## [1.22.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.22.0...@microsoft/fast-tooling-react@1.22.1) (2019-10-24)

**Note:** Version bump only for package @microsoft/fast-tooling-react





# [1.22.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.21.1...@microsoft/fast-tooling-react@1.22.0) (2019-10-18)


### Features

* use descriptions as title attributes on labels so they appear as tooltips ([#2320](https://github.com/Microsoft/fast-dna/issues/2320)) ([a135c4f](https://github.com/Microsoft/fast-dna/commit/a135c4f))





## [1.21.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.21.0...@microsoft/fast-tooling-react@1.21.1) (2019-10-17)

**Note:** Version bump only for package @microsoft/fast-tooling-react





# [1.21.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.20.0...@microsoft/fast-tooling-react@1.21.0) (2019-10-16)


### Bug Fixes

* store the length of the arrays when converting data locations ([#2305](https://github.com/Microsoft/fast-dna/issues/2305)) ([3cf5d57](https://github.com/Microsoft/fast-dna/commit/3cf5d57))
* update the react-dnd dependencies to the correct version since form is using the new hooks features ([#2334](https://github.com/Microsoft/fast-dna/issues/2334)) ([0c5418e](https://github.com/Microsoft/fast-dna/commit/0c5418e))
* updates controls to show in the default context ([#2308](https://github.com/Microsoft/fast-dna/issues/2308)) ([b9a1136](https://github.com/Microsoft/fast-dna/commit/b9a1136))


### Features

* add validation errors to a section ([#2307](https://github.com/Microsoft/fast-dna/issues/2307)) ([31bad95](https://github.com/Microsoft/fast-dna/commit/31bad95))





# [1.20.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.19.0...@microsoft/fast-tooling-react@1.20.0) (2019-10-07)


### Bug Fixes

* addresses an issue where the Navigation component was not returning square brackets in path locations ([#2294](https://github.com/Microsoft/fast-dna/issues/2294)) ([6a5206e](https://github.com/Microsoft/fast-dna/commit/6a5206e))


### Features

* allow control plugins to be passed to the form ([#2298](https://github.com/Microsoft/fast-dna/issues/2298)) ([51940f9](https://github.com/Microsoft/fast-dna/commit/51940f9))





# [1.19.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.18.6...@microsoft/fast-tooling-react@1.19.0) (2019-10-07)


### Bug Fixes

* check for different schemas by reference ([#2293](https://github.com/Microsoft/fast-dna/issues/2293)) ([52ad6b6](https://github.com/Microsoft/fast-dna/commit/52ad6b6))
* validation errors are not displayed on component creation in the form ([#2288](https://github.com/Microsoft/fast-dna/issues/2288)) ([0868734](https://github.com/Microsoft/fast-dna/commit/0868734))


### Features

* add a BareForm secondary export without drag and drop context ([#2291](https://github.com/Microsoft/fast-dna/issues/2291)) ([98cfef1](https://github.com/Microsoft/fast-dna/commit/98cfef1))
* implement templates and plugins in the form for default controls ([#2292](https://github.com/Microsoft/fast-dna/issues/2292)) ([442df5e](https://github.com/Microsoft/fast-dna/commit/442df5e))





## [1.18.6](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.18.5...@microsoft/fast-tooling-react@1.18.6) (2019-10-02)

**Note:** Version bump only for package @microsoft/fast-tooling-react





## [1.18.5](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.18.4...@microsoft/fast-tooling-react@1.18.5) (2019-09-17)

**Note:** Version bump only for package @microsoft/fast-tooling-react





## [1.18.4](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.18.3...@microsoft/fast-tooling-react@1.18.4) (2019-09-10)


### Bug Fixes

* consolidate drag and drop dependencies ([#2228](https://github.com/Microsoft/fast-dna/issues/2228)) ([24dfc1a](https://github.com/Microsoft/fast-dna/commit/24dfc1a))





## [1.18.3](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.18.2...@microsoft/fast-tooling-react@1.18.3) (2019-09-09)

**Note:** Version bump only for package @microsoft/fast-tooling-react





## [1.18.2](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.18.1...@microsoft/fast-tooling-react@1.18.2) (2019-09-05)


### Bug Fixes

* update to use bracket notation on arrays when exporting data locations ([#2184](https://github.com/Microsoft/fast-dna/issues/2184)) ([2768e55](https://github.com/Microsoft/fast-dna/commit/2768e55))





## [1.18.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.18.0...@microsoft/fast-tooling-react@1.18.1) (2019-08-29)

**Note:** Version bump only for package @microsoft/fast-tooling-react





# [1.18.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.17.1...@microsoft/fast-tooling-react@1.18.0) (2019-08-24)


### Features

* allow additional properties to be added as a dictionary of keys ([#2150](https://github.com/Microsoft/fast-dna/issues/2150)) ([0a28108](https://github.com/Microsoft/fast-dna/commit/0a28108))





## [1.17.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.17.0...@microsoft/fast-tooling-react@1.17.1) (2019-08-22)

**Note:** Version bump only for package @microsoft/fast-tooling-react





# [1.17.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.16.0...@microsoft/fast-tooling-react@1.17.0) (2019-08-22)


### Features

* add css border radius component ([#2110](https://github.com/Microsoft/fast-dna/issues/2110)) ([7501b6f](https://github.com/Microsoft/fast-dna/commit/7501b6f))
* export individual keycodes as named exports and unreference KeyCodes ([327d806](https://github.com/Microsoft/fast-dna/commit/327d806))





# [1.16.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.15.3...@microsoft/fast-tooling-react@1.16.0) (2019-08-16)


### Features

* increase perf on determining the navigation from the Form ([#2127](https://github.com/Microsoft/fast-dna/issues/2127)) ([292b745](https://github.com/Microsoft/fast-dna/commit/292b745))





## [1.15.3](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.15.2...@microsoft/fast-tooling-react@1.15.3) (2019-08-14)

**Note:** Version bump only for package @microsoft/fast-tooling-react





## [1.15.2](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.15.1...@microsoft/fast-tooling-react@1.15.2) (2019-08-09)

**Note:** Version bump only for package @microsoft/fast-tooling-react





## [1.15.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.15.0...@microsoft/fast-tooling-react@1.15.1) (2019-08-01)


### Bug Fixes

* address an issue in controlled state where Navigation should pass an updated data location ([#2087](https://github.com/Microsoft/fast-dna/issues/2087)) ([acaac94](https://github.com/Microsoft/fast-dna/commit/acaac94))





# [1.15.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.14.0...@microsoft/fast-tooling-react@1.15.0) (2019-08-01)


### Features

* addresses an issue where duplication of children would not work when there was only a single child, also allows the duplication of string children ([#2085](https://github.com/Microsoft/fast-dna/issues/2085)) ([2dbc722](https://github.com/Microsoft/fast-dna/commit/2dbc722))





# [1.14.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.13.0...@microsoft/fast-tooling-react@1.14.0) (2019-08-01)


### Bug Fixes

* css data gets out of sync ([#2081](https://github.com/Microsoft/fast-dna/issues/2081)) ([11d6d7f](https://github.com/Microsoft/fast-dna/commit/11d6d7f))


### Features

* add ability to duplicate component children in react "children" property using Ctrl + D in the navigation component ([#2069](https://github.com/Microsoft/fast-dna/issues/2069)) ([5b0a524](https://github.com/Microsoft/fast-dna/commit/5b0a524))
* add css Background, fix default border style ([#2074](https://github.com/Microsoft/fast-dna/issues/2074)) ([5882061](https://github.com/Microsoft/fast-dna/commit/5882061))
* change Navigation selection UX and update UI to new design guidance ([#2076](https://github.com/Microsoft/fast-dna/issues/2076)) ([b3b4349](https://github.com/Microsoft/fast-dna/commit/b3b4349))





# [1.13.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.12.3...@microsoft/fast-tooling-react@1.13.0) (2019-07-31)


### Bug Fixes

* address an issue where undefined was used in select and would show the previous value ([#2063](https://github.com/Microsoft/fast-dna/issues/2063)) ([5ab6d59](https://github.com/Microsoft/fast-dna/commit/5ab6d59))
* adjust spacing on SelectDevice dropdown for the dropdown arrow ([#2008](https://github.com/Microsoft/fast-dna/issues/2008)) ([d3b22d0](https://github.com/Microsoft/fast-dna/commit/d3b22d0))
* allow the deletion via keyboard of dashes in property names ([#2064](https://github.com/Microsoft/fast-dna/issues/2064)) ([3da0d2b](https://github.com/Microsoft/fast-dna/commit/3da0d2b))
* allow typing in spinal case for the CSS property name ([#2049](https://github.com/Microsoft/fast-dna/issues/2049)) ([d6a3799](https://github.com/Microsoft/fast-dna/commit/d6a3799))
* ensure enter does not 'click' buttons in the Form ([#2044](https://github.com/Microsoft/fast-dna/issues/2044)) ([64380dc](https://github.com/Microsoft/fast-dna/commit/64380dc))
* integration fixes between css editor and css property editor ([#2067](https://github.com/Microsoft/fast-dna/issues/2067)) ([342ec5b](https://github.com/Microsoft/fast-dna/commit/342ec5b))
* use focus visible in form items that support it ([#2023](https://github.com/Microsoft/fast-dna/issues/2023)) ([7c68aaa](https://github.com/Microsoft/fast-dna/commit/7c68aaa))
* width and height styles ([#2056](https://github.com/Microsoft/fast-dna/issues/2056)) ([453ce25](https://github.com/Microsoft/fast-dna/commit/453ce25))


### Features

* add css border component ([#2026](https://github.com/Microsoft/fast-dna/issues/2026)) ([7976560](https://github.com/Microsoft/fast-dna/commit/7976560))
* add css boxShadow ([#2047](https://github.com/Microsoft/fast-dna/issues/2047)) ([79a455c](https://github.com/Microsoft/fast-dna/commit/79a455c))
* add css color picker ([#2025](https://github.com/Microsoft/fast-dna/issues/2025)) ([a4d9201](https://github.com/Microsoft/fast-dna/commit/a4d9201))
* add enter key behavior to CSS prop editor ([#2012](https://github.com/Microsoft/fast-dna/issues/2012)) ([f75fb5d](https://github.com/Microsoft/fast-dna/commit/f75fb5d))
* implement ctrl click to edit child item after adding it ([#2060](https://github.com/Microsoft/fast-dna/issues/2060)) ([59ade70](https://github.com/Microsoft/fast-dna/commit/59ade70))
* refine css prop editor create row behavior ([#1988](https://github.com/Microsoft/fast-dna/issues/1988)) ([5a641b6](https://github.com/Microsoft/fast-dna/commit/5a641b6))





## [1.12.3](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.12.2...@microsoft/fast-tooling-react@1.12.3) (2019-07-24)


### Bug Fixes

* correcting missing data-location reference ([#2009](https://github.com/Microsoft/fast-dna/issues/2009)) ([3d6c14c](https://github.com/Microsoft/fast-dna/commit/3d6c14c))





## [1.12.2](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.12.1...@microsoft/fast-tooling-react@1.12.2) (2019-07-24)


### Bug Fixes

* add drag and drop of components to their direct children ([#2006](https://github.com/Microsoft/fast-dna/issues/2006)) ([1bd2196](https://github.com/Microsoft/fast-dna/commit/1bd2196))
* normalize data locations of plugins ([#2007](https://github.com/Microsoft/fast-dna/issues/2007)) ([b8bb2c3](https://github.com/Microsoft/fast-dna/commit/b8bb2c3))





## [1.12.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.12.0...@microsoft/fast-tooling-react@1.12.1) (2019-07-23)


### Bug Fixes

* enable plugin resolvers to be invoked with string or number data ([#2004](https://github.com/Microsoft/fast-dna/issues/2004)) ([5dfe57b](https://github.com/Microsoft/fast-dna/commit/5dfe57b))





# [1.12.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.11.1...@microsoft/fast-tooling-react@1.12.0) (2019-07-23)


### Bug Fixes

* resolve plugins against objects without props ([#2000](https://github.com/Microsoft/fast-dna/issues/2000)) ([37b4fe3](https://github.com/Microsoft/fast-dna/commit/37b4fe3))


### Features

*  delete rows with empty data on blur ([#1893](https://github.com/Microsoft/fast-dna/issues/1893)) ([706b47c](https://github.com/Microsoft/fast-dna/commit/706b47c))
* adds data location to plugin resolver ([#1976](https://github.com/Microsoft/fast-dna/issues/1976)) ([d3016a8](https://github.com/Microsoft/fast-dna/commit/d3016a8))





## [1.11.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.11.0...@microsoft/fast-tooling-react@1.11.1) (2019-07-16)


### Bug Fixes

* mutability fix for the initial data being passed to the Form ([#1926](https://github.com/Microsoft/fast-dna/issues/1926)) ([b4aa7be](https://github.com/Microsoft/fast-dna/commit/b4aa7be))
* Navigation arrows should only tip 45 degrees ([#1956](https://github.com/Microsoft/fast-dna/issues/1956)) ([fcabdb8](https://github.com/Microsoft/fast-dna/commit/fcabdb8))





# [1.11.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.10.1...@microsoft/fast-tooling-react@1.11.0) (2019-07-09)


### Bug Fixes

* refine sorting behavior to be more precise when dealing with items that are not children items ([#1919](https://github.com/Microsoft/fast-dna/issues/1919)) ([d4f25ae](https://github.com/Microsoft/fast-dna/commit/d4f25ae))
* slight performance improvement when getting the children locations within a schema ([#1897](https://github.com/Microsoft/fast-dna/issues/1897)) ([f6efd80](https://github.com/Microsoft/fast-dna/commit/f6efd80))


### Features

* add grab hand when hovering a draggable item ([#1917](https://github.com/Microsoft/fast-dna/issues/1917)) ([4c0683f](https://github.com/Microsoft/fast-dna/commit/4c0683f))
* add hierarchical lines to the Navigation component UI ([#1911](https://github.com/Microsoft/fast-dna/issues/1911)) ([a3b9f10](https://github.com/Microsoft/fast-dna/commit/a3b9f10))
* add plugins to the ViewerContent component ([#1907](https://github.com/Microsoft/fast-dna/issues/1907)) ([a88c29b](https://github.com/Microsoft/fast-dna/commit/a88c29b))
* allow children in the React default children prop to be directly nested in the Navigation component ([#1910](https://github.com/Microsoft/fast-dna/issues/1910)) ([a810ea8](https://github.com/Microsoft/fast-dna/commit/a810ea8))





## [1.10.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.10.0...@microsoft/fast-tooling-react@1.10.1) (2019-07-01)

**Note:** Version bump only for package @microsoft/fast-tooling-react





# [1.10.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.9.0...@microsoft/fast-tooling-react@1.10.0) (2019-06-25)


### Bug Fixes

* allows the navigation to update using the active location when new props are passed ([#1890](https://github.com/Microsoft/fast-dna/issues/1890)) ([31cf014](https://github.com/Microsoft/fast-dna/commit/31cf014))
* check to see if any child options or plugins have been passed before attempting to map their locations ([#1894](https://github.com/Microsoft/fast-dna/issues/1894)) ([0ee5c2e](https://github.com/Microsoft/fast-dna/commit/0ee5c2e))
* only check for a modified schema when the onSchemaChange callback is expected to be called ([#1891](https://github.com/Microsoft/fast-dna/issues/1891)) ([eea54d6](https://github.com/Microsoft/fast-dna/commit/eea54d6))


### Features

* add a navigation menu ([#1883](https://github.com/Microsoft/fast-dna/issues/1883)) ([11f569c](https://github.com/Microsoft/fast-dna/commit/11f569c))





# [1.9.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.8.5...@microsoft/fast-tooling-react@1.9.0) (2019-06-17)


### Bug Fixes

* addresses an issue in the mapDataToComponent utility where plugins and children would not work on objects inside arrays ([#1857](https://github.com/Microsoft/fast-dna/issues/1857)) ([6c3c8fa](https://github.com/Microsoft/fast-dna/commit/6c3c8fa))


### Features

* allow any use of plugins to not require the onSchemaChange callback ([#1861](https://github.com/Microsoft/fast-dna/issues/1861)) ([4f8e27e](https://github.com/Microsoft/fast-dna/commit/4f8e27e))
* enable setting null values in the Form ([#1845](https://github.com/Microsoft/fast-dna/issues/1845)) ([cd013d6](https://github.com/Microsoft/fast-dna/commit/cd013d6))





## [1.8.5](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.8.4...@microsoft/fast-tooling-react@1.8.5) (2019-06-12)

**Note:** Version bump only for package @microsoft/fast-tooling-react





## [1.8.4](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.8.3...@microsoft/fast-tooling-react@1.8.4) (2019-06-11)

**Note:** Version bump only for package @microsoft/fast-tooling-react





## [1.8.3](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.8.2...@microsoft/fast-tooling-react@1.8.3) (2019-06-07)


### Bug Fixes

* allow undefined values for properties in the CSS property editor ([#1824](https://github.com/Microsoft/fast-dna/issues/1824)) ([9d28a85](https://github.com/Microsoft/fast-dna/commit/9d28a85))
* removed an unnecessary type assigned to the navigation items in Navigation ([#1835](https://github.com/Microsoft/fast-dna/issues/1835)) ([84bf5ea](https://github.com/Microsoft/fast-dna/commit/84bf5ea))





## [1.8.2](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.8.1...@microsoft/fast-tooling-react@1.8.2) (2019-06-05)


### Bug Fixes

* address formatting issue with self closing children and multiple children components ([#1823](https://github.com/Microsoft/fast-dna/issues/1823)) ([c447bce](https://github.com/Microsoft/fast-dna/commit/c447bce))





## [1.8.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.8.0...@microsoft/fast-tooling-react@1.8.1) (2019-06-05)


### Bug Fixes

* add a missing dependency to the package ([#1820](https://github.com/Microsoft/fast-dna/issues/1820)) ([2e78e28](https://github.com/Microsoft/fast-dna/commit/2e78e28))





# [1.8.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.7.0...@microsoft/fast-tooling-react@1.8.0) (2019-06-05)


### Bug Fixes

* address a memory leak in the mapDataToComponent utility ([#1819](https://github.com/Microsoft/fast-dna/issues/1819)) ([4907deb](https://github.com/Microsoft/fast-dna/commit/4907deb))


### Features

* add drag and drop functionality to Navigation ([#1808](https://github.com/Microsoft/fast-dna/issues/1808)) ([1f0afe5](https://github.com/Microsoft/fast-dna/commit/1f0afe5))





# [1.7.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.6.0...@microsoft/fast-tooling-react@1.7.0) (2019-05-31)


### Bug Fixes

* add check for data type to make sure children don't fire a location update callback ([#1794](https://github.com/Microsoft/fast-dna/issues/1794)) ([8537249](https://github.com/Microsoft/fast-dna/commit/8537249))
* resolves an issue where height and width can go from controlled to uncontrolled state ([#1770](https://github.com/Microsoft/fast-dna/issues/1770)) ([359a927](https://github.com/Microsoft/fast-dna/commit/359a927))


### Features

* add data mapping to a code preview ([#1787](https://github.com/Microsoft/fast-dna/issues/1787)) ([4c91a21](https://github.com/Microsoft/fast-dna/commit/4c91a21))
* allow complex object and array nesting in the navigation ([#1767](https://github.com/Microsoft/fast-dna/issues/1767)) ([d25824c](https://github.com/Microsoft/fast-dna/commit/d25824c))
* refactor and export data mapping to code preview ([#1802](https://github.com/Microsoft/fast-dna/issues/1802)) ([0ee0bdd](https://github.com/Microsoft/fast-dna/commit/0ee0bdd))
* show values as dash separated and send camelCase values in the CSS property editor callback ([#1772](https://github.com/Microsoft/fast-dna/issues/1772)) ([93d6223](https://github.com/Microsoft/fast-dna/commit/93d6223))





# [1.6.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.5.0...@microsoft/fast-tooling-react@1.6.0) (2019-05-17)


### Features

* add ability to traverse form without data ([#1741](https://github.com/Microsoft/fast-dna/issues/1741)) ([1f48d7a](https://github.com/Microsoft/fast-dna/commit/1f48d7a))
* allow defaults to be inherited ([#1747](https://github.com/Microsoft/fast-dna/issues/1747)) ([9a86655](https://github.com/Microsoft/fast-dna/commit/9a86655))





# [1.5.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.4.0...@microsoft/fast-tooling-react@1.5.0) (2019-05-08)


### Bug Fixes

* schemas should use examples as arrays ([#1726](https://github.com/Microsoft/fast-dna/issues/1726)) ([2fa0392](https://github.com/Microsoft/fast-dna/commit/2fa0392))


### Features

* add an ad-hoc css property editor ([#1729](https://github.com/Microsoft/fast-dna/issues/1729)) ([d42339a](https://github.com/Microsoft/fast-dna/commit/d42339a))





# [1.4.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.3.1...@microsoft/fast-tooling-react@1.4.0) (2019-05-01)


### Bug Fixes

* use a merge strategy for oneOf/anyOfs during validation ([#1685](https://github.com/Microsoft/fast-dna/issues/1685)) ([5c28382](https://github.com/Microsoft/fast-dna/commit/5c28382))


### Features

* labels for oneOf/anyOf use JSON schema title metadata ([#1687](https://github.com/Microsoft/fast-dna/issues/1687)) ([a5b1c00](https://github.com/Microsoft/fast-dna/commit/a5b1c00))
* support added for JSON schema keyword 'const' ([#1698](https://github.com/Microsoft/fast-dna/issues/1698)) ([95deb0e](https://github.com/Microsoft/fast-dna/commit/95deb0e))





## [1.3.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.3.0...@microsoft/fast-tooling-react@1.3.1) (2019-04-26)

**Note:** Version bump only for package @microsoft/fast-tooling-react





# [1.3.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.2.5...@microsoft/fast-tooling-react@1.3.0) (2019-04-23)


### Bug Fixes

* prevent a -1 on a oneOf/anyOf validation check ([#1682](https://github.com/Microsoft/fast-dna/issues/1682)) ([a718742](https://github.com/Microsoft/fast-dna/commit/a718742))


### Features

* add width and height components to the CSS Editor ([#1635](https://github.com/Microsoft/fast-dna/issues/1635)) ([1bf9ee5](https://github.com/Microsoft/fast-dna/commit/1bf9ee5))
* allow defaults to be set as the current value ([#1662](https://github.com/Microsoft/fast-dna/issues/1662)) ([886b143](https://github.com/Microsoft/fast-dna/commit/886b143))
* reduce dependency on peer dependencies ([#1669](https://github.com/Microsoft/fast-dna/issues/1669)) ([cc06b10](https://github.com/Microsoft/fast-dna/commit/cc06b10))
* show a red underline for objects and arrays if they contain invalid data ([#1688](https://github.com/Microsoft/fast-dna/issues/1688)) ([9908152](https://github.com/Microsoft/fast-dna/commit/9908152))





## [1.2.5](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.2.4...@microsoft/fast-tooling-react@1.2.5) (2019-04-17)


### Bug Fixes

* resolves an issue where clicking on a section link that contained a oneOf/anyOf keyword results in an exception ([#1673](https://github.com/Microsoft/fast-dna/issues/1673)) ([683fe8b](https://github.com/Microsoft/fast-dna/commit/683fe8b))





## [1.2.4](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.2.3...@microsoft/fast-tooling-react@1.2.4) (2019-04-17)


### Bug Fixes

* allow navigation in nested oneOf/anyOf objects when the form is uncontrolled ([#1670](https://github.com/Microsoft/fast-dna/issues/1670)) ([a80c7ac](https://github.com/Microsoft/fast-dna/commit/a80c7ac))





## [1.2.3](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.2.2...@microsoft/fast-tooling-react@1.2.3) (2019-04-15)

**Note:** Version bump only for package @microsoft/fast-tooling-react





## [1.2.2](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.2.1...@microsoft/fast-tooling-react@1.2.2) (2019-04-11)

**Note:** Version bump only for package @microsoft/fast-tooling-react





## [1.2.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.2.0...@microsoft/fast-tooling-react@1.2.1) (2019-04-10)

**Note:** Version bump only for package @microsoft/fast-tooling-react





# [1.2.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.1.1...@microsoft/fast-tooling-react@1.2.0) (2019-04-09)


### Bug Fixes

* fixes a reversion where ids no longer restricted the child options ([#1608](https://github.com/Microsoft/fast-dna/issues/1608)) ([94f5f00](https://github.com/Microsoft/fast-dna/commit/94f5f00))


### Features

* allow an array to be unset/reset if it is optional ([#1613](https://github.com/Microsoft/fast-dna/issues/1613)) ([c671b4c](https://github.com/Microsoft/fast-dna/commit/c671b4c))
* use defaults as values if the data has not been set and adds an indicator in the UI to signify that the data is default ([#1619](https://github.com/Microsoft/fast-dna/issues/1619)) ([7131fc8](https://github.com/Microsoft/fast-dna/commit/7131fc8))





## [1.1.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.1.0...@microsoft/fast-tooling-react@1.1.1) (2019-04-03)

**Note:** Version bump only for package @microsoft/fast-tooling-react





# [1.1.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.0.1...@microsoft/fast-tooling-react@1.1.0) (2019-04-03)


### Features

* add inline and native browser validation derived from JSON schema ([#1595](https://github.com/Microsoft/fast-dna/issues/1595)) ([3f5a702](https://github.com/Microsoft/fast-dna/commit/3f5a702))





## [1.0.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@1.0.0...@microsoft/fast-tooling-react@1.0.1) (2019-03-25)


### Bug Fixes

* updates the styling of children and array items so that the remove button is inline with the add button ([#1586](https://github.com/Microsoft/fast-dna/issues/1586)) ([b9aa9ef](https://github.com/Microsoft/fast-dna/commit/b9aa9ef))





# [1.0.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@0.3.0...@microsoft/fast-tooling-react@1.0.0) (2019-03-25)


### Bug Fixes

* update to use esModuleInterop in the TypeScript configuration files ([#1211](https://github.com/Microsoft/fast-dna/issues/1211)) ([2ec0644](https://github.com/Microsoft/fast-dna/commit/2ec0644))


### Features

* update and refactor the CSS editor ([#1543](https://github.com/Microsoft/fast-dna/issues/1543)) ([defcce4](https://github.com/Microsoft/fast-dna/commit/defcce4))
* update to use ajv as the JSON schema validator ([#1564](https://github.com/Microsoft/fast-dna/issues/1564)) ([939bdb4](https://github.com/Microsoft/fast-dna/commit/939bdb4))


### BREAKING CHANGES

* This changes the API of the CSS editor to be more
consistent with the API of similar tooling package exports such as the
form.
* This will affect how imports will be handled by
consumers





# [0.3.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@0.2.0...@microsoft/fast-tooling-react@0.3.0) (2019-03-22)


### Bug Fixes

* add an optional schemaLocation to be used instead of an automated mapping ([#1563](https://github.com/Microsoft/fast-dna/issues/1563)) ([e0c7545](https://github.com/Microsoft/fast-dna/commit/e0c7545))


### Features

* add badges ([#1568](https://github.com/Microsoft/fast-dna/issues/1568)) ([91568aa](https://github.com/Microsoft/fast-dna/commit/91568aa))





# [0.2.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-tooling-react@0.1.0...@microsoft/fast-tooling-react@0.2.0) (2019-03-19)


### Bug Fixes

* update jest to fix build break ([#1531](https://github.com/Microsoft/fast-dna/issues/1531)) ([73ae6de](https://github.com/Microsoft/fast-dna/commit/73ae6de))


### Features

* add a check for the examples key in JSON schema when generating data ([#1491](https://github.com/Microsoft/fast-dna/issues/1491)) ([be977f1](https://github.com/Microsoft/fast-dna/commit/be977f1))
* add css editor to the tooling package ([#1532](https://github.com/Microsoft/fast-dna/issues/1532)) ([a579bc9](https://github.com/Microsoft/fast-dna/commit/a579bc9))
* add the form generator to tooling ([#1523](https://github.com/Microsoft/fast-dna/issues/1523)) ([7d8012d](https://github.com/Microsoft/fast-dna/commit/7d8012d))





# 0.1.0 (2019-03-11)


### Features

* add a new tooling package and deprecate the existing [@microsoft](https://github.com/microsoft)/fast-data-utilities-react package ([#1469](https://github.com/Microsoft/fast-dna/issues/1469)) ([8330615](https://github.com/Microsoft/fast-dna/commit/8330615))
* add navigation to the tooling package ([#1492](https://github.com/Microsoft/fast-dna/issues/1492)) ([3a988d3](https://github.com/Microsoft/fast-dna/commit/3a988d3))
* add new data generator and consolidate some files into more meaningful naming structures ([#1484](https://github.com/Microsoft/fast-dna/issues/1484)) ([6a6979a](https://github.com/Microsoft/fast-dna/commit/6a6979a))
* add viewer to tooling ([#1511](https://github.com/Microsoft/fast-dna/issues/1511)) ([721552d](https://github.com/Microsoft/fast-dna/commit/721552d))
