import * as Log from 'logger';
import { Config, FetchTaskPayload } from './MMM-TickTick-Types';
import { NOTIFICATION } from './Constants';

Module.register<Config>('MMM-Hello-World-Ts', {
  // Default module config
  defaults: {
    CLIENT_ID: 'string',
    CLIENT_SECRET: 'string',
    token: 'Hello World!',
    ticktick: {
      getAuthUrl: 'https://ticktick.com/oauth/authorize',
      getTokenUrl: 'https://ticktick.com/oauth/token',
      apiBase: 'api.ticktick.com',
      getProjectWithDataUrl: '/open/v1/project/{projectId}/data',
      getAllProjectsUrl: '/open/v1/project',
    },
  },

  // MM function: this method is called when all modules are loaded and the system is ready to boot up.
  start(): void {
    Log.debug(`${this.name} is starting`);
    this.checkForToken();
    this.loadData();
    this.scheduleUpdate();
    this.updateDom();
  },

  getToken() {
    //insert the oAth2 system here
  },

  checkForToken() {
    if (this.config.token === undefined) {
      this.getToken();
    }
  },

  loadData() {
    Log.debug(`${this.name} is loading data`);
    const fetchTaskPayload: FetchTaskPayload = { token: this.config.token };
    this.sendSocketNotification(NOTIFICATION.FETCH_PROJECTS, fetchTaskPayload);
  },
});
