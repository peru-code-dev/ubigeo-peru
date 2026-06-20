import {describe, it, expect} from 'vitest';
import {districts} from '@/index.js';

describe('DistrictProvider', () => {
    describe('byProvince()', () => {
        it('should return districts for province id 141 (Lima)', () => {
            const result = districts.byProvince(141);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBeGreaterThan(0);
        });

        it('should return districts with correct structure', () => {
            const result = districts.byProvince(141);
            result.forEach(d => {
                expect(d).toHaveProperty('id');
                expect(d).toHaveProperty('name');
                expect(d).toHaveProperty('ubigeo');
                expect(typeof d.id).toBe('number');
                expect(typeof d.name).toBe('string');
                expect(typeof d.ubigeo).toBe('string');
            });
        });

        it('should return known districts for Lima province', () => {
            const result = districts.byProvince(141);
            const names = result.map(d => d.name);
            expect(names).toContain('LIMA');
            expect(names).toContain('ANCON');
            expect(names).toContain('ATE');
            expect(names).toContain('BARRANCO');
            expect(names).toContain('BRENA');
        });

        it('should return empty array for province with no districts', () => {
            const result = districts.byProvince(999);
            expect(result).toEqual([]);
        });

        it('should return empty array for negative id', () => {
            expect(districts.byProvince(-1)).toEqual([]);
        });

        it('should return empty array for id 0', () => {
            expect(districts.byProvince(0)).toEqual([]);
        });

        it('should not contain duplicates', () => {
            const result = districts.byProvince(141);
            const ids = result.map(d => d.id);
            expect(new Set(ids).size).toBe(ids.length);
        });
    });

    describe('find()', () => {
        it('should return district for existing id 1401 (Lima)', () => {
            const result = districts.find(1401);
            expect(result).toBeDefined();
            expect(result!.name).toBe('LIMA');
            expect(result!.ubigeo).toBe('150101');
        });

        it('should return district for existing id 1402 (Ancon)', () => {
            const result = districts.find(1402);
            expect(result).toBeDefined();
            expect(result!.name).toBe('ANCON');
            expect(result!.ubigeo).toBe('150102');
        });

        it('should return district for existing id 1405 (Brena)', () => {
            const result = districts.find(1405);
            expect(result).toBeDefined();
            expect(result!.name).toBe('BRENA');
        });

        it('should return null for non-existing id', () => {
            expect(districts.find(9999)).toBeNull();
        });

        it('should return null for id 0', () => {
            expect(districts.find(0)).toBeNull();
        });

        it('should return null for negative id', () => {
            expect(districts.find(-1)).toBeNull();
        });
    });

    describe('findByUbigeo()', () => {
        it('should return district for existing ubigeo "150101" (Lima)', () => {
            const result = districts.findByUbigeo('150101');
            expect(result).toBeDefined();
            expect(result!.id).toBe(1401);
            expect(result!.name).toBe('LIMA');
        });

        it('should return district for existing ubigeo "150105" (Brena)', () => {
            const result = districts.findByUbigeo('150105');
            expect(result).toBeDefined();
            expect(result!.name).toBe('BRENA');
        });

        it('should return null for non-existing ubigeo', () => {
            expect(districts.findByUbigeo('999999')).toBeNull();
        });

        it('should return null for empty string', () => {
            expect(districts.findByUbigeo('')).toBeNull();
        });

        it('should handle type coercion correctly', () => {
            expect(districts.findByUbigeo(150101 as unknown as string)).toBeNull();
        });
    });

    describe('search()', () => {
        it('should find districts by exact name (uppercase)', () => {
            const result = districts.search('LIMA');
            expect(result.length).toBeGreaterThan(0);
            expect(result.some(d => d.name === 'LIMA')).toBe(true);
        });

        it('should find districts by partial name (case-insensitive)', () => {
            const result = districts.search('ancon');
            expect(result.length).toBeGreaterThan(0);
            expect(result.some(d => d.name === 'ANCON')).toBe(true);
        });

        it('should find districts by partial substring', () => {
            const result = districts.search('RAN');
            expect(result.length).toBeGreaterThan(0);
            expect(result.some(d => d.name === 'BARRANCO')).toBe(true);
        });

        it('should return empty array for non-existing name', () => {
            const result = districts.search('NONEXISTENT_DISTRICT_XYZ');
            expect(result).toEqual([]);
        });

        it('should return empty array for empty query', () => {
            expect(districts.search('')).toEqual([]);
        });

        it('should return empty array for whitespace-only query', () => {
            expect(districts.search('   ')).toEqual([]);
        });

        it('should trim query before searching', () => {
            const result = districts.search('  ATE  ');
            expect(result.length).toBeGreaterThan(0);
        });

        it('should not contain duplicates in results', () => {
            const result = districts.search('LIMA');
            const ids = result.map(d => d.id);
            expect(new Set(ids).size).toBe(ids.length);
        });
    });
});
