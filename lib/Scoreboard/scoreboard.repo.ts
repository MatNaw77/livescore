import { Match } from './Scoreboard.types';

export interface MatchRepository {
    add(match: Match): void;
    update(match: Match): void;
    remove(match: Match): void;
    find(homeTeam: string, awayTeam: string): Match | undefined;
    getAll(): Match[];
}

export class InMemoryMatchRepository implements MatchRepository {
    private matches: Match[] = [];

    add(match: Match): void {
        this.matches.push(match);
    }

    update(match: Match): void {
        const index = this.matches.findIndex(
            m => m.homeTeam === match.homeTeam && m.awayTeam === match.awayTeam
        );
        if (index !== -1) {
            this.matches[index] = match;
        }
    }

    remove(match: Match): void {
        this.matches = this.matches.filter(
            m => !(m.homeTeam === match.homeTeam && m.awayTeam === match.awayTeam)
        );
    }

    find(homeTeam: string, awayTeam: string): Match | undefined {
        return this.matches.find(m => m.homeTeam === homeTeam && m.awayTeam === awayTeam);
    }

    getAll(): Match[] {
        return [...this.matches];
    }
}