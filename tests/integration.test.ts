import { describe, it, expect } from 'vitest';
import { regions, provinces, districts } from '@/index.js';

describe('Integration: hierarchical relationships', () => {
    it('should traverse Region -> Province -> District chain for Lima', () => {
        const region = regions.findByIneiCode('15');
        expect(region).toBeDefined();
        expect(region!.name).toBe('LIMA');

        const regionProvinces = provinces.byRegionId(region!.id);
        expect(regionProvinces.length).toBeGreaterThan(0);

        const limaProvince = regionProvinces.find((p) => p.name === 'LIMA');
        expect(limaProvince).toBeDefined();
        expect(limaProvince!.ineiCode).toBe('1501');

        const provinceDistricts = districts.byProvinceId(limaProvince!.id);
        expect(provinceDistricts.length).toBeGreaterThan(0);

        const limaDistrict = provinceDistricts.find((d) => d.name === 'LIMA');
        expect(limaDistrict).toBeDefined();
        expect(limaDistrict!.ineiCode).toBe('150101');
    });

    it('should traverse Region -> Province -> District chain for Barranca', () => {
        const region = regions.find(15);
        expect(region).toBeDefined();

        const province = provinces.find(129);
        expect(province).toBeDefined();
        expect(province!.name).toBe('BARRANCA');
        expect(province!.ineiCode).toBe('1502');

        const districtsInProvince = districts.byProvinceId(province!.id);
        const names = districtsInProvince.map((p) => p.name);
        expect(names).toContain('BARRANCA');
        expect(names).toContain('PARAMONGA');
        expect(names).toContain('PATIVILCA');
        expect(names).toContain('SUPE PUERTO');
    });

    it('should return consistent data between expand() and individual lookups', () => {
        const expanded = regions.expand(15);
        expect(expanded).toBeDefined();

        const directProvinces = provinces.byRegionId(15);
        expect(expanded!.provinces.length).toBe(directProvinces.length);

        expanded!.provinces.forEach((ep, i) => {
            expect(ep.id).toBe(directProvinces[i].id);
            expect(ep.name).toBe(directProvinces[i].name);
            expect(ep.ineiCode).toBe(directProvinces[i].ineiCode);
        });
    });

    it('should find province then verify it belongs to correct region', () => {
        const limaProvince = provinces.findByIneiCode('1501');
        expect(limaProvince).toBeDefined();

        const limaRegion = regions.findByIneiCode('15');
        expect(limaRegion).toBeDefined();

        const regionProvinces = provinces.byRegionId(limaRegion!.id);
        expect(regionProvinces.some((p) => p.id === limaProvince!.id)).toBe(true);
    });

    it('should find district then verify it belongs to correct province', () => {
        const limaDistrict = districts.findByIneiCode('150101');
        expect(limaDistrict).toBeDefined();

        const limaProvince = provinces.find(128);
        expect(limaProvince).toBeDefined();

        const provinceDistricts = districts.byProvinceId(limaProvince!.id);
        expect(provinceDistricts.some((d) => d.id === limaDistrict!.id)).toBe(true);
    });

    it('should verify ubigeo code structure (regionCode + provinceCode + districtCode)', () => {
        const district = districts.findByIneiCode('150101');
        expect(district).toBeDefined();

        const ineiCode = district!.ineiCode;
        expect(ineiCode).toHaveLength(6);

        const regionCode = ineiCode.substring(0, 2);
        const provinceCode = ineiCode.substring(0, 4);

        const region = regions.findByIneiCode(regionCode);
        expect(region).toBeDefined();

        const province = provinces.findByIneiCode(provinceCode);
        expect(province).toBeDefined();
    });
});
