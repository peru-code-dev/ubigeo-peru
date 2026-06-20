// src/index.ts
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
    all: () => regionProvider.all(),
    find: (id: number) => regionProvider.find(id),
    findByCode: (code: string) => regionProvider.findByCode(code),
    expand: (id: number) => regionProvider.expand(id),
};

export const departments = regions;

export const provinces = {
    byRegion: (regionId: number) => provinceProvider.byRegion(regionId),
    find: (id: number) => provinceProvider.find(id),
    findByCode: (code: string) => provinceProvider.findByCode(code),
    search: (query: string) => provinceProvider.search(query),
};

export const districts = {
    byProvince: (provinceId: number) => districtProvider.byProvince(provinceId),
    find: (id: number) => districtProvider.find(id),
    findByUbigeo: (ubigeo: string) => districtProvider.findByUbigeo(ubigeo),
    search: (query: string) => districtProvider.search(query),
};
