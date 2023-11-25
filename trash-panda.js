const escape = require("./utils/escape");
const fs = require("fs").promises;
const path = require("path");

class TrashPanda {
  constructor(opts = {}) {
    this.viewDir = path.join(process.cwd(), opts.viewDir || "views");
    this.openDelimeter = escape.regex(opts.openDelimeter || "{");
    this.closedDelimeter = escape.regex(opts.closedDelimeter || "}");
    this.escapeSelection = escape.regex(opts.escapeSelection || "#");
    this.unsafeSelection = escape.regex(opts.unsafeSelection || "!");
    this.linkSelection = escape.regex(opts.linkSelection || ":");
    this.include = escape.regex(opts.include || "in");
    this.includeOpenDelimeter = escape.regex(opts.includeOpenDelimeter || "<");
    this.includeClosedDelimeter = escape.regex(opts.includeClosedDelimeter || ">");
    this.site = opts.site;

    this.delimeterMatch = `${this.openDelimeter}(.*?)${this.closedDelimeter}`;
    this.escapeMatch = `${this.escapeSelection}${this.delimeterMatch}`;
    this.unsafeMatch = `${this.unsafeSelection}${this.delimeterMatch}`;
    this.linkMatch = `${this.linkSelection}${this.delimeterMatch}`;
    this.includeMatch = `${this.includeOpenDelimeter}${this.include} (.*?)${this.includeClosedDelimeter}`;
  }

  async render(str, page = {}, arg = {}) {
    let output = "";

    const regexp = new RegExp(this.escapeMatch + "|" + 
                              this.unsafeMatch + "|" +
                              this.linkMatch + "|" +
                              this.includeMatch, "g");

    let match;
    let lastIndex = 0;

    while ((match = regexp.exec(str)) !== null) {
      output += str.slice(lastIndex, match.index);

      if (match[1]) {
        output += escape.html(evaluate(this.site, page, arg, match[1]))
      } else if (match[2]) {
        output += evaluate(this.site, page, arg,  match[2])
      } else if (match[3]) {
        output += createLink(this.site, page, arg, match[3])
      } else if (match[4]) {
        const inner = match[4].trim()
        if(inner.slice(-1) === "/") {
          const args = inner.split(/\s+/)
          let file = args[0] +".tp"
          output += await this.render(file, page, arg)
        } else {
        }
        
      }

      lastIndex = regexp.lastIndex;
    }

    output += str.slice(lastIndex)
    return output;
  }
}


function evaluate(site, page, arg, src) {
  let out = "<body>error</error>"
  try {
    out = new Function("site", "page", "arg", "return "+ src)(site, page, arg)
  }
  catch(error) {
    out = `${error.message}`
  }

  return out
}

module.exports = TrashPanda;
