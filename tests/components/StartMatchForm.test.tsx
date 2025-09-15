import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StartMatchForm } from '../../components/StartMatchFrom/StartMatchForm';

describe('StartMatchForm', () => {
    it('renders two input fields and a button', () => {
        const mockOnStart = jest.fn();
        render(<StartMatchForm onStart={mockOnStart} />);

        expect(screen.getByPlaceholderText('Home Team')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Away Team')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /start match/i })).toBeInTheDocument();
    });

    it('calls onStart with correct values when form is submitted', () => {
        const mockOnStart = jest.fn();
        render(<StartMatchForm onStart={mockOnStart} />);

        fireEvent.change(screen.getByPlaceholderText('Home Team'), { target: { value: 'Team A' } });
        fireEvent.change(screen.getByPlaceholderText('Away Team'), { target: { value: 'Team B' } });

        fireEvent.click(screen.getByRole('button', { name: /start match/i }));

        expect(mockOnStart).toHaveBeenCalledTimes(1);
        expect(mockOnStart).toHaveBeenCalledWith({ home: 'Team A', away: 'Team B' });
    });

    it('does not call onStart if one input is empty', () => {
        const mockOnStart = jest.fn();
        render(<StartMatchForm onStart={mockOnStart} />);

        fireEvent.change(screen.getByPlaceholderText('Home Team'), { target: { value: 'Team A' } });
        fireEvent.change(screen.getByPlaceholderText('Away Team'), { target: { value: '' } });

        fireEvent.click(screen.getByRole('button', { name: /start match/i }));
        expect(mockOnStart).not.toHaveBeenCalled();
    });
});
