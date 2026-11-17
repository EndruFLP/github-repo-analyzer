import type { GitHubRepository } from '../types/github';
import './RepositoryOverview.css';

type RepositoryOverviewProps = {
	repository: GitHubRepository;
};

function RepositoryOverview({ repository }: RepositoryOverviewProps) {
	return (
		<section className="overview card">
			<h2 className="overview__title">{repository.full_name}</h2>
			{repository.description && <p className="overview__description">{repository.description}</p>}
			<p className="overview__stats">Stars: {repository.stargazers_count}</p>
			<a className="overview__link" href={repository.html_url} target="_blank" rel="noreferrer">
				View on GitHub
			</a>
		</section>
	);
}

export default RepositoryOverview;
