import type { Province } from '../types.js';
import rawData from '../data/provinces.json' with { type: 'json' };

const typedData = rawData as Record<string, Province[]>;
const flatData = Object.values(typedData).flat();
const mapByCode = new Map<string, Province>(
    flatData.map(p => [p.code, p])
);

class ProvinceProvider {
    readonly #data: Record<string, Province[]> = typedData;
    readonly #flat: readonly Province[] = flatData;
    readonly #byCode: Map<string, Province> = mapByCode;

    byRegion(regionId: number): readonly Province[] {
        return this.#data[regionId] ?? [];
    }

    find(id: number): Province | null {
        return this.#flat.find(p => p.id === id) ?? null;
    }

    findByCode(code: string): Province | null {
        return this.#byCode.get(code) ?? null;
    }

    search(query: string): Province[] {
        const q = query.toUpperCase().trim();
        if (!q) return [];
        return this.#flat.filter(p => p.name.toUpperCase().includes(q));
    }
}

export default new ProvinceProvider();
