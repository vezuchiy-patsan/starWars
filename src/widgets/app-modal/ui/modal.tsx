import styles from './modal.module.scss';

import closeIcon from '../../../../assets/closeIcon.svg';
import droid from '../../../../assets/droid.png';
import female from '../../../../assets/female.png';
import hermaphrodite from '../../../../assets/hermaphrodite.png';
import male from '../../../../assets/male.png';
import { Character } from '@/app/api/api-query';
import { FC, useEffect } from 'react';

interface ModalProps {
	card: Character | null;
	close: () => void;
}

function FindProfileSrc(gender: string) {
	switch (gender) {
		case 'male':
			return male;
		case 'female':
			return female;
		case 'hermaphrodite':
			return hermaphrodite;
		case 'n/a':
			return droid;
		default:
			return '';
	}
}

export const Modal: FC<ModalProps> = ({ card, close }) => {
	if (!card) {
		return null; // Возвращаем null вместо вызова close()
	}
	useEffect(() => {
		if (!card) {
			close();
		}
	}, [card, close]);

	return (
		<div className={styles.Modal}>
			<div className={styles.ModalContainer}>
				<img
					className={styles.buttonClose}
					src={closeIcon}
					onClick={() => close()}
					alt="close"
				/>
				<div className={styles.ModalMainSection}>
					<div className={styles.MainSectionImage}>
						<img
							className={styles.MainSectionImageProfile}
							src={FindProfileSrc(card.gender)}
							alt="profile character"
						/>
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
					<div className={styles.MainSectionDescription}>
						<h2>{card.name}</h2>
						<div className={styles.MainSectionDescriptionText}>
							<p>Eye color: {card.eye_color}</p>
							{card.hair_color !== 'n/a' && (
								<p>Hair color: {card.hair_color}</p>
							)}
							<p>Skin color: {card.skin_color}</p>
						</div>
						<div className={styles.MainSectionDescriptionStats}>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
