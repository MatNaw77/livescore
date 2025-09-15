import { IScoreboard } from "@/lib/Scoreboard/Scoreboard.types";

type ScoreboardTableProps = {
    scoreboard: IScoreboard;
};

export const ScoreboardTable = ({ scoreboard }: ScoreboardTableProps) => {
    const matches = scoreboard.getSummary();

    if (matches.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">No matches available</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <table className="table-auto border-collapse border border-gray-300 shadow-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">Home</th>
                        <th className="border px-4 py-2">Away</th>
                        <th className="border px-4 py-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="border px-4 py-2 font-medium">{match.homeTeam}</td>
                            <td className="border px-4 py-2 font-medium">{match.awayTeam}</td>
                            <td className="border px-4 py-2 text-center">
                                {`${match.homeScore} - ${match.awayScore}`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
