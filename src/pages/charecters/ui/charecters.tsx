import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './charecters.module.scss';
import ReactSelect, { StylesConfig } from 'react-select';
import { Container } from '@/shared/ui/container';
import { Character, useGetCharactersQuery } from '@/app/api/api-query';
import { Loader } from '@/shared/ui/loader';

import { useDebouncedCallback, useSetState } from '@mantine/hooks';
import { Modal } from '@/widgets/app-modal';
import { Card } from '@/widgets/app-card';

const stylesSelect: StylesConfig = {
	control: (state) => ({
		...state,
		backgroundColor: '#F2F2F2',
		width: '135px',
		height: '23px',
		maxHeight: '23px',
	}),
};

type SelectGenderOptions = { label: string; value: string };

function CharectersPage() {
	const scrollBlock = useRef<HTMLDivElement | null>(null);
	const isNext = useRef<boolean>(false);

	const [params, setParams] = useState<{ page: number }>({
		page: 1,
	});

	const [cards, setCards] = useState<Character[] | []>([]);
	const [cardTarget, setCardTarget] = useState<Character | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [filter, setFilter] = useSetState<{
		gender: string;
		eye_color: string;
	}>({ gender: '', eye_color: '' });

	const { data, isFetching, isError, isSuccess, isLoading } =
		useGetCharactersQuery(params);

	const filterAttributes = (value: Character) => {
		if (filter.gender.length === 0 && filter.eye_color.length === 0)
			return true;
		if (filter.gender.length === 0) return value.eye_color === filter.eye_color;
		if (filter.eye_color.length === 0) return value.gender === filter.gender;
		return (
			value.gender === filter.gender && value.eye_color === filter.eye_color
		);
	};
	const cardsCharacters = useMemo(
		() => cards.filter(filterAttributes),
		[filter, cards],
	);

	const scrollHandler = useDebouncedCallback((e: Event) => {
		const target = e.target as Element;
		const height = target.scrollHeight;
		const scrollTop = target.scrollTop;
		const heightBlock = target.clientHeight;

		if (height - (scrollTop + heightBlock) < 100) {
			if (isNext.current) {
				setParams((prev) => ({
					page: prev.page + 1,
				}));
			}
		}
	}, 200);
	const handleOpenModal = useCallback((card: Character) => {
		setCardTarget(card);
		setIsOpen(true);
	}, []);
	const handleCloseModal = useCallback(() => setIsOpen(false), []);

	if (isError) return <h1> Ошибка запроса!!!</h1>;

	useEffect(() => {
		if (isSuccess && !isFetching && data.results) {
			setCards((prev) =>
				prev.length === 0
					? data.results
					: ([...prev, ...data.results] as Character[]),
			);
			if (data.next) isNext.current = true;
			if (data.next === null) isNext.current = false;
		}
	}, [isSuccess, isFetching]);

	useEffect(() => {
		const block = scrollBlock.current;
		if (!block) return;

		block.addEventListener('scroll', scrollHandler);

		return function () {
			block.removeEventListener('scroll', scrollHandler);
		};
	}, []);
	return (
		<div className={styles.pageWrapper}>
			<Container>
				<div className={styles.language}>language: en</div>
				<div className={styles.cardsBlock}>
					<h1 className={styles.cardsBlockDescription}>
						{data?.count ?? '...'} People for you to choose your favorite
					</h1>
					<div>
						<div className={styles.groupSelect}>
							<div className={styles.select}>
								<label htmlFor="select-1">Gender</label>
								<ReactSelect
									id="select-1"
									styles={stylesSelect}
									onChange={(newValue) => {
										if (
											typeof newValue === 'object' &&
											newValue !== null &&
											'value' in newValue &&
											'label' in newValue
										) {
											const value = newValue as SelectGenderOptions;
											if (value.label === 'All') {
												setFilter({ gender: '' });
												return;
											}
											setFilter({ gender: value.value });
										}
									}}
									options={[
										{ label: 'All', value: '' },
										{ label: 'Male', value: 'male' },
										{ label: 'Female', value: 'female' },
										{ label: 'n/a', value: 'n/a' },
									]}
									placeholder="Выберете"
								/>
							</div>
							<div className={styles.select}>
								<label htmlFor="select-2">Eye Color</label>
								<ReactSelect
									id="select-2"
									styles={stylesSelect}
									onChange={(newValue) => {
										if (
											typeof newValue === 'object' &&
											newValue !== null &&
											'value' in newValue &&
											'label' in newValue
										) {
											const value = newValue as SelectGenderOptions;
											if (value.label === 'All') {
												setFilter({ eye_color: '' });
												return;
											}
											setFilter({ eye_color: value.value });
										}
									}}
									options={[
										{ label: 'All', value: '' },
										{ label: 'Blue', value: 'blue' },
										{ label: 'Green', value: 'green' },
										{ label: 'Brown', value: 'browna' },
										{ label: 'Red', value: 'red' },
									]}
									placeholder="Выберете"
								/>
							</div>
						</div>

						<div ref={scrollBlock} className={styles.charactersCards}>
							{!isLoading &&
								cards &&
								cardsCharacters.map((el, ind) => (
									<Card
										key={ind + el.name}
										card={el}
										index={ind}
										openModal={handleOpenModal}
									/>
								))}
							{isFetching && <Loader />}
						</div>
					</div>
				</div>
			</Container>
			{isOpen && <Modal card={cardTarget} close={handleCloseModal} />}
		</div>
	);
}

export default memo(CharectersPage);
