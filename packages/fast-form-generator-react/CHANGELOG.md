# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-form-generator-react@3.0.1...@microsoft/fast-form-generator-react@3.0.2) (2018-10-27)

**Note:** Version bump only for package @microsoft/fast-form-generator-react





## [3.0.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-form-generator-react@3.0.0...@microsoft/fast-form-generator-react@3.0.1) (2018-10-09)


### Bug Fixes

* update peer dependencies to match expected versions ([#1009](https://github.com/Microsoft/fast-dna/issues/1009)) ([23997a3](https://github.com/Microsoft/fast-dna/commit/23997a3))





# [3.0.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-form-generator-react@2.2.3...@microsoft/fast-form-generator-react@3.0.0) (2018-10-06)


### Bug Fixes

* allow nested at rules in styles without needing to define it in the class name contract ([#985](https://github.com/Microsoft/fast-dna/issues/985)) ([6479d4c](https://github.com/Microsoft/fast-dna/commit/6479d4c))


### chore

* remove the 'I' from interfaces ([#997](https://github.com/Microsoft/fast-dna/issues/997)) ([d924df8](https://github.com/Microsoft/fast-dna/commit/d924df8))


### Features

* refactor the form generator navigation and children API ([#963](https://github.com/Microsoft/fast-dna/issues/963)) ([8ae3051](https://github.com/Microsoft/fast-dna/commit/8ae3051))
* update JSSManager context API ([#993](https://github.com/Microsoft/fast-dna/issues/993)) ([2114213](https://github.com/Microsoft/fast-dna/commit/2114213))


### BREAKING CHANGES

* Interfaces have been renamed to remove the "I".
* This PR has breaking changes for the form generator API and the development site.





<a name="2.2.3"></a>
## [2.2.3](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-form-generator-react@2.2.2...@microsoft/fast-form-generator-react@2.2.3) (2018-09-24)

**Note:** Version bump only for package @microsoft/fast-form-generator-react





<a name="2.2.2"></a>
## [2.2.2](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-form-generator-react@2.2.1...@microsoft/fast-form-generator-react@2.2.2) (2018-09-21)

**Note:** Version bump only for package @microsoft/fast-form-generator-react





<a name="2.2.1"></a>
## [2.2.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-form-generator-react@2.2.0...@microsoft/fast-form-generator-react@2.2.1) (2018-09-19)

**Note:** Version bump only for package @microsoft/fast-form-generator-react





<a name="2.2.0"></a>
# 2.2.0 (2018-09-11)


### Features

* add contrast based color system ([#810](https://github.com/Microsoft/fast-dna/issues/810)) ([5ec457c](https://github.com/Microsoft/fast-dna/commit/5ec457c))



<a name="2.1.0"></a>
# 2.1.0 (2018-08-29)


### Bug Fixes

* **fast-form-generator-react:** fix form item select to return the correct value based on type ([#800](https://github.com/Microsoft/fast-dna/issues/800)) ([e16742b](https://github.com/Microsoft/fast-dna/commit/e16742b))


### Features

* update Lerna to ^3.0.0 ([#795](https://github.com/Microsoft/fast-dna/issues/795)) ([9ce9a56](https://github.com/Microsoft/fast-dna/commit/9ce9a56))
* upgrade to TypeScript 3.0.0 ([#793](https://github.com/Microsoft/fast-dna/issues/793)) ([e203e86](https://github.com/Microsoft/fast-dna/commit/e203e86))
* **fast-components-react-base:** add callback to horizontal overflow to return and object that informs scroll start and end ([#797](https://github.com/Microsoft/fast-dna/issues/797)) ([37975f3](https://github.com/Microsoft/fast-dna/commit/37975f3))
* **fast-form-generator:** add logic to close option menus when clicking outside of menu UI ([#708](https://github.com/Microsoft/fast-dna/issues/708)) ([2c51434](https://github.com/Microsoft/fast-dna/commit/2c51434))
* **fast-form-generator-react:** add a utility to convert a data location to a schema location ([#803](https://github.com/Microsoft/fast-dna/issues/803)) ([167b092](https://github.com/Microsoft/fast-dna/commit/167b092))
* **paragraph:** adds paragraph as a new MSFT component ([#805](https://github.com/Microsoft/fast-dna/issues/805)) ([8325d3f](https://github.com/Microsoft/fast-dna/commit/8325d3f))



<a name="2.0.0-corrected"></a>
# 2.0.0-corrected (2018-08-03)


### Bug Fixes

* fix imports after updating types ([#644](https://github.com/Microsoft/fast-dna/issues/644)) ([65ed738](https://github.com/Microsoft/fast-dna/commit/65ed738))
* **fast-components-react-msft:** fixes error running jest with components that require chroma ([#687](https://github.com/Microsoft/fast-dna/issues/687)) ([140457c](https://github.com/Microsoft/fast-dna/commit/140457c))
* **fast-development-site:** remove component name and add presets tab ([#579](https://github.com/Microsoft/fast-dna/issues/579)) ([9266132](https://github.com/Microsoft/fast-dna/commit/9266132))
* **fast-form-generator:** remove resize behavior and update fontfamily ([#727](https://github.com/Microsoft/fast-dna/issues/727)) ([5d57974](https://github.com/Microsoft/fast-dna/commit/5d57974))
* **fast-form-generator-react:** correct the validation between oneOf and anyOf checks ([#677](https://github.com/Microsoft/fast-dna/issues/677)) ([f5d185c](https://github.com/Microsoft/fast-dna/commit/f5d185c))
* **fast-form-generator-react:** entire list item should be clickable when navigating between sections ([#673](https://github.com/Microsoft/fast-dna/issues/673)) ([5504475](https://github.com/Microsoft/fast-dna/commit/5504475))
* **fast-form-generator-react:** sets the value of the textarea to an empty string if it is undefined ([#683](https://github.com/Microsoft/fast-dna/issues/683)) ([0bc66ac](https://github.com/Microsoft/fast-dna/commit/0bc66ac))
* **fast-form-generator-react:** update + glyph positioning ([#626](https://github.com/Microsoft/fast-dna/issues/626)) ([4902ea4](https://github.com/Microsoft/fast-dna/commit/4902ea4))
* **form generator:** fixes drag and drop, updates styles and shape ([#426](https://github.com/Microsoft/fast-dna/issues/426)) ([b5013a8](https://github.com/Microsoft/fast-dna/commit/b5013a8))
* **svg:** fix some malformed SVG icons ([#434](https://github.com/Microsoft/fast-dna/issues/434)) ([002dbd4](https://github.com/Microsoft/fast-dna/commit/002dbd4))


### Features

* **form generator:** add SVGs, additional JSS, and general examples ([#418](https://github.com/Microsoft/fast-dna/issues/418)) ([86f36df](https://github.com/Microsoft/fast-dna/commit/86f36df))
* add form generator to the packages ([#311](https://github.com/Microsoft/fast-dna/issues/311)) ([a339b3c](https://github.com/Microsoft/fast-dna/commit/a339b3c))
* **button:** updates to current msft styles ([#314](https://github.com/Microsoft/fast-dna/issues/314)) ([0029e06](https://github.com/Microsoft/fast-dna/commit/0029e06))
* **detail view:** add detail view ([#470](https://github.com/Microsoft/fast-dna/issues/470)) ([665b871](https://github.com/Microsoft/fast-dna/commit/665b871))
* **development-site:** add ability to have children as strings in the form generator and development site dev tools ([#518](https://github.com/Microsoft/fast-dna/issues/518)) ([2a4a87f](https://github.com/Microsoft/fast-dna/commit/2a4a87f))
* **fast-css-editor-react:** add default editor component and position component ([#636](https://github.com/Microsoft/fast-dna/issues/636)) ([72037a8](https://github.com/Microsoft/fast-dna/commit/72037a8))
* **fast-development-site:** add collapsible titles on configure pane ([#605](https://github.com/Microsoft/fast-dna/issues/605)) ([9ab9af9](https://github.com/Microsoft/fast-dna/commit/9ab9af9))
* **form:** add the form generator to the development site ([#362](https://github.com/Microsoft/fast-dna/issues/362)) ([b4c97bf](https://github.com/Microsoft/fast-dna/commit/b4c97bf))
* **form generator:** add focus/hover states ([#449](https://github.com/Microsoft/fast-dna/issues/449)) ([4dbe9a3](https://github.com/Microsoft/fast-dna/commit/4dbe9a3))
* **form generator:** adds JSS ([#392](https://github.com/Microsoft/fast-dna/issues/392)) ([aee1084](https://github.com/Microsoft/fast-dna/commit/aee1084))
* **form generator:** adds styling scaffolding and JSS for select ([#363](https://github.com/Microsoft/fast-dna/issues/363)) ([4aeef73](https://github.com/Microsoft/fast-dna/commit/4aeef73))
* **form generator:** updates styles found in configuration pane ([#420](https://github.com/Microsoft/fast-dna/issues/420)) ([919121b](https://github.com/Microsoft/fast-dna/commit/919121b))
* **markdown:** add utility to convert markdown to msft component strings ([#346](https://github.com/Microsoft/fast-dna/issues/346)) ([67bca5f](https://github.com/Microsoft/fast-dna/commit/67bca5f))





<a name="2.1.0"></a>
# [2.1.0](https://github.com/Microsoft/fast-dna/compare/v2.0.0-corrected...v2.1.0) (2018-08-29)


### Bug Fixes

* **fast-form-generator-react:** fix form item select to return the correct value based on type ([#800](https://github.com/Microsoft/fast-dna/issues/800)) ([e16742b](https://github.com/Microsoft/fast-dna/commit/e16742b))


### Features

* update Lerna to ^3.0.0 ([#795](https://github.com/Microsoft/fast-dna/issues/795)) ([9ce9a56](https://github.com/Microsoft/fast-dna/commit/9ce9a56))
* upgrade to TypeScript 3.0.0 ([#793](https://github.com/Microsoft/fast-dna/issues/793)) ([e203e86](https://github.com/Microsoft/fast-dna/commit/e203e86))
* **fast-components-react-base:** add callback to horizontal overflow to return and object that informs scroll start and end ([#797](https://github.com/Microsoft/fast-dna/issues/797)) ([37975f3](https://github.com/Microsoft/fast-dna/commit/37975f3))
* **fast-form-generator:** add logic to close option menus when clicking outside of menu UI ([#708](https://github.com/Microsoft/fast-dna/issues/708)) ([2c51434](https://github.com/Microsoft/fast-dna/commit/2c51434))
* **fast-form-generator-react:** add a utility to convert a data location to a schema location ([#803](https://github.com/Microsoft/fast-dna/issues/803)) ([167b092](https://github.com/Microsoft/fast-dna/commit/167b092))
* **paragraph:** adds paragraph as a new MSFT component ([#805](https://github.com/Microsoft/fast-dna/issues/805)) ([8325d3f](https://github.com/Microsoft/fast-dna/commit/8325d3f))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/Microsoft/fast-dna/compare/v1.6.0...v2.0.0) (2018-08-02)


### Bug Fixes

* fix imports after updating types ([#644](https://github.com/Microsoft/fast-dna/issues/644)) ([65ed738](https://github.com/Microsoft/fast-dna/commit/65ed738))
* **fast-components-react-msft:** fixes error running jest with components that require chroma ([#687](https://github.com/Microsoft/fast-dna/issues/687)) ([140457c](https://github.com/Microsoft/fast-dna/commit/140457c))
* **fast-development-site:** remove component name and add presets tab ([#579](https://github.com/Microsoft/fast-dna/issues/579)) ([9266132](https://github.com/Microsoft/fast-dna/commit/9266132))
* **fast-form-generator:** remove resize behavior and update fontfamily ([#727](https://github.com/Microsoft/fast-dna/issues/727)) ([5d57974](https://github.com/Microsoft/fast-dna/commit/5d57974))
* **fast-form-generator-react:** correct the validation between oneOf and anyOf checks ([#677](https://github.com/Microsoft/fast-dna/issues/677)) ([f5d185c](https://github.com/Microsoft/fast-dna/commit/f5d185c))
* **fast-form-generator-react:** entire list item should be clickable when navigating between sections ([#673](https://github.com/Microsoft/fast-dna/issues/673)) ([5504475](https://github.com/Microsoft/fast-dna/commit/5504475))
* **fast-form-generator-react:** sets the value of the textarea to an empty string if it is undefined ([#683](https://github.com/Microsoft/fast-dna/issues/683)) ([0bc66ac](https://github.com/Microsoft/fast-dna/commit/0bc66ac))
* **fast-form-generator-react:** update + glyph positioning ([#626](https://github.com/Microsoft/fast-dna/issues/626)) ([4902ea4](https://github.com/Microsoft/fast-dna/commit/4902ea4))


### Features

* **detail view:** add detail view ([#470](https://github.com/Microsoft/fast-dna/issues/470)) ([665b871](https://github.com/Microsoft/fast-dna/commit/665b871))
* **development-site:** add ability to have children as strings in the form generator and development site dev tools ([#518](https://github.com/Microsoft/fast-dna/issues/518)) ([2a4a87f](https://github.com/Microsoft/fast-dna/commit/2a4a87f))
* **fast-css-editor-react:** add default editor component and position component ([#636](https://github.com/Microsoft/fast-dna/issues/636)) ([72037a8](https://github.com/Microsoft/fast-dna/commit/72037a8))
* **fast-development-site:** add collapsible titles on configure pane ([#605](https://github.com/Microsoft/fast-dna/issues/605)) ([9ab9af9](https://github.com/Microsoft/fast-dna/commit/9ab9af9))
* **form generator:** add focus/hover states ([#449](https://github.com/Microsoft/fast-dna/issues/449)) ([4dbe9a3](https://github.com/Microsoft/fast-dna/commit/4dbe9a3))




<a name="1.9.0"></a>
# [1.9.0](https://github.com/Microsoft/fast-dna/compare/v1.6.0...v1.9.0) (2018-07-14)


### Bug Fixes

* fix imports after updating types ([#644](https://github.com/Microsoft/fast-dna/issues/644)) ([65ed738](https://github.com/Microsoft/fast-dna/commit/65ed738))
* **fast-components-react-msft:** fixes error running jest with components that require chroma ([#687](https://github.com/Microsoft/fast-dna/issues/687)) ([140457c](https://github.com/Microsoft/fast-dna/commit/140457c))
* **fast-development-site:** remove component name and add presets tab ([#579](https://github.com/Microsoft/fast-dna/issues/579)) ([9266132](https://github.com/Microsoft/fast-dna/commit/9266132))
* **fast-form-generator-react:** correct the validation between oneOf and anyOf checks ([#677](https://github.com/Microsoft/fast-dna/issues/677)) ([f5d185c](https://github.com/Microsoft/fast-dna/commit/f5d185c))
* **fast-form-generator-react:** entire list item should be clickable when navigating between sections ([#673](https://github.com/Microsoft/fast-dna/issues/673)) ([5504475](https://github.com/Microsoft/fast-dna/commit/5504475))
* **fast-form-generator-react:** sets the value of the textarea to an empty string if it is undefined ([#683](https://github.com/Microsoft/fast-dna/issues/683)) ([0bc66ac](https://github.com/Microsoft/fast-dna/commit/0bc66ac))
* **fast-form-generator-react:** update + glyph positioning ([#626](https://github.com/Microsoft/fast-dna/issues/626)) ([4902ea4](https://github.com/Microsoft/fast-dna/commit/4902ea4))


### Features

* **detail view:** add detail view ([#470](https://github.com/Microsoft/fast-dna/issues/470)) ([665b871](https://github.com/Microsoft/fast-dna/commit/665b871))
* **development-site:** add ability to have children as strings in the form generator and development site dev tools ([#518](https://github.com/Microsoft/fast-dna/issues/518)) ([2a4a87f](https://github.com/Microsoft/fast-dna/commit/2a4a87f))
* **fast-css-editor-react:** add default editor component and position component ([#636](https://github.com/Microsoft/fast-dna/issues/636)) ([72037a8](https://github.com/Microsoft/fast-dna/commit/72037a8))
* **form generator:** add focus/hover states ([#449](https://github.com/Microsoft/fast-dna/issues/449)) ([4dbe9a3](https://github.com/Microsoft/fast-dna/commit/4dbe9a3))




<a name="1.8.0"></a>
# [1.8.0](https://github.com/Microsoft/fast-dna/compare/v1.6.0...v1.8.0) (2018-06-12)


### Features

* **development-site:** add ability to have children as strings in the form generator and development site dev tools ([#518](https://github.com/Microsoft/fast-dna/issues/518)) ([2a4a87f](https://github.com/Microsoft/fast-dna/commit/2a4a87f))




<a name="1.7.0"></a>
# [1.7.0](https://github.com/Microsoft/fast-dna/compare/v1.6.0...v1.7.0) (2018-06-01)


### Features

* **detail view:** add detail view ([#470](https://github.com/Microsoft/fast-dna/issues/470)) ([665b871](https://github.com/Microsoft/fast-dna/commit/665b871))
* **form generator:** add focus/hover states ([#449](https://github.com/Microsoft/fast-dna/issues/449)) ([4dbe9a3](https://github.com/Microsoft/fast-dna/commit/4dbe9a3))




<a name="1.6.0"></a>
# [1.6.0](https://github.com/Microsoft/fast-dna/compare/v1.2.0...v1.6.0) (2018-05-16)


### Bug Fixes

* **form generator:** fixes drag and drop, updates styles and shape ([#426](https://github.com/Microsoft/fast-dna/issues/426)) ([b5013a8](https://github.com/Microsoft/fast-dna/commit/b5013a8))
* **svg:** fix some malformed SVG icons ([#434](https://github.com/Microsoft/fast-dna/issues/434)) ([002dbd4](https://github.com/Microsoft/fast-dna/commit/002dbd4))




<a name="1.5.0"></a>
# [1.5.0](https://github.com/Microsoft/fast-dna/compare/v1.2.0...v1.5.0) (2018-05-16)


### Bug Fixes

* **form generator:** fixes drag and drop, updates styles and shape ([#426](https://github.com/Microsoft/fast-dna/issues/426)) ([b5013a8](https://github.com/Microsoft/fast-dna/commit/b5013a8))


### Features

* **form generator:** add SVGs, additional JSS, and general examples ([#418](https://github.com/Microsoft/fast-dna/issues/418)) ([86f36df](https://github.com/Microsoft/fast-dna/commit/86f36df))
* **form generator:** updates styles found in configuration pane ([#420](https://github.com/Microsoft/fast-dna/issues/420)) ([919121b](https://github.com/Microsoft/fast-dna/commit/919121b))




<a name="1.4.0"></a>
# [1.4.0](https://github.com/Microsoft/fast-dna/compare/v1.2.0...v1.4.0) (2018-05-14)


### Features

* **form generator:** add SVGs, additional JSS, and general examples ([#418](https://github.com/Microsoft/fast-dna/issues/418)) ([86f36df](https://github.com/Microsoft/fast-dna/commit/86f36df))
* **form generator:** updates styles found in configuration pane ([#420](https://github.com/Microsoft/fast-dna/issues/420)) ([919121b](https://github.com/Microsoft/fast-dna/commit/919121b))




<a name="1.2.0"></a>
# 1.2.0 (2018-05-10)



<a name="1.1.0"></a>
# 1.1.0 (2018-05-09)


### Features

* add form generator to the packages ([#311](https://github.com/Microsoft/fast-dna/issues/311)) ([a339b3c](https://github.com/Microsoft/fast-dna/commit/a339b3c))
* **button:** updates to current msft styles ([#314](https://github.com/Microsoft/fast-dna/issues/314)) ([0029e06](https://github.com/Microsoft/fast-dna/commit/0029e06))
* **form:** add the form generator to the development site ([#362](https://github.com/Microsoft/fast-dna/issues/362)) ([b4c97bf](https://github.com/Microsoft/fast-dna/commit/b4c97bf))
* **form generator:** adds JSS ([#392](https://github.com/Microsoft/fast-dna/issues/392)) ([aee1084](https://github.com/Microsoft/fast-dna/commit/aee1084))
* **form generator:** adds styling scaffolding and JSS for select ([#363](https://github.com/Microsoft/fast-dna/issues/363)) ([4aeef73](https://github.com/Microsoft/fast-dna/commit/4aeef73))
* **markdown:** add utility to convert markdown to msft component strings ([#346](https://github.com/Microsoft/fast-dna/issues/346)) ([67bca5f](https://github.com/Microsoft/fast-dna/commit/67bca5f))
