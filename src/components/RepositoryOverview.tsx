import type { GitHubRepository } from '../types/github';

type RepositoryOverviewProps = {
	repository: GitHubRepository;
};

function RepositoryOverview({ repository }: RepositoryOverviewProps) {
	return (
		<section>
			<h2>{repository.full_name}</h2>
			{repository.description && <p>{repository.description}</p>}
			<p>Stars: {repository.stargazers_count}</p>
			<a href={repository.html_url} target="blank" rel="noreferrer">
				View on Github
			</a>
		</section>
	);
}

export default RepositoryOverview;
