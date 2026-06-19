import type { District } from '../types.js';
import rawData from '../data/districts.json' with { type: 'json' };

const typedData = rawData as Record<string, District[]>;
const flatData = Object.values(typedData).flat();
const mapByUbigeo = new Map<string, District>(
    flatData.map(d => [d.ubigeo, d])
);

class DistrictProvider {
    readonly #data: Record<string, District[]> = typedData;
    readonly #flat: readonly District[] = flatData;
    readonly #byUbigeo: Map<string, District> = mapByUbigeo;

    byProvince(provinceId: number): readonly District[] {
        return this.#data[provinceId] ?? [];
    }

    find(id: number): District | null {
        return this.#flat.find(d => d.id === id) ?? null;
    }

    findByUbigeo(ubigeo: string): District | null {
        return this.#byUbigeo.get(ubigeo) ?? null;
    }

    search(query: string): District[] {
        const q = query.toUpperCase().trim();
        if (!q) return [];
        return this.#flat.filter(d => d.name.toUpperCase().includes(q));
    }
}

export default new DistrictProvider();
