# Oracle APEX beforeunload Event Handler Implementation Guide

## Overview
This guide explains how to implement a `beforeunload` event handler in Oracle APEX to prevent users from accidentally leaving a page with unsaved changes.

## What is the beforeunload Event?
The `beforeunload` event is triggered when the user attempts to navigate away from the current page (by closing the browser tab, clicking a link, refreshing the page, etc.). It allows you to display a confirmation dialog to warn users about unsaved changes.

## Code Implementation

### Step 1: Add to Global Functions
Navigate to your Oracle APEX application and add the following code to your **Global Functions**:

```javascript
//ADD BELOW CODE IN GLOBAL FUNCTIONS
$(window).on('beforeunload', function(){
     if (changesSaved) {
         // If changes are saved, allow navigation without warning
         return undefined;
     } else {
         // If changes are not saved, show warning dialog
         return "You have unsaved changes. Are you sure you want to leave?";
     }
});
```
### To Supress all errors 
```javascript
//ADD BELOW CODE IN GLOBAL FUNCTIONS
$(window).on('beforeunload', function(){
     if (changesSaved) {
}});
```

### Step 2: How to Access Global Functions in Oracle APEX

1. **Navigate to Shared Components**
   - Go to your Application home page
   - Click on "Shared Components"

2. **Access Application Definition**
   - Under "Application Logic" section
   - Click on "Application Definition"

3. **Edit Global Functions**
   - Click on "Edit Application Definition"
   - Scroll down to find "JavaScript" section
   - Look for "Global Functions" textarea
   - Paste the code there

### Step 3: Initialize the changesSaved Variable

Add this variable declaration at the top of your Global Functions:

```javascript
// Global variable to track save status
var changesSaved = true;
```

### Step 4: Implement Change Tracking

You'll need to update the `changesSaved` variable based on user actions:

#### When User Makes Changes (Set to false):
```javascript
// Example: When user modifies a form field
$('#P1_FIELD_NAME').on('change', function() {
    changesSaved = false;
});

// Example: For multiple fields
$('.form-field').on('change input', function() {
    changesSaved = false;
});
```

#### When Changes Are Saved (Set to true):
```javascript
// Example: After successful AJAX save
function saveData() {
    apex.server.process('SAVE_PROCESS', {
        // your data
    }, {
        success: function(data) {
            changesSaved = true;
            apex.message.showPageSuccess('Data saved successfully!');
        },
        error: function(xhr, status, error) {
            apex.message.showErrors('Error saving data: ' + error);
        }
    });
}
```

## Complete Implementation Example

### Global Functions Code:
```javascript
// Global variable to track save status
var changesSaved = true;

// beforeunload event handler
$(window).on('beforeunload', function(e) {
    if (!changesSaved) {
        var confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }
});

// Function to mark changes as unsaved
function markUnsaved() {
    changesSaved = false;
}

// Function to mark changes as saved
function markSaved() {
    changesSaved = true;
}
```

### Page-Level Implementation:
```javascript
// Execute when page loads
$(document).ready(function() {
    // Track changes on form fields
    $('.t-Form-inputContainer input, .t-Form-inputContainer textarea, .t-Form-inputContainer select').on('change input', function() {
        markUnsaved();
    });
    
    // Handle save button click
    $('#save_button').on('click', function() {
        // Perform save operation
        apex.server.process('YOUR_SAVE_PROCESS', {
            // Add your form data here
        }, {
            success: function(data) {
                markSaved();
                apex.message.showPageSuccess('Changes saved successfully!');
            },
            error: function(xhr, status, error) {
                apex.message.showErrors('Error saving changes: ' + error);
            }
        });
    });
});
```

## Important Notes

### Browser Compatibility
- Modern browsers (Chrome 51+, Firefox 44+) only show a generic message
- Custom messages are ignored for security reasons
- The confirmation dialog will still appear, but with browser's default text

### APEX-Specific Considerations
1. **Page Validation**: Ensure the beforeunload doesn't interfere with APEX's built-in validation
2. **Dynamic Actions**: Be careful when combining with Dynamic Actions that might navigate away
3. **Session State**: Consider how this affects APEX session state management

### Best Practices
1. **Reset on Save**: Always set `changesSaved = true` after successful save operations
2. **Form Reset**: Set `changesSaved = true` when form is reset or cleared
3. **Navigation Handling**: Consider disabling the warning for specific navigation actions
4. **User Experience**: Don't make the warning too aggressive - only show when truly necessary

## Troubleshooting

### Common Issues:
1. **Warning Shows Even After Save**: Ensure you're setting `changesSaved = true` after successful saves
2. **Warning Doesn't Show**: Check browser console for JavaScript errors
3. **APEX Navigation Issues**: Make sure the code doesn't interfere with APEX's internal navigation

### Testing:
1. Make changes to form fields
2. Try to navigate away (close tab, refresh, click link)
3. Verify warning dialog appears
4. Save changes and try again - warning should not appear

## Security Considerations
- This is a client-side implementation and can be bypassed
- Always implement server-side validation for critical data
- Don't rely solely on this for data integrity

## Conclusion
This implementation provides a user-friendly way to prevent accidental data loss in Oracle APEX applications. Remember to test thoroughly and adjust the implementation based on your specific application requirements.