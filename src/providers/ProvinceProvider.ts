import type { Province } from '@/types.js';
import rawData from '@/data/provinces.json' with { type: 'json' };

const data: Record<string, Province[]> = rawData;
const flatData = Object.values(data).flat();
const byId = new Map(flatData.map((p) => [p.id, p]));
const byIneiCode = new Map<string, Province>(flatData.map((p) => [p.ineiCode, p]));
const byReniecCode = new Map<string, Province>(flatData.map((p) => [p.reniecCode, p]));

class ProvinceProvider {
    byRegionId(regionId: number): readonly Province[] {
        return data[String(regionId)] ?? [];
    }

    find(id: number): Province | null {
        return byId.get(id) ?? null;
    }

    search(query: string): Province[] {
        const q = query.toUpperCase().trim();
        if (!q) return [];
        return flatData.filter((p) => p.name.toUpperCase().includes(q));
    }

    findByIneiCode(code: string): Province | null {
        return byIneiCode.get(code) ?? null;
    }

    findByReniecCode(code: string): Province | null {
        return byReniecCode.get(code) ?? null;
    }
}

export default new ProvinceProvider();
