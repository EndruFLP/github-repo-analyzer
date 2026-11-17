import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import SearchBar from './components/SearchBar';

function App() {
	return (
		<>
			<h2>Github Repo Analyzer</h2>
			<SearchBar />
			<LoadingSpinner />
		</>
	);
}

export default App;

