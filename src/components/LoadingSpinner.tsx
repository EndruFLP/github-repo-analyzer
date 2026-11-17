import './LoadingSpinner.css';

function LoadingSpinner() {
	return (
		<div className="spinner" role="status" aria-live="polite">
			<span className="spinner__ring" aria-hidden="true" />
			<span className="spinner__text">Loading…</span>
		</div>
	);
}

export default LoadingSpinner;
