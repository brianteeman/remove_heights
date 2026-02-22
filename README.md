# Remove Heights TinyMCE Plugin for Joomla

## Overview

**Remove Heights** is a TinyMCE plugin for Joomla that:

* Automatically removes `height` styles from table cells (`<td>`), table rows (`<tr>`), and headers (`<th>`).
* Removes legacy `height="..."` HTML attributes.
* Prevents users from resizing table row heights by dragging in the editor.
* Works on **new tables, existing tables, and pasted content** (including Word tables).
* Fully defensive and safe for production use.

This ensures clean, consistent table markup and prevents layout issues caused by unwanted inline heights.

---

## Features

* **Height cleaning**: Strips `height:` from inline styles while keeping other styles intact (`text-align`, `vertical-align`, etc.).
* **Legacy support**: Removes `height="..."` HTML attributes for older content.
* **Row resize disabled**: Users cannot drag to change row heights in the editor.
* **DRY & Defensive**: Single `cleanHtml` function handles all cases; safely handles undefined or missing content.
* **Works everywhere**: New tables, existing tables, pasted content, and live editing.

---

## Installation

This is a plugin for the TinyMCE that has been packaged to be easy to install with Joomla. It installs like every other Joomla extension but has one additional step to add it to TinyMCE.

### TinyMCE Configuration
After installing **Remove Heights** go to the Joomla Plugin Manager on the System dashboard and open the Editor - TinyMCE plugin.

Once open scroll to the bottom where you will see the option to add External Plugin URLs. Enter the word **remove_heights** as the Plugin Name and /media/plg_editors_tinymce/js/plugins/removeheights/plugin.min.js as the Plugin URL.

Save your change and that's all you need to do.
---

## Usage

Once installed and enabled, the plugin works automatically:

* All existing tables in TinyMCE will have any `height` removed.
* Users cannot drag rows to change their height (all rows will be resized).
* Existing tables in content and pasted tables will be cleaned automatically.
* No additional configuration is required.

---

## Example

**Before:**

```html
<tr style="height: 20px;">
  <td style="height: 60px; text-align: right;">Content</td>
</tr>
```

**After:**

```html
<tr>
  <td style="text-align: right;">Content</td>
</tr>
```


## License

GPL Version 3