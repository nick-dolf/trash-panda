const escape = require("./utils/escape")

describe("Utilities", ()=> {

  test("Html Escape, no special character", () => {
    expect(escape.htmlEscape("plain text")).toBe("plain text")
  })
})