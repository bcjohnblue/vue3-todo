![validation status](https://github.com/bcjohnblue/vue3-todo/actions/workflows/validate.yml/badge.svg)

# Vue 3 Todo List

## Getting started

- Install [node 18](https://nodejs.org/en/download/)
- Run `npm i` in the root dir to install all dependencies
- Run `npm run dev` to start the local server

## Commands

- `npm run dev`
  - Starts the local dev Vite server
- `npm run build`
  - Generates a production build for deployment
- `npm run test`
  - Runs all unit tests in `test/unit` (uses **vitest**)
- `npm run coverage`
  - Runs all unit tests in `test/unit` with coverage reports (uses **vitest**)

## Structure
```
src
├── components     register global components
├── db             connect with indexDB
├── interfaces     type declaration
├── router         router
├── styles         font, css, etc.
└── views          pages
test
├── e2e            e2e test cases 
└── unit           unit test cases
```

## Acknowledge

This repo is build from [vue-vite-tw-ts](https://github.com/ChronosMasterOfAllTime/vue-vite-tw-ts)
