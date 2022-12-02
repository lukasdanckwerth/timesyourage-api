# TimesYourAge Server [![Docker Build](https://github.com/lukasdanckwerth/timesyourage-api/actions/workflows/docker-build.yml/badge.svg)](https://github.com/lukasdanckwerth/timesyourage-api/actions/workflows/docker-build.yml) [![Docker Publish](https://github.com/lukasdanckwerth/timesyourage-api/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/lukasdanckwerth/timesyourage-api/actions/workflows/docker-publish.yml)

- [TimesYourAge Server  ](#timesyourage-server--)
  - [Installation](#installation)
  - [Update Wikipedia data](#update-wikipedia-data)
  - [Routes](#routes)
    - [`/`](#)
    - [`/birthday`](#birthday)
    - [`/birthdays`](#birthdays)

## Installation

```bash
# install dependencies
npm install

# for development (with hot-reloading) run
npm run serve:watch

# for production run
npm run serve
```

## Update Wikipedia data

To update the birthdays from Wikipedia run the following command. The languages are taken from the `language` property in the [`package.json`](package.json).

```bash
node scripts/grab-wikipedia.js
```

## Routes

### `/`

Returns information about the server.

### `/birthday`

Returns one random birthday.

| Parameter  | Description                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| `date`     | Date in the format `YYYY-MM-DD`. If none is specified it will fallback to current date of the server. |
| `language` | The language to return eg. `"de"`. If none is specified it will fallback to `"en"`.                   |

### `/birthdays`

Returns a collection of birthdays.

| Parameter  | Description                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| `date`     | Date in the format `YYYY-MM-DD`. If none is specified it will fallback to current date of the server. |
| `language` | The language to return eg. `"de"`. If none is specified it will fallback to `"en"`.                   |
| `limit`    | The limit of birthdays to return. Defatults to `20`.                                                  |
