import type { Province, Region } from '@/types.js';
import rawData from '@/data/provinces.json' with { type: 'json' };

const data = rawData as Record<string, Province[]>;
const flat = Object.values(data).flat();
const byId = new Map(flat.map(p => [p.id, p]));
const byIneiCode = new Map<string, Province>(flat.map(p => [p.ineiCode, p]));
const byReniecCode = new Map<string, Province>(flat.map(p => [p.reniecCode, p]));

class ProvinceProvider {

    byRegion(regionId: number): readonly Province[] {
        return data[String(regionId)] ?? [];
    }

    find(id: number): Province | null {
        return byId.get(id) ?? null;
    }

    search(query: string): Province[] {
        const q = query.toUpperCase().trim();
        if (!q) return [];
        return flat.filter(p => p.name.toUpperCase().includes(q));
    }

    findByIneiCode(code: string): Region | null {
        return byIneiCode.get(code) ?? null;
    }

    findByReniecCode(code: string): Region | null {
        return byReniecCode.get(code) ?? null;
    }
}

export default new ProvinceProvider();
