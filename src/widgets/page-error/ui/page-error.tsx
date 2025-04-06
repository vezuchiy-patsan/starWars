import { memo, useCallback } from 'react';

import cls from './page-error.module.scss';

interface PageErrorProps {
	scope: 'global' | 'app';
}

export const PageError = memo((props: PageErrorProps) => {
	const handleReload = useCallback(() => {
		window.location.reload();
	}, []);

	return (
		<div className={cls.pageWrapper}>
			<p>Что-то случилось!!! Инфо: {props.scope}</p>
			<button onClick={handleReload}>Перезагрузить</button>
		</div>
	);
});
