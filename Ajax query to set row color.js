# Highlighting Rows in Oracle APEX Interactive Reports Based on Cell Value

## Introduction
In Oracle APEX, you may need to **dynamically highlight rows** in an **Interactive Report (IR)** based on a specific column value. This can be achieved using **jQuery and JavaScript**.

This document explains how to change the **background color of an entire row** if a specific cell contains the value **"Total"**.

## Example Code

The following jQuery script checks if a **cell in the first column** contains the word `Total`. If it does, the entire row’s background color is changed to **red**.

```javascript
$(document).ready(function() {
    $("td:nth-child(0)").each(function() {
        if ($(this).text() === "Total") {
            $(this).parent().children().css({'background-color': 'red'});
        }
    });
});
```

## Explanation
1. `$(document).ready(function() {...})` → Ensures that the script runs **after the page loads**.
2. `$("td:nth-child(0)")` → **Selects the first column** (`nth-child(0)` should be `nth-child(1)`, since nth-child starts from 1, not 0).
3. `.each(function() {...})` → Iterates over each cell in the first column.
4. `if ($(this).text() === "Total")` → Checks if the cell’s text content is **"Total"**.
5. `$(this).parent().children().css({'background-color': 'red'})` → Changes the background color of **all cells in the same row**.

## Fixing the Selector Issue
The **`:nth-child(0)` selector is incorrect**, as it starts counting from `1`. The correct version should be:

```javascript
$(document).ready(function() {
    $("td:nth-child(1)").each(function() { // Corrected selector
        if ($(this).text().trim() === "Total") { // Trim removes extra spaces
            $(this).parent().children().css({'background-color': 'red'});
        }
    });
});
```

## Implementation in Oracle APEX
To apply this script in an **Interactive Report**, follow these steps:

1. **Edit the APEX Page** containing the Interactive Report.
2. Go to **Attributes → Advanced → Static ID** and assign an ID (e.g., `report1`).
3. **Add the Script** in the **Page Attributes → Execute when Page Loads** section:
   ```javascript
   $(document).ready(function() {
       $("#report1 td:nth-child(1)").each(function() {
           if ($(this).text().trim() === "Total") {
               $(this).parent().children().css({'background-color': 'red'});
           }
       });
   });
   ```
4. Save and run the report.

## Additional Enhancements
- **Change Color Dynamically:**
  ```javascript
  var highlightColor = "#ffcccc"; // Light Red
  $(this).parent().children().css({'background-color': highlightColor});
  ```
- **Apply Different Colors for Different Values:**
  ```javascript
  if ($(this).text().trim() === "Total") {
      $(this).parent().children().css({'background-color': 'red'});
  } else if ($(this).text().trim() === "Subtotal") {
      $(this).parent().children().css({'background-color': 'yellow'});
  }
  ```

## Conclusion
By using **jQuery**, you can dynamically highlight rows in Oracle APEX Interactive Reports based on cell values. This technique improves **user experience and readability**.

For any questions or improvements, feel free to contribute to this guide! 🚀

