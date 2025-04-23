# Creating Tooltips in Oracle APEX

This guide demonstrates how to implement interactive tooltips in Oracle APEX applications.

## Overview

This code implements a dynamic tooltip system in Oracle APEX that follows the mouse cursor and displays contextual information. The tooltip is implemented as an APEX region that appears when hovering over specific elements and disappears when the mouse moves away.

## Code

```javascript
// showDDDetails is event triggered on mouse enter action
function showDDDetails(columnName, taskId) {
     var colName = columnName;
     var tId = taskId;
     apex.item("P29_DD_COL_NAME").setValue(colName);
     apex.item("P29_DD_TASK_ID").setValue(taskId);
     $("#INLINE_DIALOG").show();
     apex.region("REPORT_REGION").refresh();
}

// closeDDDetails is event triggered on mouse out action
function closeDDDetails() {
     $("#INLINE_DIALOG").hide();
}

$(document).mousemove(function(event) {
     $("#INLINE_DIALOG").position({
         my: "left+20 top+20",
         of: event,
         collision: "fit"
     });
});
```

## Setup Instructions

1. Create a region in your APEX page with the static ID: `INLINE_DIALOG`
2. Add the above code to your page's Function and Global Declaration section
3. Create items `P29_DD_COL_NAME` and `P29_DD_TASK_ID` to store context data
4. Create a report region with static ID `REPORT_REGION` to display the tooltip content

## How It Works

1. **Showing the Tooltip**: When `showDDDetails()` is called (typically on mouse enter):
   - It stores column name and task ID in page items
   - Makes the tooltip region visible
   - Refreshes the report region to show relevant data

2. **Hiding the Tooltip**: When `closeDDDetails()` is called (typically on mouse out):
   - It hides the tooltip region

3. **Mouse Following**: The mousemove event handler dynamically positions the tooltip:
   - 20 pixels right and 20 pixels below the cursor
   - Uses jQuery UI's position utility with collision detection to keep the tooltip on screen

## Implementation Example

To implement this tooltip on elements in your page:

```html
<span onmouseenter="showDDDetails('Column_A', '12345')" onmouseleave="closeDDDetails()">
    Hover over me
</span>
```

## Tips

- Style your `INLINE_DIALOG` region appropriately with CSS
- Ensure the report query uses the page items to filter data correctly
- Consider performance if the report query is complex
- Add appropriate z-index to make sure the tooltip appears above other elements
