import { Character } from '@/app/api/api-query';
import { FC, memo } from 'react';

import styles from './card.module.scss';

interface CardProps {
	card: Character;
	index: number;
	openModal: (card: Character) => void;
}

export const Card: FC<CardProps> = memo(({ card, openModal }) => {
	return (
		<div
			data-testid="card"
			className={styles.characterCard}
			onClick={() => openModal(card)}
		>
			<h3>{card.name}</h3>
			<div className={styles.characterCardProperty}>
				{card.height !== 'unknown' && (
					<div>
						<div className={styles.circle}>
							<p>{card.height}</p>
						</div>
						<p>height</p>
					</div>
				)}
				{card.mass !== 'unknown' && (
					<div>
						<div className={styles.circle}>{card.mass}</div>
						<p>mass</p>
					</div>
				)}
			</div>
			<div className={styles.picksCharacter}>
				{card.gender !== 'n/a' && (
					<div
						className={`${styles.pick} ${styles[card.gender.toLowerCase()]}`}
					>
						{card.gender}
					</div>
				)}
				{card.birth_year !== 'unknown' && (
					<div className={styles.pick}>{card.birth_year}</div>
				)}
			</div>
		</div>
	);
});
