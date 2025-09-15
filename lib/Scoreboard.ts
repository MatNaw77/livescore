export type Match = {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    startTime: number;
};

export class Scoreboard {
    private matches: Match[] = [];

    isValidName = (name: string) => /^[A-Z][a-z]+$/.test(name);

    startMatch = (homeTeam: string, awayTeam: string) => {
        if (!homeTeam || !awayTeam)
            throw new Error("Team names must be provided");

        if (!this.isValidName(homeTeam) || !this.isValidName(awayTeam))
            throw new Error("Team names must start with uppercase and the rest lowercase");

        if (homeTeam === awayTeam)
            throw new Error("Team already exists");

        const exists = this.matches.some(
            m => m.homeTeam === homeTeam && m.awayTeam === awayTeam
        );
        if (exists)
            throw new Error("Match already exists");

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
