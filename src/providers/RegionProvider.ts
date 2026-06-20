import type { Region, ExpandedRegion } from '@/types.js';
import provinceProvider from '@/providers/ProvinceProvider.js';
import districtProvider from '@/providers/DistrictProvider.js';
import rawData from '@/data/regions.json' with { type: 'json' };

class RegionProvider {
    readonly #data: readonly Region[] = rawData as Region[];

    readonly #byId = new Map(
        this.#data.map(region => [region.id, region])
    );

    readonly #byIneiCode = new Map(
        this.#data.map(region => [region.ineiCode, region])
    );

    readonly #byReniecCode = new Map(
        this.#data.map(region => [region.reniecCode, region])
    );

    all(): readonly Region[] {
        return this.#data;
    }

    find(id: number): Region | null {
        return this.#byId.get(id) ?? null;
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

    findByIneiCode(code: string): Region | null {
        return this.#byIneiCode.get(code) ?? null;
    }

    findByReniecCode(code: string): Region | null {
        return this.#byReniecCode.get(code) ?? null;
    }
}

export default new RegionProvider();
