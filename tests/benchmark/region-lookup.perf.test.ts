import { describe, it } from 'vitest';
import { regions } from '@/index.js';

const ITERATIONS = 10_000;
const SAMPLES = regions.all();

const existingCodes = SAMPLES.map(r => r.ineiCode);
const nonExistingCodes = ['99999', '00000', 'xxxxx', '', 'abcde'];
const mixedQueries = [
    ...existingCodes.slice(0, 100),
    ...nonExistingCodes,
];

describe('RegionProvider — performance benchmark', () => {
    it('should benchmark findByIneiCode vs findByReniecCode', () => {
        const results = [
            benchmark('findByIneiCode (Map.get O(1))', q => regions.findByIneiCode(q), mixedQueries, ITERATIONS),
            benchmark('findByReniecCode (Map.get O(1))', q => regions.findByReniecCode(q), mixedQueries, ITERATIONS),
        ];
        console.table(results);
    });

    it('should benchmark with 100% existing codes (hits)', () => {
        const r = [
            benchmark('findByIneiCode (hits only)', q => regions.findByIneiCode(q), existingCodes, ITERATIONS),
            benchmark('findByReniecCode (hits only)', q => regions.findByReniecCode(q), existingCodes, ITERATIONS),
        ];
        console.table(r);
    });

    it('should benchmark with 100% non-existing codes (misses)', () => {
        const r = [
            benchmark('findByIneiCode (misses only)', q => regions.findByIneiCode(q), nonExistingCodes, ITERATIONS),
            benchmark('findByReniecCode (misses only)', q => regions.findByReniecCode(q), nonExistingCodes, ITERATIONS),
        ];
        console.table(r);
    });
});

function benchmark(
    label: string,
    fn: (code: string) => unknown,
    queries: string[],
    iterations: number,
): { label: string; totalMs: number; avgUs: number; opsPerSec: number } {
    for (let i = 0; i < 1000; i++) {
        fn(queries[i % queries.length]);
    }

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fn(queries[i % queries.length]);
    }

    const totalMs = performance.now() - start;
    const avgUs = (totalMs / iterations) * 1000;
    const opsPerSec = Math.round(iterations / (totalMs / 1000));

    return { label, totalMs: +totalMs.toFixed(2), avgUs: +avgUs.toFixed(3), opsPerSec };
}
