# Refreshing Parent Region on Dialog Close in Oracle APEX

This guide explains how to refresh a parent region in Oracle APEX when a dialog box is closed.

## Overview

When working with modal dialogs in Oracle APEX, it's often necessary to refresh a parent region after closing the dialog to display updated data. This document provides a simple solution to automatically refresh a specific region when a dialog closes.

## Code

```javascript
// To refresh a parent region on dialog close

// Define a dynamic action on item with dialog box based on dialog close -- > 
// (Selection type) Javascript Execution --> (Script) $("ADD_NOTES").click

// True action : javascript execution
"apex.region("INTG_EST_COST").refresh();"
```

## Implementation Steps

1. **Create a Dynamic Action:**
   - Event: Dialog Closed
   - Selection Type: JavaScript Expression
   - JavaScript Expression: `$("ADD_NOTES").click`

2. **Define True Action:**
   - Action: Execute JavaScript Code
   - Code: `apex.region("INTG_EST_COST").refresh();`

## How It Works

1. When the dialog closes, the dynamic action is triggered
2. The JavaScript expression `$("ADD_NOTES").click` simulates a click on an element with ID "ADD_NOTES"
3. When this event is triggered, the true action executes
4. The true action calls `apex.region("INTG_EST_COST").refresh()` to refresh the region

## Customization

- Replace `"INTG_EST_COST"` with your specific region's static ID
- You can modify the selection type or JavaScript expression based on your specific implementation
- Multiple regions can be refreshed by adding additional refresh commands

## Important Notes

- The parent region must have a static ID defined for this to work
- Ensure the dialog is properly defined with the "Dialog: Close" action
- This technique can be extended to perform additional actions when a dialog closes

## Alternative Approaches

If you need more complex behavior, consider:

1. **Using the Dialog Return Item:**
   ```javascript
   if (this.data.dialogPageItem === "ITEM_NAME") {
       apex.region("REGION_ID").refresh();
   }
   ```

2. **Custom JavaScript Function:**
   ```javascript
   function afterDialogClose(regionToRefresh) {
       apex.region(regionToRefresh).refresh();
       // Additional actions...
   }
   ```
