# Contributing

Contributions are welcome, but understand that this is a personal project largely maintained by one person. Low quality issues and pull requests can end up wasting a lot of my time as they cause me to chase non-existent issues or try to validate hard to read code. This is especially true for AI generated issues and pull requests, which I have seen an uptick of on my own repositories. While you are welcome to use AI tooling to aid your coding, fully AI generated "vibe coded" contributions are not welcome.

This project is largely feature complete, but that doesn't mean that there isn't room for improvement or new features. If there are new features you want to see added, you may want to create a feature request issue or discussion thread to discuss it first.

If you're adding new keys, sources, or icons, you can get away with skipping most of this guide. You should be able to test your new keys/sources/icons using the card's built in custom actions and icons functionality.

## Create a fork

First you'll need to fork this repository and then `git clone` that fork to your development machine. Navigate to the GitHub repository home page, click Fork, and follow the instructions there to create your own fork. Then use the `git clone` command to download the fork to your development machine.

If you have not used git or cloned a repository before, you may want to read through the [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

## Setup your cloned repository for development

This project is written in TypeScript and compiled into a minified JavaScript file for distribution via the Home Assistant Community Store, and requires a little bit of setup on your machine first.

Run `npm run setup` to configure the pre-commit githook build pipeline and install dependencies. Don't worry about the three severe vulnerabilities, they're in the build pipeline and not present in the distributed JavaScript file. If there's more than that then `npm audit fix` may need to be run.

## Developing

You're now ready to make your code changes. Do your best to follow the style and syntax of the existing code. Avoid changing any of the configuration files (eslint, prettier, tsconfig, webpack) if possible. Do not use `any` unless there's a good reason to do so, like a field that truly can be anything.

All actions that this card perform send commands to Home Assistant via service calls and do not interact with other devices directly. Interacting with devices on the network or external websites directly is anti-pattern and should be avoided, and changes that do so will be rejected.

All remote elements inherit from the `BaseRemoteElement` class found in `src/classes/base-remote-element.ts`, which contains shared logic for calling actions, managing element value, rendering shared child elements, and generic event handlers. Logic that affects all remote elements should go in this file, while logic that is more specific to certain components should go in their element classes.

Platforms default keys and sources are found in the `src/models/maps` folder, with a different folder for each platform. In order for any new platforms added here to be detected, they must also be added to the `getDefaultActions` function found in `src/utils/defaulAtActions.ts`. They should also be added to the platforms array and types in `src/models/interfaces/IActions.ts` and object found in `src/models/platforms.ts`.

If the Home Assistant default MDI icon set does not have an icon for a default source, its SVG path can be added to the `src/models/maps/defaultIcons.ts` file. Icons added to this file can then be referenced by name in default sources files. Default keys should always use Home Assistant default MDI icons.

## Building and testing

The pre-commit githook build pipeline you (should have) setup should compile the project into a minified JavaScript file whenever a commit is made. You can also run the build pipeline using the command `npm run build`. The compiled JavaScript module and a gzipped copy of it (which is ignored by git and is for local testing) can be found in the `dist` folder. This command assumes you have `gzip` installed.

To test your changes on your Home Assistant server, you must replace the `min.js` and `min.js.gz` files, clear cache, and refresh you browser. If installed via HACS, your custom frontend modules should be located at `config/www/community/universal-remote-card/`. Within that should be a folder for this project, and within that should be the `min.js` and `min.js.gz` files. Replace the files here with your updated copies and then clear cache and refresh your browser. To clear cache and refresh, open browser developer tools (`F12` or `CTRL` + `I`), right click the refresh button, and then click `Empty Cache and Hard Reload`.

You should now be able to test that your changes work! Try to test your changes on multiple different browsers or devices. I've run into a lot of issues with different browsers and mobile webviews behaving differently, especially iOS/iPadOS webview.

## The editor and documentation

This project features a UI editor for all fields. Any new fields added to the frontend configuration must be accessible from this editor (barring templating certain fields). This includes creating new sub-editors for new features. The editor is admittedly a huge mess that, and I'm open to doing this work if needed. The configuration editor already has helper methods for easily creating fields using the [`ha-selector`](https://github.com/home-assistant/frontend/blob/dev/src/data/selector.ts) component.

Any new features should be documented in the README. This does not include new default keys, sources, and icons.

## Make a pull request

Once you think your code is ready, make a pull request on the original repository! Make sure to use [the included PR template](https://github.com/Nerwyn/universal-remote-card/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request.md).
