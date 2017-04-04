# Up next
- [X] Handle main manifest fetch, loop
- [] Use inflector in web-worker (currently hard-coded)
- [] Consider passing in the manifest, instead of fetching it
- [] Test/Disable in Fastboot?

- [] Investigate `ember-web-workers`, fork if necessary?
  - `ember-web-workers` has some quirks wrt paths and merges
    - had to add {overwrite: true} in the merge call
    - had to change 'assets/...' to '/assets/...' otherwise relative paths
      meant the worker script would not be found

# Later
- [] User ember-data fetch in web-worker?
  - [] Or, change the manifest to list the full address

- Toggle / switch for this functionality?
- Rate limit / max request concurrency?

- How do we distinguish "transient" version visits vs. those useful to the user?
  - Important because accessing an older version is quite common from search results
  - Some sort of countdown?

- Consider sending a message to the main thread to signal "fetch complete"
