var expect = require("expect");

var {generateMessage} = require("./message");

describe("generateMessage", () => {
    it("Should generate the correct Message Object", () => {
        var from = "ANASS", text = "Hello World";
        // strore the result in a variable
        var res  = generateMessage(from, text);
        //  assert from match
        // expect(res.from).toBe(from);
        //  assert text match
        // expect(res.text).toBe(text);
        expect(res).toMatchObject({from, text});
        // assert createdAt is number
        expect(typeof res.createdAt).toBe("number");
    });
});