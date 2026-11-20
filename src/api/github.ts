import { mockFetchRepository } from './mockData';

const BASE_URL = 'https://api.github.com';
const useMock = import.meta.env.VITE_USE_MOCK === 'true';

function requestHeaders(): HeadersInit {
	const token = import.meta.env.VITE_GITHUB_TOKEN;
	const base: HeadersInit = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
	};
	return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

async function realFetchRepository(owner: string, repo: string) {
	const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, {
		headers: requestHeaders(),
	});
	if (response.status === 403) {
		throw new Error(
			'GitHub rate limit or access denied. Try later or set VITE_GITHUB_TOKEN in .env',
		);
	}
	if (!response.ok) throw new Error('Repository not found');
	return response.json();
}

export function fetchRepository(owner: string, repo: string) {
	return useMock ? mockFetchRepository(owner, repo) : realFetchRepository(owner, repo);
}
