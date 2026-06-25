import type { Region, Province, District, ExpandedRegion } from './types.js';
import regionProvider   from './providers/RegionProvider.js';
import provinceProvider from './providers/ProvinceProvider.js';
import districtProvider from './providers/DistrictProvider.js';

export type {
    Region,
    Province,
    District,
    ExpandedRegion,
    ExpandedProvince
} from './types.js';

export const regions = {
    all: (): readonly Region[] => regionProvider.all(),
    find: (id: number): Region | null => regionProvider.find(id),
    expand: (id: number): ExpandedRegion | null => regionProvider.expand(id),
    findByIneiCode: (code: string): Region | null => regionProvider.findByIneiCode(code),
    findByReniecCode: (code: string): Region | null => regionProvider.findByReniecCode(code),
};

export const departments = regions;

export const provinces = {
    byRegionId: (regionId: number): readonly Province[] => provinceProvider.byRegionId(regionId),
    find: (id: number): Province | null => provinceProvider.find(id),
    search: (query: string): Province[] => provinceProvider.search(query),
    findByIneiCode: (code: string): Province | null => provinceProvider.findByIneiCode(code),
    findByReniecCode: (code: string): Province | null => provinceProvider.findByReniecCode(code),
};

export const districts = {
    byProvinceId: (provinceId: number): readonly District[] => districtProvider.byProvinceId(provinceId),
    find: (id: number): District | null => districtProvider.find(id),
    search: (query: string): District[] => districtProvider.search(query),
    findByIneiCode: (code: string): District | null => districtProvider.findByIneiCode(code),
    findByReniecCode: (code: string): District | null => districtProvider.findByReniecCode(code),
};
