import { Match, UpdateScoreParams } from "../types/match";

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

    updateScore = ({ homeTeam, awayTeam, homeScore, awayScore }: UpdateScoreParams) => {
        const match = this.matches.find((m: Match) => m.homeTeam === homeTeam && m.awayTeam === awayTeam);

        if (!match)
            throw new Error("Match not found");

        if (homeScore < 0 || awayScore < 0)
            throw new Error("Score cannot be negative");

        if (isNaN(homeScore) || isNaN(awayScore))
            throw new Error("Score must be a valid number");


        match.homeScore = homeScore;
        match.awayScore = awayScore;
    };

    finishMatch = (homeTeam: string, awayTeam: string) => {
        const index = this.matches.findIndex(
            m => m.homeTeam === homeTeam && m.awayTeam === awayTeam
        );

        this.matches.splice(index, 1);
    };

    getSummary = () => this.matches;
}
