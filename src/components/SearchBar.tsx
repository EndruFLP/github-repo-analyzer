import { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import type { GitHubRepository } from '../types/github';
import './SearchBar.css';
import SearchHistory from './SearchHistory';
import { useRepository } from '../hooks/useRepository';

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

	useRepository({
		submittedRepo,
		searchId,
		onRepositoryChange,
		onLoadingChange,
		setFetchError,
	});

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
