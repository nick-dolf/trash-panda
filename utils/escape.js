/**
 * Escapes Html characters
 * @param {String} str - to be escaped 
 * @returns escaped string
 */
function html(str) {
  return str.replace(/&(?!amp;)/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");        
}

function regex(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

module.exports = { html, regex }