# Datasource fixtures

The file mockingbird-schema.json is a schema for generating fake data using the Mockingbird CLI.

The command I'm currently using to generate the data is:

```
./mockingbird/apps/cli/index.js tinybird --schema ../Ghost/ghost/tinybird/datasources/fixtures/mockingbird-schema.json --endpoint gcp_europe_west3 --token xxxx --datasource analytics_events --eps 50 --limit 5000
```

This is being done from a local clone and requires a fix to add the EU West3 endpoint that I have locally and need to push up to the Mockingbird repo - I'll clean that up ASAP.
