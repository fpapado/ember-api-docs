# Up next
- [] Handle main manifest fetch, loop

- Eslint rules for magick WebWorker extension

- [] Investigate `ember-web-workers`, fork if necessary?
  - `ember-web-workers` has some quirks wrt paths and merges
    - had to add {overwrite: true} in the merge call
    - had to change 'assets/...' to '/assets/...' otherwiser relative paths
      meant the worker script would not be found

# Later
- [] Consider sending a message to the main thread to signal "fetch complete"
