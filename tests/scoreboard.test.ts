import { Scoreboard } from '../lib/Scoreboard';
import { UpdateScoreParams } from '../types/match';

const makeUpdateScore = (overrides: Partial<UpdateScoreParams> = {}): UpdateScoreParams => ({
    homeTeam: 'Poland',
    awayTeam: 'Brazil',
    homeScore: 0,
    awayScore: 0,
    ...overrides,
});

describe('Scoreboard tests', () => {
    let scoreboard: Scoreboard;

    beforeEach(() => {
        scoreboard = new Scoreboard();
    });

    describe('startMatch function tests', () => {
        it('should start a new match Poland-Brazil with 0-0 score', () => {
            scoreboard.startMatch('Poland', 'Brazil');

            const matches = scoreboard.getSummary();
            const match = matches[0];
            expect(matches.length).toBe(1);
            expect(match).toMatchObject(makeUpdateScore());
        });

        it('should fail to start a new match using the same team', () => {
            expect(() => scoreboard.startMatch('Poland', 'Poland')).toThrow('Team already exists');
        });

        it('should fail if match already exists', () => {
            scoreboard.startMatch('Poland', 'Brazil');
            expect(() => scoreboard.startMatch('Poland', 'Brazil')).toThrow('Match already exists');
        });

        it('should fail if team names are not provided', () => {
            expect(() => scoreboard.startMatch('Poland', '')).toThrow('Team names must be provided');
        });
    });

    describe('updateScore function tests', () => {
        beforeEach(() => {
            scoreboard.startMatch('Poland', 'Brazil');
        });

        it('should update score of an existing match', () => {
            const updateScoreParams = makeUpdateScore({
                homeScore: 2,
                awayScore: 1
            });
            scoreboard.updateScore(updateScoreParams);

            const match = scoreboard.getSummary()[0];
            expect(match.homeScore).toBe(2);
            expect(match.awayScore).toBe(1);
        });

        it('should fail if match does not exist', () => {
            const updateScoreParams = makeUpdateScore({
                homeTeam: 'Spain',
                awayTeam: 'Italy',
            });

            expect(() => scoreboard.updateScore(updateScoreParams)).toThrow('Match not found');
        });

        it('should fail if score is negative', () => {
            const updateScoreParams = makeUpdateScore({
                homeScore: -1,
            });

            expect(() => scoreboard.updateScore(updateScoreParams)).toThrow('Score cannot be negative');
        });

        it('should fail if score is not a number', () => {
            const updateScoreParams = makeUpdateScore({
                homeScore: NaN,
            });

            expect(() => scoreboard.updateScore(updateScoreParams)).toThrow('Score must be a valid number');
        });
    });

    describe('finishMatch function tests', () => {
        it('should finish an existing match', () => {
            scoreboard.startMatch('Spain', 'Italy');
            scoreboard.finishMatch('Spain', 'Italy');

            const matches = scoreboard.getSummary();
            const currentMatch = matches.find(m => m.homeTeam === 'Spain' && m.awayTeam === 'Italy')
            expect(currentMatch).toBeUndefined();
        });

        it('should fail if match does not exist', () => {
            expect(() => scoreboard.finishMatch('Germany', 'France'))
                .toThrow('Match not found');
        });

        it('should fail if team names are not provided', () => {
            expect(() => scoreboard.finishMatch('', 'Brazil')).toThrow('Team names must be provided');
        });

        it('should fail if match is already finished', () => {
            scoreboard.startMatch('Mexico', 'USA');
            scoreboard.finishMatch('Mexico', 'USA');

            expect(() => scoreboard.finishMatch('Mexico', 'USA')).toThrow('Match not found');
        });

        it('should remove only the specified match when multiple matches exist', () => {
            const matchesToStart = [
                ['Poland', 'Brazil'],
                ['Spain', 'Italy'],
                ['Germany', 'France'],
                ['Argentina', 'Chile'],
            ] as const;

            matchesToStart.forEach(([home, away]) => scoreboard.startMatch(home, away));
            scoreboard.finishMatch('Germany', 'France');

            const matches = scoreboard.getSummary();

            expect(matches.length).toBe(3);
            expect(matches.find(m => m.homeTeam === 'Germany' && m.awayTeam === 'France')).toBeUndefined();

            const remainingMatches = matchesToStart.filter(
                ([home, away]) => !(home === 'Germany' && away === 'France')
            );

            remainingMatches.forEach(([home, away]) => {
                expect(matches).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({ homeTeam: home, awayTeam: away })
                    ])
                );
            });
        });
    });
});
