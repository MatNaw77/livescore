import { TimeProvider } from '@/lib/Scoreboard/TimeProvider';

export class MockTimeProvider implements TimeProvider {
    private currentTime: number;

    constructor(startTime = 0) {
        this.currentTime = startTime;
    }

    now() {
        return this.currentTime;
    }

    advance(ms: number) {
        this.currentTime += ms;
    }
}