const escape = require("./utils/escape")

describe("Utilities", ()=> {

  test("Html Escape, no special character", () => {
    expect(escape.htmlEscape("plain text")).toBe("plain text")
  })

  test("Html Escape, blank string", () => {
    expect(escape.htmlEscape("")).toBe("")
  })

  test("Html Escape, script tag", () => {
    expect(escape.htmlEscape("<script>bad_func()</script>")).toBe("&lt;script&gt;bad_func()&lt;/script&gt;")
  })

  test("Html Escape, quotes", () => {
    expect(escape.htmlEscape('"quotes"')).toBe('&quot;quotes&quot;')
  })

  test("Html Escape, ampersand", () => {
    expect(escape.htmlEscape("&fter&amp;&")).toBe('&amp;fter&amp;&amp;')
  })
})