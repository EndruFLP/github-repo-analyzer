import { useEffect } from 'react';
import { fetchRepository } from '../api/github';
import type { GitHubRepository } from '../types/github';
import { addSearchHistory } from '../utils/searchHistory';

type UseRepositoryOptions = {
	submittedRepo: string;
	searchId: number;
	onRepositoryChange: (repository: GitHubRepository | null) => void;
	onLoadingChange: (loading: boolean) => void;
	setFetchError: (message: string) => void;
};

export function useRepository({
	submittedRepo,
	searchId,
	onRepositoryChange,
	onLoadingChange,
	setFetchError,
}: UseRepositoryOptions) {
	useEffect(() => {
		if (!submittedRepo) return;

		let cancelled = false;
		const [owner, repo] = submittedRepo.split('/');

		fetchRepository(owner, repo)
			.then((data) => {
				if (cancelled) return;
				onRepositoryChange(data as GitHubRepository);
				addSearchHistory(submittedRepo);
				setFetchError('');
			})
			.catch((error: unknown) => {
				if (cancelled) return;
				onRepositoryChange(null);
				const message =
					error instanceof Error ? error.message : 'Repository not found';
				setFetchError(message);
			})
			.finally(() => {
				if (cancelled) return;
				onLoadingChange(false);
			});

		return () => {
			cancelled = true;
		};
	}, [submittedRepo, searchId, onRepositoryChange, onLoadingChange, setFetchError]);
}