import { memo } from 'react';
import './loader.scss';

export const Loader = memo(() => (
	<div className="loaderWrapper">
		<span className="loader"></span>
	</div>
));
