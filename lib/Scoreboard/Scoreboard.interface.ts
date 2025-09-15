import { Match, UpdateScoreParams } from '../../types/match';

export interface IScoreboard {
    startMatch(homeTeam: string, awayTeam: string): void;
    updateScore(params: UpdateScoreParams): void;
    finishMatch(homeTeam: string, awayTeam: string): Match;
    getSummary(): Match[];
}