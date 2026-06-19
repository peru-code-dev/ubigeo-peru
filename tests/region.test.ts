import { describe, expect, it } from "vitest";
import { regions } from "@/index.js";

describe("regions", () => {
    it("should return null for invalid code", () => {
        const region = regions.findByCode("9999999");
        expect(region).toBe(null);
    });
});
