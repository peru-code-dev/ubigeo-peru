import type { District } from '@/types.js';
import rawData from '@/data/districts.json' with { type: 'json' };

const data: Record<string, District[]> = rawData;
const flatData = Object.values(data).flat();
const byId = new Map(flatData.map((p) => [p.id, p]));
const byIneiCode = new Map<string, District>(flatData.map((d) => [d.ineiCode, d]));
const byReniecCode = new Map<string, District>(flatData.map((d) => [d.reniecCode, d]));
const searchable = flatData.map((d) => ({ district: d, name: d.name.toUpperCase() }));

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

        return searchable
            .filter((d) => d.name.includes(q))
            .map((d) => d.district);
    }

    findByIneiCode(code: string): District | null {
        return byIneiCode.get(code) ?? null;
    }

    findByReniecCode(code: string): District | null {
        return byReniecCode.get(code) ?? null;
    }
}

export default new DistrictProvider();
