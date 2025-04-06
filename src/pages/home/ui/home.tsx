import { memo } from 'react';

import yodaImage from '../../../../assets/yoda.png';

import styles from './home.module.scss';
import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui/container';

function MainPage() {
	return (
		<div className={styles.pageWrapper}>
			<Container>
				<div className={styles.mainBlock}>
					<div className={styles.mainText}>
						<h1>
							<b>Find</b> all your favorite <b>character</b>
						</h1>
						<p>
							You can find out all the information about your favorite
							characters
						</p>
						<Link to={'/characters'}>
							<button className={styles.mainButton}>See more...</button>
						</Link>
					</div>

					<div className={styles.mainImage}>
						<img src={yodaImage} alt="yoda" />
					</div>
				</div>
			</Container>
		</div>
	);
}

export default memo(MainPage);
