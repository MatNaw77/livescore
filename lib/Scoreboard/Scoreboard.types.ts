interface Match {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    startTime: number;
}

type UpdateScoreParams = Pick<Match, 'homeTeam' | 'awayTeam' | 'homeScore' | 'awayScore'>;

interface IScoreboard {
    startMatch(homeTeam: string, awayTeam: string): void;
    updateScore(params: UpdateScoreParams): void;
    finishMatch(homeTeam: string, awayTeam: string): Match;
    getSummary(): Match[];
}

export type {
    Match,
    UpdateScoreParams,
    IScoreboard
}