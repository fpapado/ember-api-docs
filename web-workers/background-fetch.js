importScripts('../web-worker.js');

class BackgroundFetch extends WebWorker {
  fetchProjectVersionData(params) {
    let { project, project_version } = params;
    console.log(`Project: ${project}, Version: ${project_version}`);
  }
}

let worker = new BackgroundFetch();
worker.listen();
