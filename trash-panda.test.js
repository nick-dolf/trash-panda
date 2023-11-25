const escape = require("./utils/escape")
const TrashPanda = require("./trash-panda")


describe("Utilities", ()=> {
  test("Html Escape, no special character", () => {
    expect(escape.html("plain text")).toBe("plain text")
  })

  test("Html Escape, blank string", () => {
    expect(escape.html("")).toBe("")
  })

  test("Html Escape, script tag", () => {
    expect(escape.html("<script>bad_func()</script>")).toBe("&lt;script&gt;bad_func()&lt;/script&gt;")
  })

  test("Html Escape, quotes", () => {
    expect(escape.html('"quotes"')).toBe('&quot;quotes&quot;')
  })

  test("Html Escape, ampersand", () => {
    expect(escape.html("&fter&amp;&")).toBe('&amp;fter&amp;&amp;')
  })
})

describe("Interpolation", ()=> {
  const trash = new TrashPanda({viewDir: "test"})

  test("plain string", ()=> {
    return trash.render("plain string").then(data => {
      expect(data).toBe("plain string")
    })
  })

  test("empty string", ()=> {
    return trash.render("").then(data => {
      expect(data).toBe("")
    })
  })

  test("escaped page variable", ()=> {
    return trash.render("#{page.greeting} World", {greeting: "Hello"}).then(data => {
      expect(data).toBe("Hello World")
    })
  })
})