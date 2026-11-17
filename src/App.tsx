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
		<>
			<h2>Github Repo Analyzer</h2>
			<SearchBar onRepositoryChange={setRepository} onLoadingChange={setLoading} />
			{loading && <LoadingSpinner />}
			{repository && <RepositoryOverview repository={repository} />}
		</>
	);
}

export default App;

