# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="1.8.0"></a>
# [1.8.0](https://github.com/Microsoft/fast-dna/compare/v1.6.0...v1.8.0) (2018-06-12)


### Bug Fixes

* **fast-components-styles-msft:** remove duplicate code and creates a utility to apply mixed colors ([#500](https://github.com/Microsoft/fast-dna/issues/500)) ([179c584](https://github.com/Microsoft/fast-dna/commit/179c584))
* **fast-development-site:** fix a pathing issue between the detail and example pages ([#525](https://github.com/Microsoft/fast-dna/issues/525)) ([ef577c4](https://github.com/Microsoft/fast-dna/commit/ef577c4))
* **fast-development-site-react:** fix the selection model to always point to a component/item ([#522](https://github.com/Microsoft/fast-dna/issues/522)) ([608f548](https://github.com/Microsoft/fast-dna/commit/608f548))
* **hypertext:** fix hypertext style when no href value exists ([#499](https://github.com/Microsoft/fast-dna/issues/499)) ([cd5d3d2](https://github.com/Microsoft/fast-dna/commit/cd5d3d2))
* **permutator:** fix an issue where lodash was being referred to and not lodash-es ([#509](https://github.com/Microsoft/fast-dna/issues/509)) ([88f4b90](https://github.com/Microsoft/fast-dna/commit/88f4b90))


### Features

* **development-site:** add ability to have children as strings in the form generator and development site dev tools ([#518](https://github.com/Microsoft/fast-dna/issues/518)) ([2a4a87f](https://github.com/Microsoft/fast-dna/commit/2a4a87f))
* **development-site:** add component for title and component for title with brand color applied ([#501](https://github.com/Microsoft/fast-dna/issues/501)) ([d1d9d5c](https://github.com/Microsoft/fast-dna/commit/d1d9d5c))
* **fast-components-react-msft:** add localized styles and enable ltr/rtl swapping on documentation site ([#517](https://github.com/Microsoft/fast-dna/issues/517)) ([ce939b7](https://github.com/Microsoft/fast-dna/commit/ce939b7))
* **jss:** update manager to support function stylesheets ([#508](https://github.com/Microsoft/fast-dna/issues/508)) ([8e7c947](https://github.com/Microsoft/fast-dna/commit/8e7c947))
* **jss-manager:** update to enable server-side rendering of stylesheets. ([#516](https://github.com/Microsoft/fast-dna/issues/516)) ([a5072d0](https://github.com/Microsoft/fast-dna/commit/a5072d0))
* add sketch utility and design kit ([#495](https://github.com/Microsoft/fast-dna/issues/495)) ([ce8feb3](https://github.com/Microsoft/fast-dna/commit/ce8feb3))




<a name="1.7.0"></a>
# [1.7.0](https://github.com/Microsoft/fast-dna/compare/v1.6.0...v1.7.0) (2018-06-01)


### Bug Fixes

* **checkbox:** fix broken indeterminate state UI in Firefox ([#489](https://github.com/Microsoft/fast-dna/issues/489)) ([dd55c0c](https://github.com/Microsoft/fast-dna/commit/dd55c0c))
* **dev-site:** fixes html5 validation issues with dev site markup ([#463](https://github.com/Microsoft/fast-dna/issues/463)) ([c171e79](https://github.com/Microsoft/fast-dna/commit/c171e79))
* **image:** fix incorrect data causing error in srcSet 'w' value ([#422](https://github.com/Microsoft/fast-dna/issues/422)) ([cb8646e](https://github.com/Microsoft/fast-dna/commit/cb8646e))


### Features

* **detail view:** add detail view ([#470](https://github.com/Microsoft/fast-dna/issues/470)) ([665b871](https://github.com/Microsoft/fast-dna/commit/665b871))
* **dev-site:** adds error boundary to dev site component wrapper to prevent entire views from breaking ([#438](https://github.com/Microsoft/fast-dna/issues/438)) ([54918b9](https://github.com/Microsoft/fast-dna/commit/54918b9))
* **form generator:** add focus/hover states ([#449](https://github.com/Microsoft/fast-dna/issues/449)) ([4dbe9a3](https://github.com/Microsoft/fast-dna/commit/4dbe9a3))
* **layouts:** add page, grid, and column layout configuration ([#471](https://github.com/Microsoft/fast-dna/issues/471)) ([97830fb](https://github.com/Microsoft/fast-dna/commit/97830fb))
* **layouts:** create configurable breakpoint tracker utility ([#467](https://github.com/Microsoft/fast-dna/issues/467)) ([4b1ed8a](https://github.com/Microsoft/fast-dna/commit/4b1ed8a))
* **localization:** adds direction rtl/ltr updating ([#485](https://github.com/Microsoft/fast-dna/issues/485)) ([0a5e1e7](https://github.com/Microsoft/fast-dna/commit/0a5e1e7))
* **schema:** add schema view to dev tools ([#448](https://github.com/Microsoft/fast-dna/issues/448)) ([681585d](https://github.com/Microsoft/fast-dna/commit/681585d))
* **shell:** add shell package with app-grid ([#461](https://github.com/Microsoft/fast-dna/issues/461)) ([dabb3b4](https://github.com/Microsoft/fast-dna/commit/dabb3b4))




<a name="1.6.0"></a>
# [1.6.0](https://github.com/Microsoft/fast-dna/compare/v1.2.0...v1.6.0) (2018-05-16)


### Bug Fixes

* **svg:** fix some malformed SVG icons ([#434](https://github.com/Microsoft/fast-dna/issues/434)) ([002dbd4](https://github.com/Microsoft/fast-dna/commit/002dbd4))




<a name="1.5.0"></a>
# [1.5.0](https://github.com/Microsoft/fast-dna/compare/v1.2.0...v1.5.0) (2018-05-16)


### Bug Fixes

* **button:** fixes an issue where href was not being passed as part of the created anchor element ([#411](https://github.com/Microsoft/fast-dna/issues/411)) ([35928e1](https://github.com/Microsoft/fast-dna/commit/35928e1))
* **development-site:** update styling ([#416](https://github.com/Microsoft/fast-dna/issues/416)) ([97ac11a](https://github.com/Microsoft/fast-dna/commit/97ac11a))
* **form generator:** fixes drag and drop, updates styles and shape ([#426](https://github.com/Microsoft/fast-dna/issues/426)) ([b5013a8](https://github.com/Microsoft/fast-dna/commit/b5013a8))
* **jss:** fix errors caused by un-linked JSS rules ([#409](https://github.com/Microsoft/fast-dna/issues/409)) ([c9c4a9c](https://github.com/Microsoft/fast-dna/commit/c9c4a9c))


### Features

* **code-preview:** add react code preview ([#399](https://github.com/Microsoft/fast-dna/issues/399)) ([fee05e7](https://github.com/Microsoft/fast-dna/commit/fee05e7))
* **form generator:** add SVGs, additional JSS, and general examples ([#418](https://github.com/Microsoft/fast-dna/issues/418)) ([86f36df](https://github.com/Microsoft/fast-dna/commit/86f36df))
* **form generator:** updates styles found in configuration pane ([#420](https://github.com/Microsoft/fast-dna/issues/420)) ([919121b](https://github.com/Microsoft/fast-dna/commit/919121b))




<a name="1.4.0"></a>
# [1.4.0](https://github.com/Microsoft/fast-dna/compare/v1.2.0...v1.4.0) (2018-05-14)


### Bug Fixes

* **button:** fixes an issue where href was not being passed as part of the created anchor element ([#411](https://github.com/Microsoft/fast-dna/issues/411)) ([35928e1](https://github.com/Microsoft/fast-dna/commit/35928e1))
* **development-site:** update styling ([#416](https://github.com/Microsoft/fast-dna/issues/416)) ([97ac11a](https://github.com/Microsoft/fast-dna/commit/97ac11a))
* **jss:** fix errors caused by un-linked JSS rules ([#409](https://github.com/Microsoft/fast-dna/issues/409)) ([c9c4a9c](https://github.com/Microsoft/fast-dna/commit/c9c4a9c))


### Features

* **code-preview:** add react code preview ([#399](https://github.com/Microsoft/fast-dna/issues/399)) ([fee05e7](https://github.com/Microsoft/fast-dna/commit/fee05e7))
* **form generator:** add SVGs, additional JSS, and general examples ([#418](https://github.com/Microsoft/fast-dna/issues/418)) ([86f36df](https://github.com/Microsoft/fast-dna/commit/86f36df))
* **form generator:** updates styles found in configuration pane ([#420](https://github.com/Microsoft/fast-dna/issues/420)) ([919121b](https://github.com/Microsoft/fast-dna/commit/919121b))




<a name="1.3.0"></a>
# [1.3.0](https://github.com/Microsoft/fast-dna/compare/v1.2.0...v1.3.0) (2018-05-11)


### Bug Fixes

* **button:** fixes an issue where href was not being passed as part of the created anchor element ([#411](https://github.com/Microsoft/fast-dna/issues/411)) ([35928e1](https://github.com/Microsoft/fast-dna/commit/35928e1))
* **jss:** fix errors caused by un-linked JSS rules ([#409](https://github.com/Microsoft/fast-dna/issues/409)) ([c9c4a9c](https://github.com/Microsoft/fast-dna/commit/c9c4a9c))


### Features

* **code-preview:** add react code preview ([#399](https://github.com/Microsoft/fast-dna/issues/399)) ([fee05e7](https://github.com/Microsoft/fast-dna/commit/fee05e7))




<a name="1.2.0"></a>
# 1.2.0 (2018-05-10)

* **typography:** fixes an issue where typography was not being exported ([#405](https://github.com/Microsoft/fast-dna/issues/405)) ([3079eab](https://github.com/Microsoft/fast-dna/commit/3079eab))

### Features

* **checkbox:** update styling and incorrect states ([#371](https://github.com/Microsoft/fast-dna/issues/371)) ([45cbe3c](https://github.com/Microsoft/fast-dna/commit/45cbe3c))




<a name="1.1.0"></a>
# 1.1.0 (2018-05-09)


### Bug Fixes

* **naming:** fix component names to align to repo standard ([#202](https://github.com/Microsoft/fast-dna/issues/202)) ([298836e](https://github.com/Microsoft/fast-dna/commit/298836e))
* corrects typing of ICSS rules ([#15](https://github.com/Microsoft/fast-dna/issues/15)) ([44dc167](https://github.com/Microsoft/fast-dna/commit/44dc167))
* **animation:** refactor animate sequence and group to remove code duplication ([#325](https://github.com/Microsoft/fast-dna/issues/325)) ([2beeb98](https://github.com/Microsoft/fast-dna/commit/2beeb98))
* **build:** fixes an issue where npm install was failing due to mismatched package dependency versions ([#21](https://github.com/Microsoft/fast-dna/issues/21)) ([1dda250](https://github.com/Microsoft/fast-dna/commit/1dda250))
* **button:** fixes button import which caused issues using the framework outside the monorepository ([#377](https://github.com/Microsoft/fast-dna/issues/377)) ([e39c178](https://github.com/Microsoft/fast-dna/commit/e39c178))
* **dev-site:** add design system provider to component example factory ([#359](https://github.com/Microsoft/fast-dna/issues/359)) ([7f01fd5](https://github.com/Microsoft/fast-dna/commit/7f01fd5))
* **package:** rename fast-development-site to fast-react-development-site ([#115](https://github.com/Microsoft/fast-dna/issues/115)) ([196d6bb](https://github.com/Microsoft/fast-dna/commit/196d6bb))
* **package:** rename fast-react-components-fluent to fast-react-components-msft ([#117](https://github.com/Microsoft/fast-dna/issues/117)) ([c0e735a](https://github.com/Microsoft/fast-dna/commit/c0e735a))
* **permutator:** fix duplicate code for handling required and optional data ([#323](https://github.com/Microsoft/fast-dna/issues/323)) ([e5817dc](https://github.com/Microsoft/fast-dna/commit/e5817dc))
* **permutator:** refactor repeated code to check if a location is recursive into a new utility ([#327](https://github.com/Microsoft/fast-dna/issues/327)) ([4e5e093](https://github.com/Microsoft/fast-dna/commit/4e5e093))
* **tests:** fix polymer issue during lerna run test ([#261](https://github.com/Microsoft/fast-dna/issues/261)) ([1142a6a](https://github.com/Microsoft/fast-dna/commit/1142a6a))
* **tslint:** fix tslint errors ([#114](https://github.com/Microsoft/fast-dna/issues/114)) ([78fea3e](https://github.com/Microsoft/fast-dna/commit/78fea3e))
* **tslint:** fixes incorrect tslint rule regarding ordered imports ([#188](https://github.com/Microsoft/fast-dna/issues/188)) ([ebe0b30](https://github.com/Microsoft/fast-dna/commit/ebe0b30))
* ensure app build and tslint processes run prior in the build gate ([#132](https://github.com/Microsoft/fast-dna/issues/132)) ([e74f953](https://github.com/Microsoft/fast-dna/commit/e74f953))
* fix tslint globbing issue and enforce whitespace in import/export statements ([#219](https://github.com/Microsoft/fast-dna/issues/219)) ([4637a90](https://github.com/Microsoft/fast-dna/commit/4637a90))
* travis-CI build-break ([#336](https://github.com/Microsoft/fast-dna/issues/336)) ([bffbf5e](https://github.com/Microsoft/fast-dna/commit/bffbf5e))


### Features

* add color utility package ([#138](https://github.com/Microsoft/fast-dna/issues/138)) ([f666c23](https://github.com/Microsoft/fast-dna/commit/f666c23))
* add divider component ([#205](https://github.com/Microsoft/fast-dna/issues/205)) ([ae25c38](https://github.com/Microsoft/fast-dna/commit/ae25c38))
* add form generator to the packages ([#311](https://github.com/Microsoft/fast-dna/issues/311)) ([a339b3c](https://github.com/Microsoft/fast-dna/commit/a339b3c))
* add hypertext component ([#210](https://github.com/Microsoft/fast-dna/issues/210)) ([9e363ff](https://github.com/Microsoft/fast-dna/commit/9e363ff))
* add snapshot test suite ([#207](https://github.com/Microsoft/fast-dna/issues/207)) ([7ceaafe](https://github.com/Microsoft/fast-dna/commit/7ceaafe))
* add tabbed navigation for development site ([#343](https://github.com/Microsoft/fast-dna/issues/343)) ([dcab3bc](https://github.com/Microsoft/fast-dna/commit/dcab3bc))
* adds button boilerplate ([#11](https://github.com/Microsoft/fast-dna/issues/11)) ([5048f41](https://github.com/Microsoft/fast-dna/commit/5048f41))
* adds fast-development-site for testing component libraries ([#7](https://github.com/Microsoft/fast-dna/issues/7)) ([53ce962](https://github.com/Microsoft/fast-dna/commit/53ce962))
* adds fast-react-component-base directory ([#10](https://github.com/Microsoft/fast-dna/issues/10)) ([c4a2acb](https://github.com/Microsoft/fast-dna/commit/c4a2acb))
* **typography:** add typography as a new base component and style ([#247](https://github.com/Microsoft/fast-dna/issues/247)) ([df3804e](https://github.com/Microsoft/fast-dna/commit/df3804e))
* adds fast-react-jss-manager project ([#2](https://github.com/Microsoft/fast-dna/issues/2)) ([e70acfd](https://github.com/Microsoft/fast-dna/commit/e70acfd))
* **angular:** add preliminary JSS manager for angular ([#140](https://github.com/Microsoft/fast-dna/issues/140)) ([0799251](https://github.com/Microsoft/fast-dna/commit/0799251))
* **build:** add development site and automated example path generation ([#98](https://github.com/Microsoft/fast-dna/issues/98)) ([1c7e7d4](https://github.com/Microsoft/fast-dna/commit/1c7e7d4))
* **build:** add development site to fast react components fluent ([#101](https://github.com/Microsoft/fast-dna/issues/101)) ([951f894](https://github.com/Microsoft/fast-dna/commit/951f894))
* **button:** allows button to be rendered as an HTML button or an anchor element ([#93](https://github.com/Microsoft/fast-dna/issues/93)) ([96db63d](https://github.com/Microsoft/fast-dna/commit/96db63d))
* **button:** updates to current msft styles ([#314](https://github.com/Microsoft/fast-dna/issues/314)) ([0029e06](https://github.com/Microsoft/fast-dna/commit/0029e06))
* **checkbox:** add new component with styles ([#252](https://github.com/Microsoft/fast-dna/issues/252)) ([3ad3988](https://github.com/Microsoft/fast-dna/commit/3ad3988))
* **development site:** update the styling to reflect the new comps ([#275](https://github.com/Microsoft/fast-dna/issues/275)) ([e4c5609](https://github.com/Microsoft/fast-dna/commit/e4c5609))
* update code coverage on travis ([#330](https://github.com/Microsoft/fast-dna/issues/330)) ([63ab4f4](https://github.com/Microsoft/fast-dna/commit/63ab4f4))
* **docs:** add development site tools panel ([#383](https://github.com/Microsoft/fast-dna/issues/383)) ([86b491a](https://github.com/Microsoft/fast-dna/commit/86b491a))
* **fluent:** adds fluent breakpoints and typographic ramp for heading, subheading, paragraph and caption ([#110](https://github.com/Microsoft/fast-dna/issues/110)) ([8450514](https://github.com/Microsoft/fast-dna/commit/8450514))
* **form:** add the form generator to the development site ([#362](https://github.com/Microsoft/fast-dna/issues/362)) ([b4c97bf](https://github.com/Microsoft/fast-dna/commit/b4c97bf))
* **form generator:** adds JSS ([#392](https://github.com/Microsoft/fast-dna/issues/392)) ([aee1084](https://github.com/Microsoft/fast-dna/commit/aee1084))
* **form generator:** adds styling scaffolding and JSS for select ([#363](https://github.com/Microsoft/fast-dna/issues/363)) ([4aeef73](https://github.com/Microsoft/fast-dna/commit/4aeef73))
* **Foundation:** adds base functionality to Foundation component ([#23](https://github.com/Microsoft/fast-dna/issues/23)) ([d4e1685](https://github.com/Microsoft/fast-dna/commit/d4e1685))
* update utility to include localized spacing and direction ([#308](https://github.com/Microsoft/fast-dna/issues/308)) ([e45ea1a](https://github.com/Microsoft/fast-dna/commit/e45ea1a))
* **heading:** add heading as a new msft component ([#280](https://github.com/Microsoft/fast-dna/issues/280)) ([b7ee1ab](https://github.com/Microsoft/fast-dna/commit/b7ee1ab))
* **hypertext:** remove code duplication in hypertext styles ([#321](https://github.com/Microsoft/fast-dna/issues/321)) ([911572f](https://github.com/Microsoft/fast-dna/commit/911572f))
* **Image:** add new component and msft styles ([#237](https://github.com/Microsoft/fast-dna/issues/237)) ([ea057ed](https://github.com/Microsoft/fast-dna/commit/ea057ed))
* **jss-manager-react:** add stylesheet overrides as props ([#282](https://github.com/Microsoft/fast-dna/issues/282)) ([8610f35](https://github.com/Microsoft/fast-dna/commit/8610f35))
* **label:** add new component and msft styles ([#265](https://github.com/Microsoft/fast-dna/issues/265)) ([0328028](https://github.com/Microsoft/fast-dna/commit/0328028))
* **markdown:** add utility to convert markdown to msft component strings ([#346](https://github.com/Microsoft/fast-dna/issues/346)) ([67bca5f](https://github.com/Microsoft/fast-dna/commit/67bca5f))
* **packages:** adds the data permutator, react viewer and browser extensions packages ([#51](https://github.com/Microsoft/fast-dna/issues/51)) ([f5268b8](https://github.com/Microsoft/fast-dna/commit/f5268b8))
* **structure:** updates the structure for the development site ([#217](https://github.com/Microsoft/fast-dna/issues/217)) ([e153b0b](https://github.com/Microsoft/fast-dna/commit/e153b0b))
* **toggle:** add new component and msft styles ([#212](https://github.com/Microsoft/fast-dna/issues/212)) ([b9dd3e0](https://github.com/Microsoft/fast-dna/commit/b9dd3e0))
* **utilities:** add package for jss utilities ([#286](https://github.com/Microsoft/fast-dna/issues/286)) ([e1e9caf](https://github.com/Microsoft/fast-dna/commit/e1e9caf))
* catagorizing relevant dependencies as peerDependencies ([#186](https://github.com/Microsoft/fast-dna/issues/186)) ([7e15db6](https://github.com/Microsoft/fast-dna/commit/7e15db6))
* Forked Class name contracts so we can have one for Base and one for MSFT ([#262](https://github.com/Microsoft/fast-dna/issues/262)) ([a4c54c0](https://github.com/Microsoft/fast-dna/commit/a4c54c0))
* remove JSS manager dependency from React base components ([#148](https://github.com/Microsoft/fast-dna/issues/148)) ([48de34a](https://github.com/Microsoft/fast-dna/commit/48de34a))
* update to React 16.3 ([#251](https://github.com/Microsoft/fast-dna/issues/251)) ([1fe77ef](https://github.com/Microsoft/fast-dna/commit/1fe77ef))




<a name="1.0.0"></a>
# 1.0.0 (2018-03-08)


### Bug Fixes

* corrects typing of ICSS rules ([#15](https://github.com/Microsoft/fast-dna/issues/15)) ([44dc167](https://github.com/Microsoft/fast-dna/commit/44dc167))


### Features

* adds button boilerplate ([#11](https://github.com/Microsoft/fast-dna/issues/11)) ([5048f41](https://github.com/Microsoft/fast-dna/commit/5048f41))
* adds fast-development-site for testing component libraries ([#7](https://github.com/Microsoft/fast-dna/issues/7)) ([53ce962](https://github.com/Microsoft/fast-dna/commit/53ce962))
* adds fast-react-component-base directory ([#10](https://github.com/Microsoft/fast-dna/issues/10)) ([c4a2acb](https://github.com/Microsoft/fast-dna/commit/c4a2acb))
* adds fast-react-jss-manager project ([#2](https://github.com/Microsoft/fast-dna/issues/2)) ([e70acfd](https://github.com/Microsoft/fast-dna/commit/e70acfd))
