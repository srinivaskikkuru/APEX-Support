# Button Enable/Disable and Validation in Oracle APEX

This guide provides a way to enable and disable buttons in Oracle APEX using JavaScript/jQuery. The functionality is commonly needed for controlling button actions based on conditions and validations.

## Disabling a Button

To disable a button in Oracle APEX, use the following jQuery command. This adds the `apex_disabled` class to the button, effectively disabling it:

```javascript
$("#CP_FORECAST_COMPARE_REPORT").addClass("apex_disabled"); // Disable button by its static ID
```

Where `#CP_FORECAST_COMPARE_REPORT` is the static ID of the button you want to disable. The `apex_disabled` class prevents any interaction with the button.

## Enabling a Button

To enable a button that was previously disabled, use this jQuery command to remove the `apex_disabled` class:

```javascript
$("#TASK_DETAILS").removeClass("apex_disabled"); // Enable button by its static ID
```

Here, `#TASK_DETAILS` refers to the static ID of the button that should be enabled.

## Button Action Example (Form Submission)

You can trigger a form submission when the button is clicked using the `apex.submit()` function. The request parameter can be customized to handle specific actions or processes in APEX.

```javascript
apex.submit({request: 'CLEAR'}); // Trigger page submission with a custom request parameter
```

In this example, the request is set to `'CLEAR'`, which you can handle on the server-side or with dynamic actions.

## General Page Submission Example

For a regular form submission without a specific request:

```javascript
apex.submit(); // Trigger page submission without any specific request
```

## Additional Button Validations (Examples)

### 1. Disabling Button Based on Condition

You can disable a button based on a form field value or any dynamic condition:

```javascript
if ($("#P1_FIELD").val() === "") {  // Check if a field is empty
    $("#MY_BUTTON").addClass("apex_disabled"); // Disable button
} else {
    $("#MY_BUTTON").removeClass("apex_disabled"); // Enable button
}
```

### 2. Validation Before Enabling Button

If you want to enable a button only after a specific validation, you can use this code:

```javascript
function validateFormAndEnableButton() {
    if ($("#P1_FIELD").val() !== "" && $("#P1_ANOTHER_FIELD").val() !== "") {
        $("#MY_BUTTON").removeClass("apex_disabled"); // Enable button if fields are not empty
    } else {
        $("#MY_BUTTON").addClass("apex_disabled"); // Keep the button disabled
    }
}
```

You can call this function on events like `onchange` or `onkeyup` for the form fields.

### 3. Preventing Double Click on Submit Button

If you want to prevent a button from being clicked multiple times during form submission, disable it after the first click:

```javascript
$("#MY_BUTTON").click(function() {
    $(this).addClass("apex_disabled"); // Disable the button after click
    apex.submit(); // Submit the page
});
```

This ensures that the user cannot submit the form multiple times unintentionally.

## Conclusion

By using the above methods, you can dynamically control button states and submit forms in Oracle APEX. This approach helps improve user experience by ensuring buttons are only active when needed and preventing errors from double submissions.
