# Delete Confirmation Dialog in Oracle APEX

This guide demonstrates how to implement a delete confirmation dialog with row selection validation in Oracle APEX.

## Overview

This solution provides a user-friendly way to confirm delete operations in Oracle APEX applications. It includes validation to ensure rows are selected before deletion and offers a clean confirmation dialog with OK/Cancel options.

## Implementation

### 1. Define the JavaScript Function

Add this function to your application's Global Variable or Function declaration:

```javascript
function validate_delete() {
    
    $('<div id="validationsMsg">').remove();
    
    var l_err_message = '';
    var l_rows_selected = false;

    $("[name=f01]:checked").each(function( index ) {
        l_rows_selected = true;
    });

    if (l_rows_selected == false) {
        // No rows selected - display warning
        l_err_message = l_err_message + 'There are no rows selected.<br>';

        $('<div id="validationsMsg">' + l_err_message + '</div>').dialog({
            modal: true,
            title: "Warning",
            width: 200,            
            buttons: {
                Ok: function(){
                    $(this).dialog('close');
                }
            },
            close: function( event, ui ) { 
                $(this).dialog('close');                            
            }                                        
        });
    }
    else {
        // Rows selected - display confirmation
        l_err_message = l_err_message + 'Are you sure you want to delete the selected rows?<br>';        

        $('<div id="validationsMsg">' + l_err_message + '</div>').dialog({
            modal: true,
            title: "Warning",
            width: 450,
            buttons: {
                Ok: function(){
                    apex.submit({request:'DELETE'});
                    $(this).dialog('close');
                },
                Cancel: function(){
                    $(this).dialog('close');
                }               
            },
            close: function( event, ui ) { 
                $(this).dialog('close');                            
            }                                        
        });
    }
}
```

### 2. Create a Delete Button

Configure a button with these properties:

```
Button Name  : DELETE
Action       : Redirect to URL
Target       : javascript:validate_delete();
```

### 3. Configure Interactive Report Checkbox Column

Set up the checkbox column in your Interactive Report:

```
Type     : Plain Text
Heading  : <input id="checkAll" type="checkbox">
```

### 4. Configure Server-Side Condition for Checkbox Column

To prevent the HTML checkbox from appearing in exports:

```
Server-Side Condition
Type   : Request is NOT contained in value
Value  : CSV:HTML:PDF
```

## How It Works

1. When the DELETE button is clicked, the `validate_delete()` function is called
2. The function checks if any rows are selected by looking for checked checkboxes with the name 'f01'
3. If no rows are selected, a warning dialog is displayed
4. If rows are selected, a confirmation dialog is shown
5. If the user confirms deletion, the page is submitted with a 'DELETE' request

## Additional Functionality

### "Select All" Checkbox Implementation

You can enhance this solution by adding a "Select All" functionality:

```javascript
// Add this to your page's JavaScript section
$("#checkAll").click(function(){
    if($(this).is(":checked")){
        $("[name=f01]").prop("checked", true);
    } else {
        $("[name=f01]").prop("checked", false);
    }
});
```

### Processing the Delete Request

In your page's processing section, add a process to handle the DELETE request:

```sql
-- Example of a processing section for DELETE request
IF :REQUEST = 'DELETE' THEN
    FOR i IN 1..APEX_APPLICATION.G_F01.COUNT LOOP
        DELETE FROM your_table
        WHERE id = APEX_APPLICATION.G_F01(i);
    END LOOP;
END IF;
```

## Modern APEX Alternative

For APEX 19.1+, consider using the built-in confirmation dialog:

```javascript
function deleteSelectedRows() {
    var rowsSelected = $("[name=f01]:checked").length > 0;
    
    if (!rowsSelected) {
        apex.message.alert("There are no rows selected.");
        return;
    }
    
    apex.message.confirm("Are you sure you want to delete the selected rows?", function(okPressed) {
        if (okPressed) {
            apex.submit({request:'DELETE'});
        }
    });
}
```

## Notes

- This solution uses jQuery UI dialog, which is included in Oracle APEX
- The checkbox column named 'f01' is the standard name for the first checkbox column in an APEX report
- The server-side condition prevents HTML tags from appearing in exported reports (CSV, HTML, PDF)
- For large tables, consider implementing pagination-aware "Select All" functionality
