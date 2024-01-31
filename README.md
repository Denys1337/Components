# Vue Components

##### TLDR

[Showcase](https://developers.gitlab.agritask.xyz/vue-components).

[Storybook](https://developers.gitlab.agritask.xyz/vue-components/storybook/index.html).

### Commands

- `yarn serve:showcase` - serve showcase site
- `yarn storybook` - serve storybook
- `yarn build:publish` - building entire project for deployment (used in git's pipeline)
- `yarn test:unit` - running unit tests (also `yarn test:unit:silent`)

### Importing from vue-components:

- import Vue component: `import { AtButton } from '@agritask/vue-components';`
- import Vue hooks: `import { useFieldUtilities } from '@agritask/vue-components/hooks';`
- import style values for JS: `import { colors } from '@agritask/vue-components/styleJS';`
- import JS utility functions: `import { getTranslators } from '@agritask/vue-components/utils';`

# Description

Vue components is a library for the consumption of Agritask's Vue application.
it contains:

1. Basic Vue components - reuseable and consistent if Agritask brand and design
1. CSS with Declaration matching agritask's branding
1. few JS utility functions that require Vue in roder to work (other JS utilities have a dedicated [js-util library](https://gitlab.agritask.xyz/developers/js-utils))

# Setting up

1. set up git hooks go to project's root directory run: `git config core.hooksPath git_hooks/`
1. run: `yarn install` to install packages
1. make sure everything is working. run `yarn build:showcase` and double click [This file](./public/index.html) to see the showcase app. also click the "storybook" link to see storybook.

# Development

All changes should be done on a 'feature' branch (usually branching out of 'dev').

Run showcase locally: `yarn serve:showcase`.
will open the compiled showcase app in browser automatically in address: `http://localhost:5020`. if the site not loaded - try to refresh the page.

When ready to be tested on another consumer project (Food & beverage / Insurance), a [feature version should be create](https://gitlab.agritask.xyz/developers/vue-components#publish-a-feature-to-npm-registry).

changes in code will be updated but the showcase page **required to be refreshed manually**.

for opening storybook, run `yarn storybook`.

## Vue components/hooks/utils development

- Creating a new Vue component (in `./src/js/vue/...`), make sure to `import` & `export` it in `src/index.ts` file.
- Creating a new hook (in `./src/js/vue/hooks/...`) - make sure to `import` & `export` it in `src/hooks.ts`
- Creating a new util file (in `./src/js/vue/utils/...`) - make sure to `import` & `export` it in `src/utils.ts`
  Please keep the order of imports and exports Alphabetically correct

## CSS visualizers

### Grouping CSS by using title.

A title is a comment followed by 4 dashs:

```
//---- this is a title
```

A group can have a config declaration for controlling details of how the CSS variables should be handled in the "showcase":

```
//---- this is a title {"component": "FontVarVisualizer", "property": "line-height", "collapsed": true}
```

- **component** - which visualizer show display the value: `"SizeVisualizer"`, `"FontVarVisualizer"` or `"ColorVisualizer"`.
- **property** - when adding a CSS var to the shopping cart, which property should be assigned to it (examples: "line-height", "width", etc...)
- **collapsed** - when `true`, the group is closed. when `false` it's open and with value `"disabled"` it cannot be toggled by the UI.
- **deprecated** - when `true` the group's title has a stroke over the text.
- **highlight** - when `true`, the group's title is highlighted.

see examples in file `_typo_root.scss` and it's [showcase](https://developers.gitlab.agritask.xyz/vue-components/#/vars/text-utilities)

# Showcase

[Showcase link](https://developers.gitlab.agritask.xyz/vue-components)
every update to 'dev' branch produces showcase pages consisting of:

1. a web app displaying branding values like colors and gaps
1. a showcase application displaying various compositions of Vue components
1. Storybook app displaying Vue components

# Build process

The build pipeline is comprised of 2 persistant branchs: `dev` and `release`:

- **dev** - where all feature/fix branches must merge in order to have their code pushed to production eventually.
  when a change to dev is pushed, a showcase pages are generated to be reviewed by designer / QA.
- **release** - only merge request from branch `dev` can be merged to `release`. once such a push is merged successfully, the GitLab CI/CD pipeline will call `npm publish` so the changes are deployed as a new version.

Beside the persistant branches, every feature/fix should have it's own branch, that once ready for review and QA, it should be merged to `dev`.

Every merge requests runs unit tests (`yarn test:unit:silent`), also `git push` runs local unit tests before finalizing the push.

# Deployment TLDR

For safe and successful deployment of changes follow these steps:

1. Create a merge request to `dev` from your feature branch and get it code reviewed
1. Once approved, merge it. if QA or designer approval is needed to validate the changes, they can enter [showcase](https://developers.gitlab.agritask.xyz/vue-components) or [storybook](https://developers.gitlab.agritask.xyz/vue-components/storybook/) which are always up to date with `dev` (after `pages` job is done in [ci/cd jobs](https://gitlab.agritask.xyz/developers/vue-components/-/jobs)).
1. Once all changes in `dev` are approved to be published they can be merged - using merge request from `dev` to `release`, but first make sure the package `version` in `dev` is higher than the latest published version:
   1. Run `npm show @agritask/vue-components` and under `dist-tags` -> `latest` the published version will be displayed.
   1. If `version` in `package.json` in `dev` branch is not higher, change it and push the change to `dev`
1. Ask a maintainer to merge the request to `release`
1. After `publish` [job](<(https://gitlab.agritask.xyz/developers/vue-components/-/jobs)>) is done new release version is published on the NPM regisry. the latest version can be seen in `npm show @agritask/vue-components`.
1. now the new version of the package can be `yarn add`ed to any project.

## Versioning

- changes to `release` branch will publish a new version to NPM.
- before pushing to `release` from `dev` - make sure the **version** in the `package.json` is new (doesn't matter if major, minor or patch). if package version was already registered before, the merge request to `release` will fail.
- to view existing package versions see [Viewing existing versions on registery](https://gitlab.agritask.xyz/developers/vue-components#viewing-existing-versions-on-registery)
- the new version can be `yarn add`ed into any project.

### Failed merge request to "release"

when a merge request fails due the version already exists, on the merge page you will see a message like "Detached merge request pipeline #56402 failed for cdaa74bf 2 minutes ago". by clicking the pipeline number and then entering the job you will see a comment like:

```
Version 0.4.7 of @agritask/vue-components has already been published, so no new version has been published.
Cleaning up project directory and file based variables
00:01
ERROR: Job failed: exit code 1
```

this can be easily fixed by edinting the `package.json` file in the `dev` branch, changing the "version" property and restart the Merge Request.

### Viewing existing versions on registery

To see all existing versions of vue-components library are registered use the following command:

`npm show @agritask/vue-components versions`

To see latest `release`, `feature` and `hotfix` versions (with other details):

`npm show @agritask/vue-components`

## Publish a feature to NPM registry

Sometimes, you would like to publish to NPM package version from a specific branch for testing the package in some consumer project (not relevant to `release` which publish automatically).

For example, you create or update a component and wants to test it in F&B, before merging the changes to `dev`.
you can now publish it as a feature to the NPM registry and in F&B you `yarn add` the new version and test it and even publish it to a FT server.

How to publish a feature:

1. Save all changes to a branch and push it to Git's server.
1. Go to `Repository` -> `Tags`
1. Click 'new Tag' button.
1. In the 'Tag name' enter the npm package version, dash, and a short description (up to 20 letter) using only a-z characters and 0-9 number. example: "1.2.3-bigbutton5". (should pass regex `^[0-9]+\.[0-9]+\.[0-9]+\-([a-z0-9]{1,20})$`). **but it must NOT end with '-delete'**.
1. In 'Create from' select your branch.
1. In 'Message' add a description.
1. If the 'Tag name' is good, a new Job "publish from tag" will be created and once the job is completed a new package will be published (go to `CI/CD` -> `Jobs`)
1. Using `npm show @agritask/vue-components` in tag 'feature' the new version should be available to be `yarn add` or `npm install`
1. Once the feature is not needed anymore, delete it be creating a new tag by creating a tag with the same name + '-delete'. see next section for more details.

## Deleting a feature

After a published feature is no longer needed, it is required to delete the Git Tag and unpublish the version from the NPM registry.

this is done by simply creating a new Tag with the same name is the Tag we wish to remove suffixed with `-delete`. for example:

for removing tag `0.4.6-myinput` you should create a tag named `0.4.6-myinput-delete`.

\* release and hotfix versions cannot be deleted.

## Hotfix of specific release version

Sometimes we will need to push a fix or other update to a specific version of release.

For example, F&B's production could use an outdated release version of `vue-components` and the vue-components pipeline have accumulated weeks of changes, so just pushing an update to release from `dev` is too dangerous.

the solution, publish a hotfix to the NPM registry of a specific release tag. here are the steps:

1. checkout to the specific tag matching the vue-components's release version used in F&B release: `git checkout tags/<tagname> -b <branchname>`. to find the correct tag, go to Repository -> Tags and find the matching tag.
1. in `package.json` add to the existing `version` with `-hotfix.[0-9]+` as a suffix. so version `1.2.3` will become `1.2.3-hotfix.0` (if version `1.2.3-hotfix.0` already exists (use `npm show @agritask/vue-components versions` or see in the existing git tags), bump it to `1.2.3-hotfix.1` and so on).
1. the version name should match this regex: `^[0-9]+\.[0-9]+\.[0-9]+\-(hotfix)\.[0-9]+$`.
1. make the required changes in the code or make a cherry pick if possible.
1. push the the server - Don't merge to `release`
1. create a new tag in gitlab with a name matching the npm version exactly (example: `1.2.3-hotfix.1`). if the names do not match, the pipeline will fail with a message.
1. once the ci job is done, using `npm show @agritask/vue-components` should display the new version in the `hotfix` tag.

notice, publishing an hotfix can be done using any branch, not just release, but it is discouraged.
