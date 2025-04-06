import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card } from './card';
import styles from './card.module.scss';

describe('Card', () => {
	const mockCard = {
		birth_year: '19 BBY',
		eye_color: 'Blue',
		films: ['https://swapi.dev/api/films/1/'],
		gender: 'Male',
		hair_color: 'Blond',
		height: '172',
		homeworld: 'https://swapi.dev/api/planets/1/',
		mass: '77',
		name: 'Luke Skywalker',
		skin_color: 'Fair',
		created: '2014-12-09T13:50:51.644000Z',
		edited: '2014-12-10T13:52:43.172000Z',
		species: ['https://swapi.dev/api/species/1/'],
		starships: ['https://swapi.dev/api/starships/12/'],
		url: 'https://swapi.dev/api/people/1/',
		vehicles: ['https://swapi.dev/api/vehicles/14/'],
	};

	const mockOpenModal = vi.fn();

	it('рендерит карточку с корректными данными', () => {
		render(<Card card={mockCard} index={0} openModal={mockOpenModal} />);

		expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
		expect(screen.getByText('172')).toBeInTheDocument();
		expect(screen.getByText('mass')).toBeInTheDocument();
		expect(screen.getByText('Male')).toBeInTheDocument();
		expect(screen.getByText('19 BBY')).toBeInTheDocument();
	});

	it('вызывает openModal при клике', () => {
		render(<Card card={mockCard} index={0} openModal={mockOpenModal} />);

		fireEvent.click(screen.getByTestId('card'));
		expect(mockOpenModal).toHaveBeenCalledWith(mockCard);
	});

	it('не рендерит неизвестные значения', () => {
		const unknownCard = {
			...mockCard,
			height: 'unknown',
			mass: 'unknown',
			gender: 'n/a',
			birth_year: 'unknown',
		};

		render(<Card card={unknownCard} index={0} openModal={mockOpenModal} />);

		expect(screen.queryByText('height')).not.toBeInTheDocument();
		expect(screen.queryByText('mass')).not.toBeInTheDocument();
		expect(screen.queryByText('n/a')).not.toBeInTheDocument();
		expect(screen.queryByText('unknown')).not.toBeInTheDocument();
	});

	it('применяет правильные CSS-классы для gender', () => {
		render(<Card card={mockCard} index={0} openModal={mockOpenModal} />);

		const genderElement = screen.getByText('Male');
		expect(genderElement).toHaveClass(styles.pick);
		expect(genderElement).toHaveClass(styles.male);
	});
});
