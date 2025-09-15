import { Match, UpdateScoreParams } from '../../types/match';
import { MatchRepository } from '@/lib/Scoreboard/scoreboard.repo';
import { TimeProvider } from '@/lib/Scoreboard/TimeProvider';
import { IScoreboard } from '@/lib/Scoreboard/Scoreboard.interface';

export class Scoreboard implements IScoreboard {
    constructor(
        private readonly repo: MatchRepository,
        private readonly timeProvider: TimeProvider
    ) { }

    private validateTeamName(team: string) {
        if (!team || team.trim() === '') {
            throw new Error('Team names must be provided');
        }
    }

    startMatch(homeTeam: string, awayTeam: string): void {
        this.validateTeamName(homeTeam);
        this.validateTeamName(awayTeam);

        if (homeTeam === awayTeam) throw new Error('Team names must be different');

        if (this.repo.find(homeTeam, awayTeam)) throw new Error('Match already exists');

        this.repo.add({
            homeTeam,
            awayTeam,
            homeScore: 0,
            awayScore: 0,
            startTime: this.timeProvider.now(),
        });
    }

    updateScore({ homeTeam, awayTeam, homeScore, awayScore }: UpdateScoreParams): void {
        const match = this.repo.find(homeTeam, awayTeam);

        if (!match) throw new Error('Match not found');
        if (homeScore < 0 || awayScore < 0) throw new Error('Score cannot be negative');
        if (isNaN(homeScore) || isNaN(awayScore)) throw new Error('Score must be a valid number');

        match.homeScore = homeScore;
        match.awayScore = awayScore;
        this.repo.update(match);
    }

    finishMatch(homeTeam: string, awayTeam: string): Match {
        this.validateTeamName(homeTeam);
        this.validateTeamName(awayTeam);

        const match = this.repo.find(homeTeam, awayTeam);
        if (!match) throw new Error('Match not found');

        this.repo.remove(match);
        return match;
    }

    getSummary(): Match[] {
        const allMatches = this.repo.getAll();
        return allMatches.sort((a, b) => {
            const totalA = a.homeScore + a.awayScore;
            const totalB = b.homeScore + b.awayScore;

            if (totalA !== totalB) {
                return totalB - totalA;
            }
            return b.startTime - a.startTime;
        });
    }
}
