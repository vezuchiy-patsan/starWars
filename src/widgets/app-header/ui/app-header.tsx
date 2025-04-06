import styles from './app-header.module.scss';
import starWars from '../../../../assets/starWars.svg';
import { memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container } from '@/shared/ui/container';

export const AppHeader = memo(function Header() {
	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.headerBlock}>
					<Link to="/">
						<img className={styles.buttonIcon} src={starWars} alt="icon" />
					</Link>
					<nav>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? `${styles.link} ${styles.active}` : styles.link
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/characters"
							className={({ isActive }) =>
								isActive ? `${styles.link} ${styles.active}` : styles.link
							}
						>
							Characters
						</NavLink>
					</nav>
				</div>
			</Container>
		</header>
	);
});
