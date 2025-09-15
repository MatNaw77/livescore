import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Scoreboard } from '../../lib/Scoreboard/Scoreboard';
import type { Match } from '../../lib/Scoreboard/Scoreboard.types';
import { InMemoryMatchRepository } from '../../lib/Scoreboard/scoreboard.repo';
import { MockTimeProvider } from '../../services/MockTimeProvider';
import type { IScoreboard } from '../../lib/Scoreboard/Scoreboard.types';
import { ScoreboardTable } from '../../components/ScoreboardTable/ScoreboardTable';

describe('ScoreboardTable', () => {
    const timeProvider = new MockTimeProvider();
    let scoreboard: IScoreboard;
    let matches: Match[] = [];

    beforeEach(() => {
        const repo = new InMemoryMatchRepository();
        scoreboard = new Scoreboard(repo, timeProvider);
    });

    it('should render empty state when no matches', () => {
        render(<ScoreboardTable matches={matches} />);
        expect(screen.getByText('No matches available')).toBeInTheDocument();
    });

    it('should render a single match', () => {
        scoreboard.startMatch('Brazil', 'Poland');
        matches = scoreboard.getSummary();
        render(<ScoreboardTable matches={matches} />);

        expect(screen.getByText('Brazil')).toBeInTheDocument();
        expect(screen.getByText('Poland')).toBeInTheDocument();
        expect(screen.getByText('0 - 0')).toBeInTheDocument();
    });

    it('should render multiple matches', () => {
        scoreboard.startMatch('Brazil', 'Poland');
        scoreboard.startMatch('Spain', 'Italy');
        scoreboard.updateScore({ homeTeam: 'Brazil', awayTeam: 'Poland', homeScore: 1, awayScore: 0 });
        scoreboard.updateScore({ homeTeam: 'Spain', awayTeam: 'Italy', homeScore: 2, awayScore: 2 });
        matches = scoreboard.getSummary();

        render(<ScoreboardTable matches={matches} />);
        expect(screen.getByText('Brazil')).toBeInTheDocument();
        expect(screen.getByText('Spain')).toBeInTheDocument();
        expect(screen.getByText('1 - 0')).toBeInTheDocument();
    });
});