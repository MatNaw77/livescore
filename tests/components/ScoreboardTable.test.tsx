import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Scoreboard } from '../../lib/Scoreboard/Scoreboard';
import { InMemoryMatchRepository } from '../../lib/Scoreboard/scoreboard.repo';
import { MockTimeProvider } from '../../services/MockTimeProvider';

import { ScoreboardTable } from '../../components/ScoreboardTable/ScoreboardTable';

describe('ScoreboardTable', () => {
    const repo = new InMemoryMatchRepository();
    const timeProvider = new MockTimeProvider();
    const scoreboard = new Scoreboard(repo, timeProvider);

    it('should render empty state when no matches', () => {
        render(<ScoreboardTable scoreboard={scoreboard} />);
        expect(screen.getByText('No matches available')).toBeInTheDocument();
    });

    it('should render a single match', () => {
        scoreboard.startMatch('Brazil', 'Poland');
        render(<ScoreboardTable scoreboard={scoreboard} />);

        expect(screen.getByText('Brazil')).toBeInTheDocument();
        expect(screen.getByText('Poland')).toBeInTheDocument();
        expect(screen.getByText('0 - 0')).toBeInTheDocument();
    });

    it('should render multiple matches', () => {
        scoreboard.startMatch('Brazil', 'Poland');
        scoreboard.startMatch('Spain', 'Italy');
        scoreboard.updateScore({ homeTeam: 'Spain', awayTeam: 'Italy', homeScore: 2, awayScore: 2 });

        render(<ScoreboardTable scoreboard={scoreboard} />);
        expect(screen.getByText('Brazil')).toBeInTheDocument();
        expect(screen.getByText('Spain')).toBeInTheDocument();
        expect(screen.getByText('1 - 0')).toBeInTheDocument();
    });

});