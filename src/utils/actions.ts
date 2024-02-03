import { octokit } from "../api/API";

export const userRepos = async (username: string) => {
    try {
        const response = await octokit.request(`GET /users/${username}/repos`,);
        const repos = response.data;
        const recentRepos = await recentActivity(username);
        const calculatedLanguages = await getLanguages(repos);
        return  {
            recentRepos: recentRepos.data, 
            calculatedLanguages
        };
    } catch (e) {
        console.log('Repos error >>>', e)
    }
}

const getLanguages = async (repos: any[]) => {
    const languages: { [key: string]: number } = {};

    for (const repo of repos) {
        const repoLanguagesResponse = await octokit.request(`GET /repos/${repo.full_name}/languages`);
        const repoLanguages = repoLanguagesResponse.data;
  
        for (const lang of Object.keys(repoLanguages)) {
          languages[lang] = (languages[lang] || 0) + repoLanguages[lang];
        }
    }

    return calculateLanguages(languages)
}

const calculateLanguages = (languages: { [key: string]: number }) => {
    const totalBytes = Object.values(languages).reduce((acc, bytes) => acc + bytes, 0);
    const percentages: { [key: string]: number } = {};

    for (const lang of Object.keys(languages)) {
      const bytes = languages[lang];
      const percentage = (bytes / totalBytes) * 100;
      percentages[lang] = percentage;
    }

    return percentages;
}

const recentActivity = async (username: string) => {
    return await octokit.request(`GET /users/${username}/repos`, 
        {
            username,
            sort: 'updated_at',
            direction: 'desc',
            per_page: 10,
        }
    );
}