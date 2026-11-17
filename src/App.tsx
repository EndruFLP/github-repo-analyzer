import './App.css';
import { useState } from 'react';

function App() {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<>
			<h2>Github Repo Analyzer</h2>
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="ex: facebook/react"
			/>
			<p>Insert: {searchQuery}</p>
		</>
	);
}

export default App;

