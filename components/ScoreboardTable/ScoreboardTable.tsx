import { IScoreboard } from "@/lib/Scoreboard/Scoreboard.types";

type ScoreboardTableProps = {
    scoreboard: IScoreboard;
};

const ScoreboardTable = ({ scoreboard }: ScoreboardTableProps) => {
    const matches = scoreboard.getSummary();

    if (matches.length === 0) {
        return <p>No matches available</p>;
    }

    return <div>TODO: render table</div>;
};

export { ScoreboardTable };