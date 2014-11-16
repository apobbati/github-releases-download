# Overview

This is the source to a small hosted service that will return a client-side redirect to the latest Github release link download for any public Github project.

# Running it
It is a regular Express web application that can be launched by running `node app.js`

# Usage:

`/gh-releases/:user/:project/:version/:assetName`

If you are running locally, you can execute:

`curl http://localhost:3000/gh-releases/GoogleCloudPlatform/kubernetes/latest/kubernetes.tar.gz`
