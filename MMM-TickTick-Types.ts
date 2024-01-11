export type FetchTaskPayload = {
  token: string;
  project?: string;
  task?: string;
};

export type Config = {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  token: string;
  ticktick: {
    getAuthUrl: string;
    getTokenUrl: string;
    apiBase: string;
    getProjectWithDataUrl: string;
    getAllProjectsUrl: string;
  };
};
