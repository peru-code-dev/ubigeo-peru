import type { Region, ExpandedRegion } from '../types.js';
import rawData from '../data/regions.json' with { type: 'json' };
import provinceProvider from './ProvinceProvider.js';
import districtProvider from './DistrictProvider.js';

class RegionProvider {
    readonly #data: readonly Region[] = rawData as Region[];

    all(): readonly Region[] {
        return this.#data;
    }

    find(id: number): Region | null {
        return this.#data.find(r => r.id === id) ?? null;
    }

    findByCode(code: string): Region | null {
        return this.#data.find(r => r.code === code) ?? null;
    }

    expand(id: number): ExpandedRegion | null {
        const region = this.find(id);
        if (!region) return null;

        const provinces = provinceProvider.byRegion(id).map(p => ({
            ...p,
            districts: districtProvider.byProvince(p.id),
        }));

        return { ...region, provinces };
    }
}

export default new RegionProvider();
