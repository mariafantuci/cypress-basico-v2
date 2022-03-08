# cypress

Sample project to demonstrate a `cypress` testing commands.

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I used versions `v16.13.0` and `8.1.0` of Node.js and npm, respectively. I suggest you use the same or later versions.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests
> Run `npm run test` (or `npm t` for the short version) to run the test in headless mode.
> Run `npm run test-mobile` (or `npm t` for the short version) to run the test in headless mode.

> Run `npm run cy:open-mobile` to open Cypress in interactive mode (mobile viewport).
> Run `npm run cy:open` to open Cypress in interactive mode (desktop viewport).

> **Note:** After running the dependencies, copy these lines in the cypress.json file
{
  "pluginsFile": false,
  "viewportHeight": 880,
  "viewportWidth": 1280
}