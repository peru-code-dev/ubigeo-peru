import type {District, Region} from '@/types.js';
import rawData from '@/data/districts.json' with { type: 'json' };

const data = rawData as Record<string, District[]>;
const flatData = Object.values(data).flat();
const byId = new Map(flatData.map(p => [p.id, p]));
const byIneiCode = new Map<string, District>(flatData.map(d => [d.ineiCode, d]));
const byReniecCode = new Map<string, District>(flatData.map(d => [d.reniecCode, d]));

class DistrictProvider {

    byProvinceId(provinceId: number): readonly District[] {
        return data[String(provinceId)] ?? [];
    }

    find(id: number): District | null {
        return byId.get(id) ?? null;
    }

    search(query: string): District[] {
        const q = query.toUpperCase().trim();
        if (!q) return [];
        return flatData.filter(d => d.name.toUpperCase().includes(q));
    }

    findByIneiCode(code: string): Region | null {
        return byIneiCode.get(code) ?? null;
    }

    findByReniecCode(code: string): Region | null {
        return byReniecCode.get(code) ?? null;
    }
}

export default new DistrictProvider();
