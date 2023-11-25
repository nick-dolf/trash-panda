/**
 * Escapes Html characters
 * @param {String} str - to be escaped 
 * @returns escaped string
 */
function htmlEscape(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");        
}


module.exports = { htmlEscape }