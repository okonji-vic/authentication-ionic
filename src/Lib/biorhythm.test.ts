import { calculateBiorhythm } from "./biorhythm";

describe("calculateBiorhythm", () => {
    it("calculates the physical biorhythm", () => {
        const { physical } = calculateBiorhythm("1999-12-31", "2022-12-31");
        expect(physical).toBeCloseTo(0.9977);
    }
    );
    it("calculates the emotional biorhythm", () => {
        const { emotional } = calculateBiorhythm("1999-12-31", "2022-12-31");
        expect(emotional).toBeCloseTo(0.2225);
    }
    );
    it("calculates the intellectual biorhythm", () => {
        const { intellectual } = calculateBiorhythm("1999-12-31", "2022-12-31");
        expect(intellectual).toBeCloseTo(-0.4582);
    }
    );
}
);
