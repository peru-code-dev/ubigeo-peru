# @perucode/ubigeo-peru

[![npm version](https://img.shields.io/npm/v/@perucode/ubigeo-peru)](https://www.npmjs.com/package/@perucode/ubigeo-peru)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6)](https://www.typescriptlang.org/)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/@perucode/ubigeo-peru)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@perucode/ubigeo-peru)](https://bundlephobia.com/package/@perucode/ubigeo-peru)

Zero-dependency TypeScript SDK for Peru’s geographic codes (Ubigeo). Provides fast, type-safe access to all 25 regions, 196 provinces, and 1,893 districts — cross-matched from **INEI 2025** and **RENIEC 2026** official sources.

## Installation

```bash
npm install @perucode/ubigeo-peru
```

The package ships dual ESM/CJS builds with full TypeScript declarations.

Requires Node.js ≥ 22 or any modern ESM-compatible runtime.

## Quick Start

```ts
import { regions, provinces, districts, departments } from '@perucode/ubigeo-peru';
// `departments` is an alias for `regions`
```

### Basic lookups

```ts
regions.find(15);
// => { id: 15, name: "LIMA", ineiCode: "15", reniecCode: "14" }

provinces.find(128);
// => { id: 128, name: "LIMA", ineiCode: "1501", reniecCode: "1401" }

districts.find(1296);
// => { id: 1296, name: "LIMA", ineiCode: "150101", reniecCode: "140101" }
```

### Search

```ts
regions.search("cusco");
// => [{ id: 8, name: "CUSCO", ineiCode: "08", reniecCode: "07" }]

provinces.search("barran");
// => [{ id: 129, name: "BARRANCA", … }]
```

### Expand (full hierarchy)

> ⚠️ **Performance note:** `expand()` loads the complete province and district tree for a region. Prefer `provinces.byRegionId()` + `districts.byProvinceId()` for granular access.

```ts
const lima = regions.expand(15);
// ExpandedRegion {
//   …region fields,
//   provinces: [{
//     …province fields,
//     districts: [{ … }, …]
//   }, …]
// }
```

### Lookup by official codes

```ts
// INEI codes (INEI 2025)
regions.findByIneiCode("15");       // => LIMA
provinces.findByIneiCode("1501");   // => LIMA province
districts.findByIneiCode("150101"); // => LIMA district

// RENIEC codes (RENIEC 2026)
regions.findByReniecCode("14");     // => LIMA
provinces.findByReniecCode("1401"); // => LIMA province
```

### Browsing

```ts
provinces.byRegionId(15);    // all provinces in Lima region
districts.byProvinceId(128); // all districts in Lima province
regions.all();               // all 25 regions
```

## API Reference

> **Note:** The `id` field is an internal canonical identifier assigned by this SDK. For official government codes use `ineiCode` or `reniecCode`.

### `regions` / `departments`

`departments` is an alias for `regions` — use whichever terminology fits your domain.

| Method | Signature | Description |
|--------|-----------|-------------|
| `all` | `(): readonly Region[]` | Returns all 25 regions. |
| `find` | `(id: number): Region \| null` | O(1) lookup by internal canonical id. |
| `search` | `(query: string): Region[]` | Case-insensitive substring search on region names. |
| `expand` | `(id: number): ExpandedRegion \| null` | Returns the full region → province → district tree. Use sparingly — loads the full hierarchy. |
| `findByIneiCode` | `(code: string): Region \| null` | Lookup by INEI code (e.g. `"15"`). |
| `findByReniecCode` | `(code: string): Region \| null` | Lookup by RENIEC code (e.g. `"14"`). |

### `provinces`

| Method | Signature | Description |
|--------|-----------|-------------|
| `byRegionId` | `(regionId: number): readonly Province[]` | All provinces belonging to a region. |
| `find` | `(id: number): Province \| null` | O(1) lookup by internal canonical id. |
| `search` | `(query: string): Province[]` | Case-insensitive substring search on province names. |
| `findByIneiCode` | `(code: string): Province \| null` | Lookup by 4-digit INEI code (e.g. `"1501"`). |
| `findByReniecCode` | `(code: string): Province \| null` | Lookup by 4-digit RENIEC code (e.g. `"1401"`). |

### `districts`

| Method | Signature | Description |
|--------|-----------|-------------|
| `byProvinceId` | `(provinceId: number): readonly District[]` | All districts belonging to a province. |
| `find` | `(id: number): District \| null` | O(1) lookup by internal canonical id. |
| `search` | `(query: string): District[]` | Case-insensitive substring search on district names. |
| `findByIneiCode` | `(code: string): District \| null` | Lookup by 6-digit INEI code (e.g. `"150101"`). |
| `findByReniecCode` | `(code: string): District \| null` | Lookup by 6-digit RENIEC code. |

## TypeScript Types

```ts
interface Region {
  readonly id: number;
  readonly name: string;
  readonly ineiCode: string;
  readonly reniecCode: string;
}

interface Province {
  readonly id: number;
  readonly name: string;
  readonly ineiCode: string;
  readonly reniecCode: string;
}

interface District {
  readonly id: number;
  readonly name: string;
  readonly ineiCode: string;
  readonly reniecCode: string;
}

interface ExpandedProvince extends Province {
  readonly districts: readonly District[];
}

interface ExpandedRegion extends Region {
  readonly provinces: readonly ExpandedProvince[];
}
```

All exported types are available via `import type`:

```ts
import type { Region, Province, District, ExpandedRegion, ExpandedProvince } from '@perucode/ubigeo-peru';
```

## Data Sources

- **INEI 2025** — Instituto Nacional de Estadística e Informática
- **RENIEC 2026** — Registro Nacional de Identificación y Estado Civil

The two code systems are maintained separately because they diverge for certain regions (e.g. Callao: INEI `07` vs. RENIEC `24`). All records include both codes so you can cross-reference either standard.

| Level | Count     |
|-------|-----------|
| Regions | 25        |
| Provinces | 196       |
| Districts | 1,893     |
| **Total** | **2,114** |

## License

[MIT](./LICENSE)
