# Oracle APEX Dynamic Actions

This document covers techniques for implementing dynamic actions in Oracle APEX applications, focusing on triggering button actions and setting item values.

## Overview

Dynamic actions in Oracle APEX allow developers to enhance user interactions without requiring page submissions. This guide covers common patterns for submitting forms and manipulating item values through JavaScript and PL/SQL.

## Triggering Button Actions

### Submit a Page with a Specific Request Value

```javascript
// Submits the current page with the request value 'CLEAR'
apex.submit({request:'CLEAR'});
```

This code programmatically triggers a form submission with a specific request value. The request parameter can be processed in your application's PL/SQL to determine what action to take.

### How It Works

1. The `apex.submit()` function submits the current page
2. The `request` parameter sets the value of the `REQUEST` variable in session state
3. You can handle different request values in your application's processing sections

### Use Cases

- Triggering different processing actions from a single button
- Performing "hidden" actions without adding visible buttons
- Conditionally submitting the page based on user input or validation

### Example Implementation

```javascript
// In a dynamic action's JavaScript executor:
if(confirmDelete) {
    apex.submit({request:'DELETE_RECORD'});
} else {
    apex.message.showPageSuccess("Operation cancelled");
}
```

Then in your page's processing:

```sql
-- In a PL/SQL processing section
IF :REQUEST = 'DELETE_RECORD' THEN
    DELETE FROM my_table WHERE id = :P1_ID;
END IF;
```

## Setting Item Values

### Using JavaScript Expression

```javascript
// Convert to uppercase and trim whitespace
$("#PROJECT_NUMBER").val(($("#PROJECT_NUMBER").val().toUpperCase()).trim());
```

This code:
1. Gets the current value of the `PROJECT_NUMBER` item using jQuery
2. Converts it to uppercase using JavaScript's `toUpperCase()` method
3. Removes leading and trailing whitespace using `trim()`
4. Sets the result back to the same item

### Using PL/SQL

```sql
-- Reference an item value in PL/SQL
:PROJECT_NUMBER
```

In PL/SQL regions or processes, you can directly reference page items using the colon prefix.

## Modern APEX Approaches

### Setting Values with APEX API

```javascript
// Better approach for setting item values
apex.item("PROJECT_NUMBER").setValue(
    apex.item("PROJECT_NUMBER").getValue().toUpperCase().trim()
);
```

### Multiple Request Parameters

```javascript
// Submit with multiple parameters
apex.submit({
    request: 'PROCESS_DATA',
    set: {
        'P1_STATUS': 'COMPLETE',
        'P1_PROCESSED_DATE': new Date().toISOString()
    }
});
```

### Server-Side Item Value Setting

```sql
-- In PL/SQL process
apex_util.set_session_state('P1_PROJECT_NUMBER', 
                           UPPER(TRIM(:P1_PROJECT_NUMBER)));
```

## Best Practices

1. **Use APEX APIs**: Prefer `apex.item()` over direct jQuery access for better compatibility
2. **Consistent Approach**: Choose either client-side or server-side validation/transformation based on your needs
3. **Error Handling**: Include proper error handling for JavaScript functions
4. **Performance**: For complex operations, consider whether client-side or server-side processing is more efficient
5. **Validation**: Add appropriate validation before submitting or changing values

## Example: Complete Dynamic Action

Here's a complete example of a dynamic action that performs validation, transformation, and conditional submission:

```javascript
// Execute JavaScript Code
var projectNumber = apex.item("PROJECT_NUMBER").getValue();

if (!projectNumber) {
    apex.message.showErrors([{
        type: "error",
        location: "inline",
        pageItem: "PROJECT_NUMBER",
        message: "Project number is required",
        unsafe: false
    }]);
    return false;
}

// Transform and set value
apex.item("PROJECT_NUMBER").setValue(projectNumber.toUpperCase().trim());

// Submit with request
apex.submit({request: 'SAVE_PROJECT'});
```

## Additional Resources

For more information on dynamic actions in Oracle APEX, refer to:
- [APEX JavaScript API Documentation](https://docs.oracle.com/en/database/oracle/application-express/20.1/aexjs/index.html)
- [APEX Dynamic Actions Best Practices](https://apex.oracle.com/pls/apex/apexcust/r/files/static/v13Y/Best-Practices-for-APEX-Dynamic-Actions.pdf)
