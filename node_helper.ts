import * as NodeHelper from 'node_helper';
import * as Log from 'logger';
import { NOTIFICATION } from './Constants';
import { Config } from './MMM-TickTick-Types';

module.exports = NodeHelper.create({
  start(): void {
    Log.debug(`${this.name} is started!`);
  },
  async socketNotificationReceived(notification: string, config: Config) {
    if (notification === NOTIFICATION.FETCH_PROJECTS) {
      Log.debug(
        `${
          this.name
        } received a socket notification: '${notification}' with payload: ${JSON.stringify(
          config
        )}`
      );
      this.fetchAllProjects();
    }
  },

  fetchAllProjects() {
    const req = new Request(this.config.ticktick.getAllProjectsUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.config.token}`,
      },
    });
    fetch(req)
      .then((response) => {
        if (!response.ok) {
          Log.error(
            `There was an error fetching tasks Status: ${response.status}`
          );
        }
        return response.json;
      })
      .then((response) => this.sendProjectsBack(response));
  },

  sendProjectsBack(response) {
    this.sendSocketNotification(NOTIFICATION.RETURNING_PROJECTS, response);
  },
});
