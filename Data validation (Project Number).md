# Oracle APEX Validation Examples

This repository contains examples of validation techniques for Oracle APEX applications, focusing on real-time field validation without requiring page submission.

## Project Number Validation

This example demonstrates how to validate a project number against the database and provide immediate feedback to users.

### Implementation Steps

#### Step 1: Create a PL/SQL Dynamic Action

Add a dynamic action that checks if the entered project number exists in the database:

```sql
declare
    l_count number := null;
    l_flag varchar2(2) := null;
begin
    begin
        select count(*) into l_count 
        from PA_PFW_FC_PROJECTS ippfp,
             pa_projects_all ppa 
        where ippfp.project_id = ppa.project_id
          and ppa.segment1 = :PROJECT_NUMBER 
          and PPA.org_id = mo_global.get_current_org_id;
          
        if l_count > 0 then
            l_flag := 'Y';
        else
            l_flag := 'N';
        end if;
        
    exception 
        when others then
            l_flag := 'N';
    end; 
    return l_flag;
end;
```

This function returns 'Y' if the project number exists and 'N' if it doesn't.

#### Step 2: Add a JavaScript Dynamic Action

Create a dynamic action to handle the validation response:

```javascript
var valFlag = $x('P5_PROJ_VALIDATION_FLAG').value;
apex.message.clearErrors();

if (valFlag == 'N') {
    $s("PROJECT_NUMBER", "");
    
    apex.message.showErrors([
        {
            type:       "error",
            location:   [ "page", "inline" ],
            pageItem:   "PROJECT_NUMBER",
            message:    "Select a valid Project Number",
            unsafe:     false
        }
    ]);
}    
```

This code displays an error message if the project number is invalid.

#### Data Transformation

Convert project number to uppercase:

```javascript
$("#PROJECT_NUMBER").val(($("#PROJECT_NUMBER").val().toUpperCase()).trim());
```

## Additional Button Validations

### Required Field Validation

```javascript
function validateRequiredFields() {
    let isValid = true;
    let requiredFields = ["ITEM_1", "ITEM_2", "ITEM_3"];
    
    apex.message.clearErrors();
    
    requiredFields.forEach(function(item) {
        if (!$v(item)) {
            apex.message.showErrors([
                {
                    type: "error",
                    location: ["page", "inline"],
                    pageItem: item,
                    message: "This field is required",
                    unsafe: false
                }
            ]);
            isValid = false;
        }
    });
    
    return isValid;
}

// Usage with button
$("#my-button").click(function() {
    if (validateRequiredFields()) {
        // Proceed with action
    }
});
```

### Email Format Validation

```javascript
function validateEmail(emailField) {
    const email = $v(emailField);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        apex.message.showErrors([
            {
                type: "error",
                location: ["page", "inline"],
                pageItem: emailField,
                message: "Please enter a valid email address",
                unsafe: false
            }
        ]);
        return false;
    }
    return true;
}
```

### Date Range Validation

```javascript
function validateDateRange(startDateItem, endDateItem) {
    const startDate = new Date($v(startDateItem));
    const endDate = new Date($v(endDateItem));
    
    if (startDate > endDate) {
        apex.message.showErrors([
            {
                type: "error",
                location: ["page", "inline"],
                pageItem: endDateItem,
                message: "End date must be after start date",
                unsafe: false
            }
        ]);
        return false;
    }
    return true;
}
```

### Numeric Range Validation

```javascript
function validateNumericRange(itemName, minValue, maxValue) {
    const value = parseFloat($v(itemName));
    
    if (isNaN(value) || value < minValue || value > maxValue) {
        apex.message.showErrors([
            {
                type: "error",
                location: ["page", "inline"],
                pageItem: itemName,
                message: `Value must be between ${minValue} and ${maxValue}`,
                unsafe: false
            }
        ]);
        return false;
    }
    return true;
}
```

### Save Button with Multiple Validations

```javascript
$("#save-button").click(function() {
    let isValid = true;
    
    // Clear previous errors
    apex.message.clearErrors();
    
    // Run multiple validations
    if (!validateRequiredFields()) isValid = false;
    if (!validateEmail("P1_EMAIL")) isValid = false;
    if (!validateDateRange("P1_START_DATE", "P1_END_DATE")) isValid = false;
    if (!validateNumericRange("P1_AMOUNT", 0, 10000)) isValid = false;
    
    if (isValid) {
        // Submit the page or execute further actions
        apex.page.submit({request: "SAVE"});
    }
    
    return false; // Prevent default form submission
});
```

## Setting Up Dynamic Actions in APEX

1. Navigate to Page Designer
2. Create a new Dynamic Action:
   - Event: Change or Blur (depending on when you want validation to occur)
   - Selection Type: Item(s)
   - Item(s): The item you want to validate

3. Create a true action:
   - Action: Execute PL/SQL Code
   - Set affected items as needed
   - Set PL/SQL function body

4. Create a second action:
   - Action: Execute JavaScript Code
   - Provide JavaScript validation logic

## Best Practices

1. **Performance**: Use client-side validation where possible before server-side validation
2. **User Experience**: Provide clear error messages near the relevant fields
3. **Security**: Always implement server-side validation even if client-side validation exists
4. **Accessibility**: Ensure error messages are accessible to screen readers
5. **Consistency**: Use similar validation patterns throughout your application

## Contributing

Feel free to contribute additional validation examples or improvements by creating a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
