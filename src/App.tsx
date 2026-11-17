import { useState } from 'react';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import SearchBar from './components/SearchBar';
import type { GitHubRepository } from './types/github';
import RepositoryOverview from './components/RepositoryOverview';

function App() {
	const [repository, setRepository] = useState<GitHubRepository | null>(null);
	const [loading, setLoading] = useState(false);

	return (
		<div className="app">
			<header className="app__header">
				<h1 className="app__title">GitHub Repository Analyzer</h1>
				<p className="app__subtitle">Explore public repositories on GitHub</p>
			</header>

			<main className="app__main">
				<SearchBar onRepositoryChange={setRepository} onLoadingChange={setLoading} />
				{loading && <LoadingSpinner />}
				{repository && <RepositoryOverview repository={repository} />}
			</main>
		</div>
	);
}

export default App;

