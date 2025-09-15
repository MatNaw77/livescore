export type Match = {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    startTime: number;
};

export class Scoreboard {
    private matches: Match[] = [];

    startMatch = (homeTeam: string, awayTeam: string) => {
        this.matches.push({
            homeTeam,
            awayTeam,
            homeScore: 0,
            awayScore: 0,
            startTime: Date.now(),
        });
    };

    getSummary = () => this.matches;
}
