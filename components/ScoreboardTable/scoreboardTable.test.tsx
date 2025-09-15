import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Scoreboard } from '../../lib/Scoreboard/Scoreboard';
import { InMemoryMatchRepository } from '../../lib/Scoreboard/scoreboard.repo';
import { MockTimeProvider } from '../../services/MockTimeProvider';

import { ScoreboardTable } from './ScoreboardTable';

describe('ScoreboardTable', () => {
    const repo = new InMemoryMatchRepository();
    const timeProvider = new MockTimeProvider();
    const scoreboard = new Scoreboard(repo, timeProvider);

    it('should render empty state when no matches', () => {
        render(<ScoreboardTable scoreboard={scoreboard} />);
        expect(screen.getByText('No matches available')).toBeInTheDocument();
    });

});