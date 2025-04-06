import styles from './page-loader.module.scss';

export const PageLoader = () => (
	<div className={styles.pageWrapper}>
		<span className={styles.loader}></span>
	</div>
);
