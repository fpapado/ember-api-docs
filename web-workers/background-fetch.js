importScripts('../web-worker.js');

// eslint-disable-next-line no-undef
class BackgroundFetch extends WebWorker {
  fetchProjectVersionData(host, params) {
    let { project: projectName, project_version: version } = params;

    let config = {host, projectName, version};

    // Fetch manifest
    this.findRecord(config, 'project-version', '')
      .then((manifest) => {
        // Iterate through modules
        let modules = manifest.meta;
        let moduleKeys = Object.keys(modules);
        moduleKeys.forEach(mkey => {
          // Iterate through classes / fields
          let module = modules[mkey];
          let moduleFieldKeys = Object.keys(module);
          moduleFieldKeys.forEach( fkey => {
            // Fetch each record
            let revId = module[fkey];
            this.findRecord(config, mkey, revId);
          });
        });
      });
  }

  findRecord({host, projectName, version}, modelName, revId) {
    // Unlike the adapter, we don't have to reconstruct revId, since we have it
    // already from the manifest.
    let url;

    // TODO: use inflector, not hardcoded values
    if (['namespace', 'class', 'module'].includes(modelName)) {
      if (modelName === 'namespace') {
        url = `json-docs-1/${projectName}/${version}/namespaces/${revId}`;
      } else if (modelName === 'class') {
        url = `json-docs-1/${projectName}/${version}/classes/${revId}`;
      } else if (modelName === 'module') {
        url = `json-docs-1/${projectName}/${version}/modules/${revId}`;
      }
    } else if (modelName === 'missing') {
      url = `json-docs-1/${projectName}/${version}/missings/${revId}`;
    } else if (modelName === 'project-version') {
      let id = `${projectName}-${version}`;
      url = `rev-index/${id}`;
    } else {
      throw new Error('Unexpected model lookup');
    }

    url = `${host}/${url}.json`;

    if (modelName === 'project-version') {
      return fetch(url).then(response => response.json());
    } else {
      // We just want to make the request
      // Change if we want to somehow sync with Ember-Data in main thread
      return fetch(url)
    }
  }
}

let worker = new BackgroundFetch();
worker.listen();
