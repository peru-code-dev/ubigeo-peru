import { describe, it, expect } from 'vitest';
import { regions, departments } from '@/index.js';
import type { ExpandedRegion } from '@/types.js';

describe('RegionProvider', () => {
    describe('all()', () => {
        it('should return all 25 regions', () => {
            const result = regions.all();
            expect(result).toHaveLength(25);
        });

        it('should return regions with correct structure', () => {
            const result = regions.all();
            result.forEach(r => {
                expect(r).toHaveProperty('id');
                expect(r).toHaveProperty('name');
                expect(r).toHaveProperty('code');
                expect(typeof r.id).toBe('number');
                expect(typeof r.name).toBe('string');
                expect(typeof r.code).toBe('string');
            });
        });

        it('should not contain duplicate ids or codes', () => {
            const result = regions.all();
            const ids = result.map(r => r.id);
            const codes = result.map(r => r.code);
            expect(new Set(ids).size).toBe(ids.length);
            expect(new Set(codes).size).toBe(codes.length);
        });
    });

    describe('find()', () => {
        it('should return region for existing id 1', () => {
            const result = regions.find(1);
            expect(result).toBeDefined();
            expect(result!.name).toBe('AMAZONAS');
            expect(result!.code).toBe('01');
        });

        it('should return region for existing id 15', () => {
            const result = regions.find(15);
            expect(result).toBeDefined();
            expect(result!.name).toBe('LIMA');
            expect(result!.code).toBe('15');
        });

        it('should return region for existing id 25', () => {
            const result = regions.find(25);
            expect(result).toBeDefined();
            expect(result!.name).toBe('UCAYALI');
        });

        it('should return null for non-existing id', () => {
            expect(regions.find(999)).toBeNull();
        });

        it('should return null for id 0', () => {
            expect(regions.find(0)).toBeNull();
        });

        it('should return null for negative id', () => {
            expect(regions.find(-1)).toBeNull();
        });
    });

    describe('findByCode()', () => {
        it('should return region for existing code "01"', () => {
            const result = regions.findByCode('01');
            expect(result).toBeDefined();
            expect(result!.id).toBe(1);
            expect(result!.name).toBe('AMAZONAS');
        });

        it('should return region for existing code "15" (Lima)', () => {
            const result = regions.findByCode('15');
            expect(result).toBeDefined();
            expect(result!.name).toBe('LIMA');
        });

        it('should return region for all valid codes', () => {
            const codes = Array.from({length: 25}, (_, i) =>
                String(i + 1).padStart(2, '0')
            );
            codes.forEach(code => {
                expect(regions.findByCode(code)).toBeDefined();
            });
        });

        it('should return null for non-existing code', () => {
            expect(regions.findByCode('9999')).toBeNull();
        });

        it('should return null for empty string', () => {
            expect(regions.findByCode('')).toBeNull();
        });

        it('should be case-sensitive', () => {
            expect(regions.findByCode('01')).toBeDefined();
        });

        it('should handle type coercion correctly', () => {
            expect(regions.findByCode('01')).toBeDefined();
            expect(regions.findByCode(1 as unknown as string)).toBeNull();
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
            expect(regions.expand(999)).toBeNull();
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

        it('should return all 25 departments', () => {
            const result = departments.all();
            expect(result).toHaveLength(25);
        });
    });
});
