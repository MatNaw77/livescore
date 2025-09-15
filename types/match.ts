export type Match = {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    startTime: number;
};

export type UpdateScoreParams = Pick<Match, "homeTeam" | "awayTeam" | "homeScore" | "awayScore">;