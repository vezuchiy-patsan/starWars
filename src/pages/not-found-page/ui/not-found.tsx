import { memo } from 'react';

import styles from './not-found.module.scss';
import deathStar from '../../../../assets/starDeath.png';
import Error404 from '../../../../assets/404.png';
import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<div className={styles.pageWrapper}>
			<img src={Error404} className={styles.numberNotFound} alt="404" />
			<img src={deathStar} className={styles.Icon} alt="Death Star" />
			<Link className={styles.link} to="/">
				<button className={styles.button}>Return</button>
			</Link>
		</div>
	);
}

export default memo(NotFoundPage);
