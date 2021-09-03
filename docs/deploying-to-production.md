## Deploying to production

All you need to do is produce a docker image of your app.

You can use the command `make build-full` or do that manually.

It creates an optimized docker image that includes a _Caddy_ webserver to serve the application files.

If you don't need to produce a docker image simply run `yarn build`.


