const STORAGE_KEY = 'searchHistory';
const MAX_ITEMS = 10;

export function addSearchHistory(repo: string) {
	const raw = localStorage.getItem(STORAGE_KEY);
	const list: [] = raw ? JSON.parse(raw) : [];
	const next = [repo, ...list.filter((item) => item !== repo)].slice(0, MAX_ITEMS);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function getSearchHistory(): string[] {
	const raw = localStorage.getItem(STORAGE_KEY);
	return raw ? JSON.parse(raw) : [];
}
