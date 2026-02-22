/**
 * @package    removeheights
 * @author     Brian Teeman
 * @copyright  (C) 2026 - Brian Teeman
 * @license    GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */

tinymce.PluginManager.add('remove_heights', function (editor) {

  // ---- 1️ Disable row resizing after init ----
  editor.on('init', function () {
    if (editor.plugins.table) {
      // Overrides the table plugin row-resizing function to disable dragging rows
      editor.plugins.table.resizeRows = function () {
        // noop → disables dragging
      };
    }
  });

  // ---- 2️ HTML cleaning function ----
  function cleanHtml(html) {
    if (!html) return html;

    // Remove height from style attributes
    html = html.replace(
      /(<t[drh][^>]*?)\sstyle="([^"]*)"/gi,
      function (match, start, styles) {
        let cleaned = styles.replace(/(^|;)\s*height\s*:\s*[^;]+;?/gi, '$1');
        cleaned = cleaned.replace(/;;+/g, ';').trim().replace(/^;|;$/g, '');
        return cleaned ? start + ' style="' + cleaned + '"' : start;
      }
    );

    // Remove legacy height HTML attribute
    html = html.replace(/(<t[drh][^>]*?)\sheight="[^"]*"/gi, '$1');

    return html;
  }

  // ---- 3️ Hook into TinyMCE events defensively ----
  editor.on('BeforeSetContent', function (e) {
    if (e && e.content) {
      e.content = cleanHtml(e.content);
    }
  });

  editor.on('BeforeGetContent', function (e) {
    if (e && e.content) {
      e.content = cleanHtml(e.content);
    }
  });

  editor.on('PastePostProcess', function (e) {
    if (e && e.node && e.node.innerHTML) {
      e.node.innerHTML = cleanHtml(e.node.innerHTML);
    }
  });

  editor.on('input change SetContent', function () {
    const body = editor.getBody();
    if (!body) return;
    body.querySelectorAll('td, tr, th').forEach(el => {
      el.removeAttribute('height');
      const styleAttr = el.getAttribute('style');
      if (!styleAttr) return;
      let cleaned = styleAttr.replace(/(^|;)\s*height\s*:\s*[^;]+;?/gi, '$1');
      cleaned = cleaned.replace(/;;+/g, ';').trim().replace(/^;|;$/g, '');
      if (cleaned) el.setAttribute('style', cleaned);
      else el.removeAttribute('style');
    });
  });

  return {
    getMetadata: function() {
      return {
        name: 'Remove Heights (Brian Teeman)',
        url: 'https://github.com/brianteeman/remove_heights/blob/main/README.md'
      };
    }
  };
});
