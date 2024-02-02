import { Octokit } from "octokit";

export const API = {
    baseURL: 'https://developer.github.com/v3',
    users: '/users',
};

export const octokit = new Octokit({
    auth: `Bearer ${process.env.REACT_APP_TOKEN}`,
  });
