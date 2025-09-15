'use client';
import React, { useState } from "react";

type StartMatchFormProps = {
    onStart: ({ home, away }: { home: string; away: string }) => void;
};

export const StartMatchForm = ({ onStart }: StartMatchFormProps) => {
    const [home, setHome] = useState("");
    const [away, setAway] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!home.trim() || !away.trim()) return;
        onStart({ home: home.trim(), away: away.trim() });
        setHome("");
        setAway("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center justify-center p-6 bg-white shadow-lg rounded-md w-80 mx-auto mt-20"
        >
            <input
                type="text"
                placeholder="Home Team"
                value={home}
                onChange={(e) => setHome(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Away Team"
                value={away}
                onChange={(e) => setAway(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
            >
                Start Match
            </button>
        </form>
    );
};
