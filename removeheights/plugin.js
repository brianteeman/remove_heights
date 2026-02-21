/**
 * @package    removeheights
 * @author     Brian Teeman
 * @copyright  (C) 2026 - Brian Teeman
 * @license    GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */

tinymce.PluginManager.add('remove_heights', function(editor) {

  // Function to strip height from table elements
  function stripHeight(node) {
    if (!node) return;
    if ((node.nodeName === 'TD' || node.nodeName === 'TR') && node.style.height) {
      node.style.height = '';
    }
    // Recursively clean child nodes
    node.childNodes.forEach(stripHeight);
  }

  // Run after every change
  editor.on('NodeChange', function(e) {
    stripHeight(editor.getBody());
  });

  // Also run before getContent (e.g., when submitting)
  editor.on('BeforeGetContent', function(e) {
    stripHeight(editor.getBody());
  });

  return {
    getMetadata: function() {
      return {
        name: 'Remove Heights',
        url: 'https://github.com/brianteeman/remove_heights/blob/main/README.md'
      };
    }
  };
});
