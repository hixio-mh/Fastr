# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-jss-manager-react@3.0.1...@microsoft/fast-jss-manager-react@3.0.2) (2018-10-27)


### Bug Fixes

* parent style elements should be ordered after child style elements ([#1018](https://github.com/Microsoft/fast-dna/issues/1018)) ([9039317](https://github.com/Microsoft/fast-dna/commit/9039317))





## [3.0.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-jss-manager-react@3.0.0...@microsoft/fast-jss-manager-react@3.0.1) (2018-10-09)


### Bug Fixes

* reintroduce componentDidMount in JSS manager to address incidental regressions ([#1006](https://github.com/Microsoft/fast-dna/issues/1006)) ([f0a71c4](https://github.com/Microsoft/fast-dna/commit/f0a71c4))





# [3.0.0](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-jss-manager-react@2.2.1...@microsoft/fast-jss-manager-react@3.0.0) (2018-10-06)


### Bug Fixes

* correct and standardize component interfaces across react ([#978](https://github.com/Microsoft/fast-dna/issues/978)) ([b1b6ae1](https://github.com/Microsoft/fast-dna/commit/b1b6ae1))


### chore

* remove the 'I' from interfaces ([#997](https://github.com/Microsoft/fast-dna/issues/997)) ([d924df8](https://github.com/Microsoft/fast-dna/commit/d924df8))


### Features

* update JSSManager context API ([#993](https://github.com/Microsoft/fast-dna/issues/993)) ([2114213](https://github.com/Microsoft/fast-dna/commit/2114213))


### BREAKING CHANGES

* Interfaces have been renamed to remove the "I".





<a name="2.2.1"></a>
## [2.2.1](https://github.com/Microsoft/fast-dna/compare/@microsoft/fast-jss-manager-react@2.2.0...@microsoft/fast-jss-manager-react@2.2.1) (2018-09-19)


### Bug Fixes

* fix error caused by adding a React ref to a JSSManager instance ([#913](https://github.com/Microsoft/fast-dna/issues/913)) ([ff94432](https://github.com/Microsoft/fast-dna/commit/ff94432))





<a name="2.2.0"></a>
# 2.2.0 (2018-09-11)


### Features

* add contrast based color system ([#810](https://github.com/Microsoft/fast-dna/issues/810)) ([5ec457c](https://github.com/Microsoft/fast-dna/commit/5ec457c))



<a name="2.1.0"></a>
# 2.1.0 (2018-08-29)


### Features

* update Lerna to ^3.0.0 ([#795](https://github.com/Microsoft/fast-dna/issues/795)) ([9ce9a56](https://github.com/Microsoft/fast-dna/commit/9ce9a56))
* upgrade to TypeScript 3.0.0 ([#793](https://github.com/Microsoft/fast-dna/issues/793)) ([e203e86](https://github.com/Microsoft/fast-dna/commit/e203e86))
* **fast-components-react-base:** add callback to horizontal overflow to return and object that informs scroll start and end ([#797](https://github.com/Microsoft/fast-dna/issues/797)) ([37975f3](https://github.com/Microsoft/fast-dna/commit/37975f3))
* **paragraph:** adds paragraph as a new MSFT component ([#805](https://github.com/Microsoft/fast-dna/issues/805)) ([8325d3f](https://github.com/Microsoft/fast-dna/commit/8325d3f))



<a name="2.0.0-corrected"></a>
# 2.0.0-corrected (2018-08-03)


### Bug Fixes

* ensure app build and tslint processes run prior in the build gate ([#132](https://github.com/Microsoft/fast-dna/issues/132)) ([e74f953](https://github.com/Microsoft/fast-dna/commit/e74f953))
* fix tslint globbing issue and enforce whitespace in import/export statements ([#219](https://github.com/Microsoft/fast-dna/issues/219)) ([4637a90](https://github.com/Microsoft/fast-dna/commit/4637a90))
* travis-CI build-break ([#336](https://github.com/Microsoft/fast-dna/issues/336)) ([bffbf5e](https://github.com/Microsoft/fast-dna/commit/bffbf5e))
* **fast-components-react-msft:** fixes error running jest with components that require chroma ([#687](https://github.com/Microsoft/fast-dna/issues/687)) ([140457c](https://github.com/Microsoft/fast-dna/commit/140457c))
* **tslint:** fixes incorrect tslint rule regarding ordered imports ([#188](https://github.com/Microsoft/fast-dna/issues/188)) ([ebe0b30](https://github.com/Microsoft/fast-dna/commit/ebe0b30))


### Features

* **angular:** add preliminary JSS manager for angular ([#140](https://github.com/Microsoft/fast-dna/issues/140)) ([0799251](https://github.com/Microsoft/fast-dna/commit/0799251))
* **detail view:** add detail view ([#470](https://github.com/Microsoft/fast-dna/issues/470)) ([665b871](https://github.com/Microsoft/fast-dna/commit/665b871))
* **fast-css-editor-react:** add default editor component and position component ([#636](https://github.com/Microsoft/fast-dna/issues/636)) ([72037a8](https://github.com/Microsoft/fast-dna/commit/72037a8))
* **form generator:** updates styles found in configuration pane ([#420](https://github.com/Microsoft/fast-dna/issues/420)) ([919121b](https://github.com/Microsoft/fast-dna/commit/919121b))
* **Image:** add new component and msft styles ([#237](https://github.com/Microsoft/fast-dna/issues/237)) ([ea057ed](https://github.com/Microsoft/fast-dna/commit/ea057ed))
* **jss:** update manager to support function stylesheets ([#508](https://github.com/Microsoft/fast-dna/issues/508)) ([8e7c947](https://github.com/Microsoft/fast-dna/commit/8e7c947))
* **jss-manager:** update to enable server-side rendering of stylesheets. ([#516](https://github.com/Microsoft/fast-dna/issues/516)) ([a5072d0](https://github.com/Microsoft/fast-dna/commit/a5072d0))
* update to React 16.3 ([#251](https://github.com/Microsoft/fast-dna/issues/251)) ([1fe77ef](https://github.com/Microsoft/fast-dna/commit/1fe77ef))
* **jss-manager-react:** add stylesheet overrides as props ([#282](https://github.com/Microsoft/fast-dna/issues/282)) ([8610f35](https://github.com/Microsoft/fast-dna/commit/8610f35))
* **localization:** adds direction rtl/ltr updating ([#485](https://github.com/Microsoft/fast-dna/issues/485)) ([0a5e1e7](https://github.com/Microsoft/fast-dna/commit/0a5e1e7))
* **toggle:** add new component and msft styles ([#212](https://github.com/Microsoft/fast-dna/issues/212)) ([b9dd3e0](https://github.com/Microsoft/fast-dna/commit/b9dd3e0))
* add form generator to the packages ([#311](https://github.com/Microsoft/fast-dna/issues/311)) ([a339b3c](https://github.com/Microsoft/fast-dna/commit/a339b3c))
* add snapshot test suite ([#207](https://github.com/Microsoft/fast-dna/issues/207)) ([7ceaafe](https://github.com/Microsoft/fast-dna/commit/7ceaafe))
* catagorizing relevant dependencies as peerDependencies ([#186](https://github.com/Microsoft/fast-dna/issues/186)) ([7e15db6](https://github.com/Microsoft/fast-dna/commit/7e15db6))
* remove JSS manager dependency from React base components ([#148](https://github.com/Microsoft/fast-dna/issues/148)) ([48de34a](https://github.com/Microsoft/fast-dna/commit/48de34a))
* update code coverage on travis ([#330](https://github.com/Microsoft/fast-dna/issues/330)) ([63ab4f4](https://github.com/Microsoft/fast-dna/commit/63ab4f4))





<a name="2.1.0"></a>
# [2.1.0](https://github.com/Microsoft/fast-dna/compare/v2.0.0-corrected...v2.1.0) (2018-08-29)


### Features

* update Lerna to ^3.0.0 ([#795](https://github.com/Microsoft/fast-dna/issues/795)) ([9ce9a56](https://github.com/Microsoft/fast-dna/commit/9ce9a56))
* upgrade to TypeScript 3.0.0 ([#793](https://github.com/Microsoft/fast-dna/issues/793)) ([e203e86](https://github.com/Microsoft/fast-dna/commit/e203e86))
* **fast-components-react-base:** add callback to horizontal overflow to return and object that informs scroll start and end ([#797](https://github.com/Microsoft/fast-dna/issues/797)) ([37975f3](https://github.com/Microsoft/fast-dna/commit/37975f3))
* **paragraph:** adds paragraph as a new MSFT component ([#805](https://github.com/Microsoft/fast-dna/issues/805)) ([8325d3f](https://github.com/Microsoft/fast-dna/commit/8325d3f))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/Microsoft/fast-dna/compare/v1.6.0...v2.0.0) (2018-08-02)


### Bug Fixes

* **fast-components-react-msft:** fixes error running jest with components that require chroma ([#687](https://github.com/Microsoft/fast-dna/issues/687)) ([140457c](https://github.com/Microsoft/fast-dna/commit/140457c))


### Features

* **detail view:** add detail view ([#470](https://github.com/Microsoft/fast-dna/issues/470)) ([665b871](https://github.com/Microsoft/fast-dna/commit/665b871))
* **fast-css-editor-react:** add default editor component and position component ([#636](https://github.com/Microsoft/fast-dna/issues/636)) ([72037a8](https://github.com/Microsoft/fast-dna/commit/72037a8))
* **jss:** update manager to support function stylesheets ([#508](https://github.com/Microsoft/fast-dna/issues/508)) ([8e7c947](https://github.com/Microsoft/fast-dna/commit/8e7c947))
* **jss-manager:** update to enable server-side rendering of stylesheets. ([#516](https://github.com/Microsoft/fast-dna/issues/516)) ([a5072d0](https://github.com/Microsoft/fast-dna/commit/a5072d0))
* **localization:** adds direction rtl/ltr updating ([#485](https://github.com/Microsoft/fast-dna/issues/485)) ([0a5e1e7](https://github.com/Microsoft/fast-dna/commit/0a5e1e7))




<a name="1.9.0"></a>
# [1.9.0](https://github.com/Microsoft/fast-dna/compare/v1.6.0...v1.9.0) (2018-07-14)


### Bug Fixes

* **fast-components-react-msft:** fixes error running jest with components that require chroma ([#687](https://github.com/Microsoft/fast-dna/issues/687)) ([140457c](https://github.com/Microsoft/fast-dna/commit/140457c))


### Features

* **detail view:** add detail view ([#470](https://github.com/Microsoft/fast-dna/issues/470)) ([665b871](https://github.com/Microsoft/fast-dna/commit/665b871))
* **fast-css-editor-react:** add default editor component and position component ([#636](https://github.com/Microsoft/fast-dna/issues/636)) ([72037a8](https://github.com/Microsoft/fast-dna/commit/72037a8))
* **jss:** update manager to support function stylesheets ([#508](https://github.com/Microsoft/fast-dna/issues/508)) ([8e7c947](https://github.com/Microsoft/fast-dna/commit/8e7c947))
* **jss-manager:** update to enable server-side rendering of stylesheets. ([#516](https://github.com/Microsoft/fast-dna/issues/516)) ([a5072d0](https://github.com/Microsoft/fast-dna/commit/a5072d0))
* **localization:** adds direction rtl/ltr updating ([#485](https://github.com/Microsoft/fast-dna/issues/485)) ([0a5e1e7](https://github.com/Microsoft/fast-dna/commit/0a5e1e7))




<a name="1.8.0"></a>
# [1.8.0](https://github.com/Microsoft/fast-dna/compare/v1.6.0...v1.8.0) (2018-06-12)


### Features

* **jss:** update manager to support function stylesheets ([#508](https://github.com/Microsoft/fast-dna/issues/508)) ([8e7c947](https://github.com/Microsoft/fast-dna/commit/8e7c947))
* **jss-manager:** update to enable server-side rendering of stylesheets. ([#516](https://github.com/Microsoft/fast-dna/issues/516)) ([a5072d0](https://github.com/Microsoft/fast-dna/commit/a5072d0))




<a name="1.7.0"></a>
# [1.7.0](https://github.com/Microsoft/fast-dna/compare/v1.6.0...v1.7.0) (2018-06-01)


### Features

* **detail view:** add detail view ([#470](https://github.com/Microsoft/fast-dna/issues/470)) ([665b871](https://github.com/Microsoft/fast-dna/commit/665b871))
* **localization:** adds direction rtl/ltr updating ([#485](https://github.com/Microsoft/fast-dna/issues/485)) ([0a5e1e7](https://github.com/Microsoft/fast-dna/commit/0a5e1e7))




<a name="1.6.0"></a>
# [1.6.0](https://github.com/Microsoft/fast-dna/compare/v1.2.0...v1.6.0) (2018-05-16)




<a name="1.5.0"></a>
# [1.5.0](https://github.com/Microsoft/fast-dna/compare/v1.2.0...v1.5.0) (2018-05-16)


### Features

* **form generator:** updates styles found in configuration pane ([#420](https://github.com/Microsoft/fast-dna/issues/420)) ([919121b](https://github.com/Microsoft/fast-dna/commit/919121b))




<a name="1.4.0"></a>
# [1.4.0](https://github.com/Microsoft/fast-dna/compare/v1.2.0...v1.4.0) (2018-05-14)


### Features

* **form generator:** updates styles found in configuration pane ([#420](https://github.com/Microsoft/fast-dna/issues/420)) ([919121b](https://github.com/Microsoft/fast-dna/commit/919121b))




<a name="1.2.0"></a>
# 1.2.0 (2018-05-10)


<a name="1.1.0"></a>
# 1.1.0 (2018-05-09)


### Bug Fixes

* ensure app build and tslint processes run prior in the build gate ([#132](https://github.com/Microsoft/fast-dna/issues/132)) ([e74f953](https://github.com/Microsoft/fast-dna/commit/e74f953))
* **tslint:** fixes incorrect tslint rule regarding ordered imports ([#188](https://github.com/Microsoft/fast-dna/issues/188)) ([ebe0b30](https://github.com/Microsoft/fast-dna/commit/ebe0b30))
* fix tslint globbing issue and enforce whitespace in import/export statements ([#219](https://github.com/Microsoft/fast-dna/issues/219)) ([4637a90](https://github.com/Microsoft/fast-dna/commit/4637a90))
* travis-CI build-break ([#336](https://github.com/Microsoft/fast-dna/issues/336)) ([bffbf5e](https://github.com/Microsoft/fast-dna/commit/bffbf5e))


### Features

* **angular:** add preliminary JSS manager for angular ([#140](https://github.com/Microsoft/fast-dna/issues/140)) ([0799251](https://github.com/Microsoft/fast-dna/commit/0799251))
* **Image:** add new component and msft styles ([#237](https://github.com/Microsoft/fast-dna/issues/237)) ([ea057ed](https://github.com/Microsoft/fast-dna/commit/ea057ed))
* **jss-manager-react:** add stylesheet overrides as props ([#282](https://github.com/Microsoft/fast-dna/issues/282)) ([8610f35](https://github.com/Microsoft/fast-dna/commit/8610f35))
* **toggle:** add new component and msft styles ([#212](https://github.com/Microsoft/fast-dna/issues/212)) ([b9dd3e0](https://github.com/Microsoft/fast-dna/commit/b9dd3e0))
* add form generator to the packages ([#311](https://github.com/Microsoft/fast-dna/issues/311)) ([a339b3c](https://github.com/Microsoft/fast-dna/commit/a339b3c))
* add snapshot test suite ([#207](https://github.com/Microsoft/fast-dna/issues/207)) ([7ceaafe](https://github.com/Microsoft/fast-dna/commit/7ceaafe))
* catagorizing relevant dependencies as peerDependencies ([#186](https://github.com/Microsoft/fast-dna/issues/186)) ([7e15db6](https://github.com/Microsoft/fast-dna/commit/7e15db6))
* remove JSS manager dependency from React base components ([#148](https://github.com/Microsoft/fast-dna/issues/148)) ([48de34a](https://github.com/Microsoft/fast-dna/commit/48de34a))
* update code coverage on travis ([#330](https://github.com/Microsoft/fast-dna/issues/330)) ([63ab4f4](https://github.com/Microsoft/fast-dna/commit/63ab4f4))
* update to React 16.3 ([#251](https://github.com/Microsoft/fast-dna/issues/251)) ([1fe77ef](https://github.com/Microsoft/fast-dna/commit/1fe77ef))
