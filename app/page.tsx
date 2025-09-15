'use client';
import { useState } from 'react';
import { ScoreboardTable } from '@/components/ScoreboardTable/ScoreboardTable';
import { Scoreboard } from '../lib/Scoreboard/Scoreboard';
import { InMemoryMatchRepository } from '../lib/Scoreboard/scoreboard.repo';
import { SystemTimeProvider } from '../lib/Scoreboard/TimeProvider';
import { StartMatchForm } from '@/components/StartMatchFrom/StartMatchForm';

const repo = new InMemoryMatchRepository();
const timeProvider = new SystemTimeProvider();
const scoreboard = new Scoreboard(repo, timeProvider);

export default function Home() {
  const [matches, setMatches] = useState(scoreboard.getSummary());

  const handleStartMatch = ({ home, away }: { home: string; away: string }) => {
    scoreboard.startMatch(home, away);
    setMatches(scoreboard.getSummary());
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <ScoreboardTable matches={matches} />
      <StartMatchForm onStart={handleStartMatch} />
    </div>
  );
}
