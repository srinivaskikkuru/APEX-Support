# Exception Handling in Oracle APEX

This guide covers various methods for handling and displaying messages in Oracle APEX applications using the JavaScript Message API.

## Overview

The `apex.message` namespace provides a set of functions for displaying different types of messages to users. This includes success messages, alerts, confirmations, and error messages. These functions help create a consistent and user-friendly error handling experience.

## Success Messages

### Show Page Success

Displays a success message at the top of the page:

```javascript
// Display a simple success message
apex.message.showPageSuccess("Changes saved!");
```

The success message appears briefly and then fades out automatically.

## Alert Notifications

### Simple Alert

Displays a modal alert dialog with an OK button:

```javascript
// Display an alert dialog
apex.message.alert("Load complete.");
```

### Alert with Callback

Execute a function after the user dismisses the alert:

```javascript
// Alert with callback function
apex.message.alert("Load complete.", function(){
    afterLoad();
});
```

The callback function is executed only after the user clicks the OK button.

## Clearing Messages

Remove existing error messages from the page:

```javascript
// Clear all errors on the page
apex.message.clearErrors();
```

This is useful before performing validations to ensure old error messages don't remain.

## Confirmation Messages

Display a dialog that asks for user confirmation:

```javascript
// Confirmation dialog with Yes/No options
apex.message.confirm("Are you sure?", function(okPressed) { 
    if(okPressed) {
        deleteIt();
    }
});
```

The callback function receives a boolean parameter indicating whether the user confirmed (true) or canceled (false).

## Customizing Message Appearance

Set theme hooks to customize message behavior and appearance:

```javascript
// Set theme hooks for message handling
apex.message.setThemeHooks({ 
    beforeShow: function(pMsgType, pElement$){
        if(pMsgType === apex.message.TYPE.SUCCESS) {
            pElement$.addClass("animate-msg");
        }
    }, 
    beforeHide: function(pMsgType, pElement$){
        if(pMsgType === apex.message.TYPE.SUCCESS) {
            pElement$.removeClass("animate-msg");
        }
    }             
}); 
```

This example adds a custom animation class to success messages.

## Showing Error Messages

Display multiple error messages with different locations and associated items:

```javascript
// Show multiple error messages
apex.message.showErrors([
    {
        type:       "error",
        location:   ["page", "inline"],
        pageItem:   "P1_ENAME",
        message:    "Name is required!",
        unsafe:     false
    },
    {
        type:       "error",
        location:   "page",
        message:    "Page error has occurred!",
        unsafe:     false
    }
]);
```

### Error Object Properties

- **type**: The type of message (error, warning, info)
- **location**: Where to display the message (page, inline, or both)
- **pageItem**: The page item to associate the error with (for inline errors)
- **message**: The error message text
- **unsafe**: Whether the message contains HTML (false for security)

## Common Use Cases

### Form Validation

```javascript
function validateForm() {
    apex.message.clearErrors();
    
    var errors = [];
    var name = apex.item("P1_NAME").getValue();
    
    if (!name) {
        errors.push({
            type: "error",
            location: ["page", "inline"],
            pageItem: "P1_NAME",
            message: "Name is required!",
            unsafe: false
        });
    }
    
    if (errors.length > 0) {
        apex.message.showErrors(errors);
        return false;
    }
    
    return true;
}
```

### Delete Confirmation

```javascript
function deleteRecord(id) {
    apex.message.confirm("Are you sure you want to delete this record?", function(okPressed) {
        if (okPressed) {
            apex.server.process(
                "DELETE_RECORD",
                { x01: id },
                {
                    success: function(data) {
                        apex.message.showPageSuccess("Record deleted successfully!");
                        refreshReport();
                    },
                    error: function(xhr, status, error) {
                        apex.message.alert("Error deleting record: " + error);
                    }
                }
            );
        }
    });
}
```

## Best Practices

1. **Clear Existing Errors**: Always clear existing errors before validation
2. **Consistent Message Types**: Use appropriate message types for different situations
3. **Concise Messages**: Keep messages clear and to the point
4. **Security**: Set `unsafe: false` unless you specifically need HTML in messages
5. **Multiple Locations**: Use both page and inline locations for important errors
6. **Callbacks**: Use callbacks to ensure code executes only after user acknowledgment
7. **Theme Hooks**: Use theme hooks to maintain consistent styling across your app

## Browser Compatibility

These functions work consistently across all modern browsers supported by Oracle APEX.
