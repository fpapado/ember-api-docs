import WebWorker from 'ember-web-workers/services/worker';
import ENV from 'ember-api-docs/config/environment';

// Think of this as a 'Client' implementation, that abstracts away
// details of messaging with the worker thread.
export default WebWorker.extend({
  // The worker name corresponds to the web-workers/ filename
  workerName: 'background-fetch',
  fetchProjectVersionData(params) {
    let host = ENV.API_HOST;
    return this.postMessage('fetchProjectVersionData', host, params);
  }
});
