import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from './app/providers/store-provider';
import { App } from '@/app/app';
import { GlobalErrorBoundary } from '@/widgets/global-error-boundary';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
			<StoreProvider>
				<GlobalErrorBoundary>
					<App />
				</GlobalErrorBoundary>
			</StoreProvider>
		</BrowserRouter>
	</StrictMode>,
);
