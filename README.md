# HTN-2021

## Initial Setup

1. Ensure `node` and `npm` are installed
1. `npm install`
1. Install recommended VSCode plugins (if VSCode doesn't prompt you, find them in `.vscode/extensions.json`)

## Initial Google Cloud Setup

1. Install using these instructions: https://cloud.google.com/sdk/docs/quickstart
1. Set `$GOOGLE_APPLICATION_CREDENTIALS` and run `gcloud auth login` and follow the instructions
1. Set `$DATABASE_URL` to connect to the database
1. `gcloud config set project [Project ID]`

## Running locally

1. `npm start`

## Building and deploying

1. `npm run build`
1. `npm run deploy`
