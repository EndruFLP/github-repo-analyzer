const BASE_URL = 'https://api.github.com';

export async function fetchRepository(owner: string, repo: string) {
	const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}`);

	if (!response.ok) {
		throw new Error('Repository not found!');
	}

	return response.json();
}
