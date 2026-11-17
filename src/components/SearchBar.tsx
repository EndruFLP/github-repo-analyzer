import { useState, useEffect } from 'react';
import { fetchRepository } from '../api/github';
import ErrorMessage from './ErrorMessage';
import type { GitHubRepository } from '../types/github';
import './SearchBar.css';

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

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onRepositoryChange(null);
		setSearchError('');
		setSubmittedRepo('');
		setFetchError('');
		onLoadingChange(false);

		const parts = searchQuery.trim().split('/').filter(Boolean);

		if (parts.length !== 2) {
			setSearchError('Use owner/repo format (e.g. facebook/react)');
			return;
		}
		onLoadingChange(true);
		setSubmittedRepo(`${parts[0]}/${parts[1]}`);
		setSearchId((id) => id + 1);
	}

	useEffect(() => {
		if (!submittedRepo) return;

		const [owner, repo] = submittedRepo.split('/');
		fetchRepository(owner, repo)
			.then((data) => {
				onRepositoryChange(data as GitHubRepository);
				setFetchError('');
			})
			.catch(() => {
				onRepositoryChange(null);
				setFetchError('Repository not found');
			})
			.finally(() => {
				onLoadingChange(false);
			});
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
		</section>
	);
}

export default SearchBar;
