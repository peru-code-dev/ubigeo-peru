import { describe, it, expect } from 'vitest';
import { regions, departments } from '@/index.js';
import type { ExpandedRegion } from '@/types.js';

describe('RegionProvider', () => {
    const TOTAL_REGIONS = 25;

    describe('all()', () => {
        it(`should return all ${TOTAL_REGIONS} regions`, () => {
            const result = regions.all();
            expect(result).toHaveLength(TOTAL_REGIONS);
        });

        it('should return regions with correct structure including ineiCode and reniecCode', () => {
            const result = regions.all();
            result.forEach(r => {
                expect(r).toHaveProperty('id');
                expect(r).toHaveProperty('name');
                expect(r).toHaveProperty('ineiCode');
                expect(r).toHaveProperty('reniecCode');
                expect(typeof r.id).toBe('number');
                expect(typeof r.name).toBe('string');
                expect(typeof r.ineiCode).toBe('string');
                expect(typeof r.reniecCode).toBe('string');
            });
        });

        it('should not contain duplicate ids, ineiCodes or reniecCodes', () => {
            const result = regions.all();
            const ids = result.map(r => r.id);
            const inei = result.map(r => r.ineiCode);
            const reniec = result.map(r => r.reniecCode);
            expect(new Set(ids).size).toBe(ids.length);
            expect(new Set(inei).size).toBe(inei.length);
            expect(new Set(reniec).size).toBe(reniec.length);
        });
    });

    describe('find()', () => {
        it('should return region for existing id 1', () => {
            const result = regions.find(1);
            expect(result).toBeDefined();
            expect(result!.name).toBe('AMAZONAS');
            expect(result!.ineiCode).toBe('01');
            expect(result!.reniecCode).toBe('01');
        });

        it('should return region for existing id 15', () => {
            const result = regions.find(15);
            expect(result).toBeDefined();
            expect(result!.name).toBe('LIMA');
            expect(result!.ineiCode).toBe('15');
        });

        it('should return region for existing id 25', () => {
            const result = regions.find(25);
            expect(result).toBeDefined();
            expect(result!.name).toBe('UCAYALI');
        });

        it('should return null for non-existing id', () => {
            expect(regions.find(99999)).toBeNull();
        });

        it('should return null for id 0', () => {
            expect(regions.find(0)).toBeNull();
        });

        it('should return null for negative id', () => {
            expect(regions.find(-1)).toBeNull();
        });
    });

    describe('findByIneiCode()', () => {
        it('should return region for existing ineiCode "01" (Amazonas)', () => {
            const result = regions.findByIneiCode('01');
            expect(result).toBeDefined();
            expect(result!.id).toBe(1);
            expect(result!.name).toBe('AMAZONAS');
        });

        it('should return region for existing ineiCode "15" (Lima)', () => {
            const result = regions.findByIneiCode('15');
            expect(result).toBeDefined();
            expect(result!.name).toBe('LIMA');
        });

        it('should return region for existing ineiCode "25" (Ucayali, last record)', () => {
            const result = regions.findByIneiCode('25');
            expect(result).toBeDefined();
            expect(result!.id).toBe(25);
            expect(result!.name).toBe('UCAYALI');
        });

        it('should return null for non-existing ineiCode', () => {
            expect(regions.findByIneiCode('99999')).toBeNull();
        });

        it('should return null for empty string', () => {
            expect(regions.findByIneiCode('')).toBeNull();
        });
    });

    describe('findByReniecCode()', () => {
        it('should return region for existing reniecCode "01" (Amazonas)', () => {
            const result = regions.findByReniecCode('01');
            expect(result).toBeDefined();
            expect(result!.id).toBe(1);
            expect(result!.name).toBe('AMAZONAS');
        });

        it('should return region for existing reniecCode "15" (Lima)', () => {
            const result = regions.findByReniecCode('15');
            expect(result).toBeDefined();
            expect(result!.name).toBe('LIMA');
        });

        it('should return region for existing reniecCode "25" (Ucayali, last record)', () => {
            const result = regions.findByReniecCode('25');
            expect(result).toBeDefined();
            expect(result!.id).toBe(25);
            expect(result!.name).toBe('UCAYALI');
        });

        it('should return null for non-existing reniecCode', () => {
            expect(regions.findByReniecCode('99999')).toBeNull();
        });

        it('should return null for empty string', () => {
            expect(regions.findByReniecCode('')).toBeNull();
        });
    });

    describe('expand()', () => {
        it('should return expanded region with provinces for id 15 (Lima)', () => {
            const result = regions.expand(15);
            expect(result).toBeDefined();
            expect(result!.id).toBe(15);
            expect(result!.name).toBe('LIMA');
            expect(result!.provinces).toBeInstanceOf(Array);
        });

        it('should include districts in each expanded province', () => {
            const result = regions.expand(15);
            expect(result).toBeDefined();
            result!.provinces.forEach(province => {
                expect(province).toHaveProperty('id');
                expect(province).toHaveProperty('name');
                expect(province).toHaveProperty('code');
                expect(province.districts).toBeInstanceOf(Array);
            });
        });

        it('should return null for non-existing id', () => {
            expect(regions.expand(99999)).toBeNull();
        });

        it('should return correct structure matching ExpandedRegion type', () => {
            const result = regions.expand(15) as ExpandedRegion;
            expect(result).toBeDefined();
            expect(result.provinces).toBeInstanceOf(Array);
            if (result.provinces.length > 0) {
                const firstProvince = result.provinces[0];
                expect(firstProvince.districts).toBeInstanceOf(Array);
            }
        });
    });

    describe('departments alias', () => {
        it('should be the same reference as regions', async () => {
            const {departments} = await import('@/index.js');
            expect(departments).toBe(regions);
        });

        it(`should return all ${TOTAL_REGIONS} departments`, () => {
            const result = departments.all();
            expect(result).toHaveLength(TOTAL_REGIONS);
        });
    });
});
