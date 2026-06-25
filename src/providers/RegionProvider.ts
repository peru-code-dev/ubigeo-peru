import type { Region, ExpandedRegion } from '@/types.js';
import provinceProvider from '@/providers/ProvinceProvider.js';
import districtProvider from '@/providers/DistrictProvider.js';
import rawData from '@/data/regions.json' with { type: 'json' };

const data: readonly Region[] = rawData;
const byId = new Map(data.map(region => [region.id, region]));
const byIneiCode = new Map(data.map(region => [region.ineiCode, region]));
const byReniecCode = new Map(data.map(region => [region.reniecCode, region]));

class RegionProvider {

    all(): readonly Region[] {
        return data;
    }

    find(id: number): Region | null {
        return byId.get(id) ?? null;
    }

    expand(id: number): ExpandedRegion | null {
        const region = this.find(id);
        if (!region) return null;

        const provinces = provinceProvider.byRegionId(id).map(p => ({
            ...p,
            districts: districtProvider.byProvinceId(p.id),
        }));

        return { ...region, provinces };
    }

    findByIneiCode(code: string): Region | null {
        return byIneiCode.get(code) ?? null;
    }

    findByReniecCode(code: string): Region | null {
        return byReniecCode.get(code) ?? null;
    }
}

export default new RegionProvider();
