import { useState } from 'react';

function SearchBar() {
	const [searchQuery, setSearchQuery] = useState('');
	const [submittedRepo, setSubmittedRepo] = useState('');
	const [searchError, setSearchError] = useState('');

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSearchError('');
		setSubmittedRepo('');

		const parts = searchQuery.trim().split('/').filter(Boolean);

		if (parts.length !== 2) {
			setSearchError('Use owner/repo format (e.g. facebook/react)');
			return;
		}

		setSubmittedRepo(`${parts[0]}/${parts[1]}`);
	}

	return (
		<section aria-label="Search repository">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="e.g facebook/react"
				/>
				<button type="submit">Search</button>
			</form>
			{searchError && <p role="alert">{searchError}</p>}
			{submittedRepo && <p>Searching for: {submittedRepo}</p>}
		</section>
	);
}

export default SearchBar;
