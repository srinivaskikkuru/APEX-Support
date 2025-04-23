# Row Highlighting with jQuery

This code provides a simple jQuery-based solution for highlighting table rows based on specific data values in the second column of a table.

## Overview

The script scans through all cells in the second column of an HTML table and applies color highlighting to the entire row when it finds specific values:
- Rows containing "19767296" will be highlighted in red
- Rows containing "18401280" will be highlighted in green

## Code

```javascript
$(document).ready(function() {
   $("td:nth-child(2)").each(function() {
       if ($(this).text() === "19767296") {
           $(this).parent().children().css({'background-color': 'red'});
       }
       else if($(this).text() === "18401280"){
           $(this).parent().children().css({'background-color': 'green'});
       }
   });
});
```

## How It Works

1. The code executes when the document is fully loaded (`$(document).ready()`)
2. It selects all table cells in the second column using the CSS selector `td:nth-child(2)`
3. For each cell, it checks the text content:
   - If it matches "19767296", the entire row (parent) is highlighted in red
   - If it matches "18401280", the entire row is highlighted in green
4. The highlighting applies to all cells in the row using `$(this).parent().children()`

## Usage

Include this script in your HTML page after loading jQuery:

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    // Insert the row highlighting code here
</script>
```

## Customization

You can easily modify this script to:
- Change the target column by updating the selector (`td:nth-child(n)`)
- Use different highlight colors
- Add more conditions for different values
- Apply different styles beyond background colors

## Note

This is a client-side solution that works for static tables or tables loaded before the script runs. For dynamically loaded tables, you might need to trigger this function after the table content is updated.
