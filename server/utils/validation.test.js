const expect =  require("expect");

const {isRealString} = require("./validation");

describe("isRealString", () => {
    it("Should reject non string values", () => {
        var res  = isRealString(4567);
        expect(res).toBe(false);
    });

    it("Should reject empty strings", () => {
        var res = isRealString("   ");
        expect(res).toBe(false);
    });

    it("Should accept a real string", () => {
        var res  = isRealString("Anass");
        expect(res).toBe(true);
    });
});