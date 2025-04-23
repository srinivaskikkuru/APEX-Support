# JavaScript URL Navigation in Oracle APEX

This guide demonstrates various techniques for navigating between pages and handling modal dialogs in Oracle APEX applications using JavaScript.

## Overview

Navigation between pages and handling modal dialogs are essential aspects of any Oracle APEX application. This document provides various JavaScript code snippets for common navigation operations in APEX applications.

## Setting Item Values and Opening Modals

```javascript
// Set item values and open modal dialog
javascript:$s('P13_RESERVATION_ID','#RESERVATION_ID#');$s('P13_RES_LINE_ID','#RES_LINE_ID#');openModal('ADDCOMPONENT');

// Set item value using $s shorthand function
javascript:$('P2_EMP_NO','&P1_EMP_NO.');

// Clear value and refresh region
javascript:$('#P93_SEARCH').val('');$('#emp_list_popup').trigger('apexrefresh');

// Simply open a modal dialog
javascript:openModal('ADDCOMPONENT');
```

## URL Navigation

When building URLs in APEX, use substitution strings for proper session handling:

```javascript
// Basic URL format (DON'T build this in SQL - use proper APEX APIs)
'f?p=&APP_ID.:PAGE:&SESSION.::&DEBUG.:'
```

## Modal Windows with ColorBox

ColorBox is a jQuery-based lightbox plugin that can be used to display modal dialogs:

```javascript
// Open a colorbox modal with an APEX page
javascript:$.colorbox({
    href: "f?p=&APP_ID.:55:&APP_SESSION.::NO:RP,55:P55_RSPL_NUMBER,P55_PART_NUMBER:" + rspl_number + ',' + part_number,
    width: "800px", 
    height: "500px", 
    iframe: true
});

// Function to close a colorbox and redirect
function close_popup() {
    $.colorbox.close();    
    apex.navigation.redirect('f?p=&APP_ID.:50:&APP_SESSION.::NO:RP,50');   
}

// Display simple HTML content in colorbox
javascript:redirect('$.colorbox({html:"<h1>Welcome</h1>"})');

// Simple colorbox with fixed URL
$.colorbox({
    href: "f?p=2071:10:&APP_SESSION.::NO::",
    width: "800px", 
    height: "500px", 
    iframe: true
});
```

## Page Redirects with Parameters

```javascript
// Redirect with hardcoded parameter
javascript:redirect('f?p=&APP_ID.:5:&SESSION.::NO::PROJECT_NUMBER:'+&P4_PROJECT.);

// Redirect using item value (modern approach using $x)
javascript:redirect('f?p=&APP_ID.:5:&SESSION.::NO::PROJECT_NUMBER:'+$x('P4_PROJECT').value);
```

## Best Practices

1. **Security**: Always use APEX's built-in security mechanisms (session handling, etc.)
2. **Maintainability**: Use APEX's JavaScript APIs (`apex.navigation.redirect`, `apex.item`, etc.) for better maintainability
3. **Session Handling**: Let APEX handle session parameters by using substitution strings like `&APP_ID.` and `&SESSION.`
4. **Item Access**: Prefer APEX's `$s()`, `$v()`, or `apex.item()` instead of direct DOM manipulation when working with page items

## Modern APEX Alternatives

For newer APEX versions (19.1+), consider these modern approaches:

```javascript
// Setting item values
apex.item("P13_RESERVATION_ID").setValue("#RESERVATION_ID#");

// Navigation
apex.navigation.redirect({
    page: "5",
    values: {
        P5_PROJECT_NUMBER: apex.item("P4_PROJECT").getValue()
    }
});

// Opening dialogs
apex.navigation.dialog(
    "PAGE_55", 
    {
        title: "My Dialog",
        height: "500",
        width: "800",
        pageItems: {
            P55_RSPL_NUMBER: rspl_number,
            P55_PART_NUMBER: part_number
        }
    }
);
```

## Compatibility

The examples in this guide should work across most APEX versions, but the modern alternatives are recommended for APEX 19.1 and later.
