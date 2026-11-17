import { getSearchHistory } from '../utils/searchHistory';
import './SearchHistory.css';

type SearchHistoryProps = {
	onSelect: (repo: string) => void;
};

function SearchHistory({ onSelect }: SearchHistoryProps) {
	const items = getSearchHistory();

	if (items.length === 0) return null;

	return (
		<section className="history" aria-label="Recent searches">
			<h2 className="history__title">Recent</h2>
			<ul className="history__list">
				{items.map((repo) => (
					<li key={repo}>
						<button type="button" className="history__item" onClick={() => onSelect(repo)}>
							{repo}
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}

export default SearchHistory;
