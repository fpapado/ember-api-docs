import WebWorker from 'ember-web-workers/services/worker';

// Think of this as a 'Client' implementation, that abstracts away
// details of messaging with the worker thread.
export default WebWorker.extend({
  // The worker name corresponds to the web-workers/ filename
  workerName: 'background-fetch',
  fetchProjectVersionData(params) {
    return this.postMessage('fetchProjectVersionData', params);
  }
});
