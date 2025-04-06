import '@/app/styles/index.scss';
import '@/index.css';

import { Suspense } from 'react';
import cn from 'classnames';

import { AppRouter } from '@/app/providers/router';
import { AppErrorBoundary } from '@/widgets/app-error-boundary';
import { AppHeader } from '@/widgets/app-header';
import { useLocation } from 'react-router-dom';
import { RoutePath } from './providers/router/config/route-config';

export function App() {
	const location = useLocation();
	return (
		<div className={cn('app')}>
			<Suspense fallback="">
				<AppErrorBoundary>
					{Object.values(RoutePath).find((f) => f === location.pathname) && (
						<AppHeader />
					)}
					<AppRouter />
				</AppErrorBoundary>
			</Suspense>
		</div>
	);
}
