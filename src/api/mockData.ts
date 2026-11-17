import type { GitHubRepository } from '../types/github';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const repos: Record<string, GitHubRepository> = {
	'facebook/react': {
		full_name: 'facebook/react',
		description: 'The library for web and native user interfaces.',
		stargazers_count: 234000,
		html_url: 'https://github.com/facebook/react',
	},
};

export async function mockFetchRepository(owner: string, repo: string): Promise<GitHubRepository> {
	await delay(400);

	if (repo === 'not-found') throw new Error('Repository not found');

	const key = `${owner}/${repo}`;
	if (repos[key]) return repos[key];

	return {
		full_name: key,
		description: `Mock: ${key}`,
		stargazers_count: Math.floor(Math.random() * 1000),
		html_url: `https://github.com/${owner}/${repo}`,
	};
}
