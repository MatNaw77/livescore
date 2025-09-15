import { Match, UpdateScoreParams } from "../types/match";

export class Scoreboard {
    private matches: Match[] = [];

    private validateTeamName(team: string) {
        if (!team || team.trim() === '') {
            throw new Error('Team names must be provided');
        }
    }

    startMatch = (homeTeam: string, awayTeam: string) => {
        this.validateTeamName(homeTeam);
        this.validateTeamName(awayTeam);

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

    finishMatch = (homeTeam: string, awayTeam: string): Match => {
        this.validateTeamName(homeTeam);
        this.validateTeamName(awayTeam);

        const index = this.matches.findIndex(
            m => m.homeTeam === homeTeam && m.awayTeam === awayTeam
        );

        if (index === -1) {
            throw new Error('Match not found');
        }

        const [finishedMatch] = this.matches.splice(index, 1);
        return finishedMatch;
    };

    getSummary = () => {
        return [...this.matches].sort((a, b) => {
            const totalA = a.homeScore + a.awayScore;
            const totalB = b.homeScore + b.awayScore;

            if (totalA !== totalB) {
                return totalB - totalA;
            }

            return b.startTime - a.startTime;
        });
    };
}