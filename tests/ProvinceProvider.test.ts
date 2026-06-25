import { describe, it, expect } from 'vitest';
import { provinces } from '@/index.js';

describe('ProvinceProvider', () => {
    describe('byRegionId()', () => {
        it('should return provinces for region id 15 (Lima)', () => {
            const result = provinces.byRegionId(15);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBeGreaterThan(0);
        });

        it('should return provinces with correct structure', () => {
            const result = provinces.byRegionId(15);
            result.forEach(p => {
                expect(p).toHaveProperty('id');
                expect(p).toHaveProperty('name');
                expect(p).toHaveProperty('ineiCode');
                expect(p).toHaveProperty('reniecCode');
                expect(typeof p.id).toBe('number');
                expect(typeof p.name).toBe('string');
                expect(typeof p.ineiCode).toBe('string');
                expect(typeof p.reniecCode).toBe('string');
            });
        });

        it('should return exact province names for Lima region', () => {
            const result = provinces.byRegionId(15);
            const names = result.map(p => p.name);
            expect(names).toContain('LIMA');
            expect(names).toContain('BARRANCA');
            expect(names).toContain('CAJATAMBO');
        });

        it('should return empty array for region with no provinces', () => {
            const result = provinces.byRegionId(999);
            expect(result).toEqual([]);
        });

        it('should return empty array for negative id', () => {
            expect(provinces.byRegionId(-1)).toEqual([]);
        });

        it('should return empty array for id 0', () => {
            expect(provinces.byRegionId(0)).toEqual([]);
        });

        it('should return provinces for region id 1 (Amazonas) if data exists', () => {
            const result = provinces.byRegionId(1);
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('find()', () => {
        it('should return province for existing id 15 (Lima)', () => {
            const result = provinces.find(128);
            expect(result).toBeDefined();
            expect(result!.name).toBe('LIMA');
            expect(result!.ineiCode).toBe('1501');
            expect(result!.reniecCode).toBe('1401');
        });

        it('should return province for existing id 129 (Barranca)', () => {
            const result = provinces.find(129);
            expect(result).toBeDefined();
            expect(result!.name).toBe('BARRANCA');
        });

        it('should return province for existing id 130 (Cajatambo)', () => {
            const result = provinces.find(130);
            expect(result).toBeDefined();
            expect(result!.name).toBe('CAJATAMBO');
        });

        it('should return null for non-existing id', () => {
            expect(provinces.find(999)).toBeNull();
        });

        it('should return null for id 0', () => {
            expect(provinces.find(0)).toBeNull();
        });

        it('should return null for negative id', () => {
            expect(provinces.find(-1)).toBeNull();
        });

        it('should not contain duplicate ids', () => {
            const ids: number[] = [];
            for (const p of [provinces.find(141), provinces.find(142), provinces.find(143)]) {
                if (p) ids.push(p.id);
            }
            expect(new Set(ids).size).toBe(ids.length);
        });
    });

    describe('findByIneiCode()', () => {
        it('should return province for existing ineiCode "1501" (Lima)', () => {
            const result = provinces.findByIneiCode('1501');
            expect(result).toBeDefined();
            expect(result!.id).toBe(128);
            expect(result!.name).toBe('LIMA');
        });

        it('should return province for existing ineiCode "1502" (Barranca)', () => {
            const result = provinces.findByIneiCode('1502');
            expect(result).toBeDefined();
            expect(result!.name).toBe('BARRANCA');
        });

        it('should return province for existing ineiCode "1503" (Cajatambo)', () => {
            const result = provinces.findByIneiCode('1503');
            expect(result).toBeDefined();
            expect(result!.name).toBe('CAJATAMBO');
        });

        it('should return null for non-existing ineiCode', () => {
            expect(provinces.findByIneiCode('999999')).toBeNull();
        });

        it('should return null for empty string', () => {
            expect(provinces.findByIneiCode('')).toBeNull();
        });
    });

    describe('findByReniecCode()', () => {
        it('should return province for existing reniecCode "1401" (Lima)', () => {
            const result = provinces.findByReniecCode('1401');
            expect(result).toBeDefined();
            expect(result!.id).toBe(128);
            expect(result!.name).toBe('LIMA');
        });

        it('should return province for existing reniecCode "1409" (Barranca)', () => {
            const result = provinces.findByReniecCode('1409');
            expect(result).toBeDefined();
            expect(result!.name).toBe('BARRANCA');
        });

        it('should return province for existing reniecCode "1402" (Cajatambo)', () => {
            const result = provinces.findByReniecCode('1402');
            expect(result).toBeDefined();
            expect(result!.name).toBe('CAJATAMBO');
        });

        it('should return null for non-existing reniecCode', () => {
            expect(provinces.findByReniecCode('999999')).toBeNull();
        });

        it('should return null for empty string', () => {
            expect(provinces.findByReniecCode('')).toBeNull();
        });
    });

    describe('search()', () => {
        it('should find provinces by exact name (uppercase)', () => {
            const result = provinces.search('LIMA');
            expect(result.length).toBeGreaterThan(0);
            expect(result.some(p => p.name === 'LIMA')).toBe(true);
        });

        it('should find provinces by partial name (case-insensitive)', () => {
            const result = provinces.search('lima');
            expect(result.length).toBeGreaterThan(0);
        });

        it('should find provinces by partial substring', () => {
            const result = provinces.search('RAN');
            expect(result.length).toBeGreaterThan(0);
            expect(result.some(p => p.name === 'BARRANCA')).toBe(true);
        });

        it('should return empty array for non-existing name', () => {
            const result = provinces.search('NONEXISTENT_PROVINCE_XYZ');
            expect(result).toEqual([]);
        });

        it('should return empty array for empty query', () => {
            expect(provinces.search('')).toEqual([]);
        });

        it('should return empty array for whitespace-only query', () => {
            expect(provinces.search('   ')).toEqual([]);
        });

        it('should trim query before searching', () => {
            const result = provinces.search('  LIMA  ');
            expect(result.length).toBeGreaterThan(0);
        });

        it('should not contain duplicates in results', () => {
            const result = provinces.search('LIMA');
            const ids = result.map(p => p.id);
            expect(new Set(ids).size).toBe(ids.length);
        });
    });
});
