import { Scoreboard } from '../lib/Scoreboard';

describe("Scoreboard tests", () => {
    const scoreboard = new Scoreboard();

    describe("startMatch function tests", () => {
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

        it("should fail to start a new match using the same team", () => {
            expect(() => scoreboard.startMatch("Poland", "Poland")).toThrow("Team already exists");
        });

        it("should fail if match already exists", () => {
            expect(() => scoreboard.startMatch("Poland", "Brazil")).toThrow("Match already exists");
        });

        it("should fail if small letters are used for team names", () => {
            expect(() => scoreboard.startMatch("poland", "brazil")).toThrow("Team names must start with uppercase and the rest lowercase");
        });

        it("should fail if team names are not provided", () => {
            expect(() => scoreboard.startMatch("Poland", "")).toThrow("Team names must be provided");
        });
    });

    describe("updateScore function tests", () => {
        it("should update score of an existing match", () => {
            scoreboard.updateScore({
                homeTeam: "Poland",
                awayTeam: "Brazil",
                homeScore: 2,
                awayScore: 1
            });

            const match = scoreboard.getSummary()[0];
            expect(match.homeScore).toBe(2);
            expect(match.awayScore).toBe(1);
        });
    });
});