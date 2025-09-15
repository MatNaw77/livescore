import { Scoreboard } from '../lib/Scoreboard';

describe("Scoreboard tests", () => {
    const scoreboard = new Scoreboard();

    it("should start a new match Poland-Brazil with 0-0 score", () => {
        scoreboard.startMatch("Poland", "Brazil");

        const matches = scoreboard.getSummary();
        const match = matches[0];
        expect(matches.length).toBe(1);
        expect(match).toMatchObject({
            homeTeam: "Poland",
            awayTeam: "Brazil",
            homeScore: 0,
            awayScore: 0,
        });
    });
});