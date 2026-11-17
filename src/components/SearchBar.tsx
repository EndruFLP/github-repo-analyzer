import { useState, useEffect } from 'react';
import { fetchRepository } from '../api/github';
import ErrorMessage from './ErrorMessage';
import type { GitHubRepository } from '../types/github';
import './SearchBar.css';
import { addSearchHistory } from '../utils/searchHistory';
import SearchHistory from './SearchHistory';

type SearchBarProps = {
	onRepositoryChange: (repository: GitHubRepository | null) => void;
	onLoadingChange: (loading: boolean) => void;
};

function SearchBar({ onRepositoryChange, onLoadingChange }: SearchBarProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [submittedRepo, setSubmittedRepo] = useState('');
	const [searchError, setSearchError] = useState('');
	const [searchId, setSearchId] = useState(0);
	const [fetchError, setFetchError] = useState('');

	function runSearch(repo: string) {
		onRepositoryChange(null);
		setSearchError('');
		setFetchError('');
		onLoadingChange(true);
		setSearchQuery(repo);
		setSubmittedRepo(repo);
		setSearchId((id) => id + 1);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onRepositoryChange(null);
		setSearchError('');
		setFetchError('');
		setSubmittedRepo('');
		onLoadingChange(false);

		const parts = searchQuery.trim().split('/').filter(Boolean);

		if (parts.length !== 2) {
			setSearchError('Use owner/repo format (e.g. facebook/react)');
			return;
		}
		runSearch(`${parts[0]}/${parts[1]}`);
	}
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
			.catch(() => {
				if (cancelled) return;
				onRepositoryChange(null);
				setFetchError('Repository not found');
			})
			.finally(() => {
				if (cancelled) return;
				onLoadingChange(false);
			});

		return () => {
			cancelled = true;
		};
	}, [submittedRepo, searchId, onRepositoryChange, onLoadingChange]);
	return (
		<section className="search" aria-label="Search repository">
			<form className="search__form" onSubmit={handleSubmit}>
				<input
					className="search__input"
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="e.g. facebook/react"
				/>
				<button className="search__button" type="submit">
					Search
				</button>
			</form>
			{searchError && <ErrorMessage message={searchError} />}
			{fetchError && <ErrorMessage message={fetchError} />}
			<SearchHistory key={searchId} onSelect={runSearch} />
		</section>
	);
}

export default SearchBar;
