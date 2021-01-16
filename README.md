# HTN-2021

## Initial Setup

1. Ensure `node` and `npm` are installed
1. `npm install`

## Initial Google Cloud Setup

1. Install using these instructions: https://cloud.google.com/sdk/docs/quickstart
1. `gcloud auth login` and follow the instructions
1. `gcloud config set project [Project ID]`

## Running locally

1. `npm start`

## Building and deploying

1. `npm run build`
1. `gcloud app deploy server/`
