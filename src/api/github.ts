import { mockFetchRepository } from './mockData';

const BASE_URL = 'https://api.github.com';
const useMock = import.meta.env.VITE_USE_MOCK === 'true';

async function realFetchRepository(owner: string, repo: string) {
	const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}`);
	if (!response.ok) throw new Error('Repository not found');
	return response.json();
}

export function fetchRepository(owner: string, repo: string) {
	return useMock ? mockFetchRepository(owner, repo) : realFetchRepository(owner, repo);
}
