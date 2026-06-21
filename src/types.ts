export interface Region {
    readonly id: number;
    readonly name: string;
    readonly ineiCode: string;
    readonly reniecCode: string;
}

export interface Province {
    readonly id: number;
    readonly name: string;
    readonly ineiCode: string;
    readonly reniecCode: string;
}

export interface District {
    readonly id: number;
    readonly name: string;
    readonly ineiCode: string;
    readonly reniecCode: string;
}

export interface ExpandedProvince extends Province {
    readonly districts: readonly District[];
}

export interface ExpandedRegion extends Region {
    readonly provinces: readonly ExpandedProvince[];
}
