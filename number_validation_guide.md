# Number Validation - Documentation

## Code Overview
This HTML page demonstrates real-time number formatting and validation for input fields using jQuery.

## Complete Code
```html
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(function() {
var $td = $( "td" );
var $input = $td.find( "input" );
$input.on( "keyup", function( event ) {
    var selection = window.getSelection().toString();
    if ( selection !== '' ) {
        return;
    }
    if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
        return;
    }
    var $this = $( this );
    var input = $this.val();
    var input = input.replace(/[\D\s\_\-]+/g, "");
            input = input ? parseInt( input, 10 ) : 0;
            $this.val( function() {
                return ( input === 0 ) ? 0 : input.toLocaleString( "en-US" );
            } );
} );
})(jQuery);
</script>
</head>
<body>
<table>
<tr>
<td>
<input name="Hours" id="FC_NOV_17-18621232_I" value="0.00" size="12" type="text">
</td>
<td>
<input name="Hours" id="FC_NOV_17-18621232_J" value="10.00" size="12" type="text">
</td>
<td>
</td>
</tr>
</table>
</body>
</html>
```

## What This Code Does
- Automatically formats numbers with thousand separators (commas)
- Removes invalid characters from input fields
- Provides real-time validation as user types
- Works on input fields within table cells

## JavaScript Code Breakdown

### Document Ready Function
```javascript
$(function() {
    // jQuery shorthand for $(document).ready()
});
```

### Element Selection
```javascript
var $td = $( "td" );
var $input = $td.find( "input" );
```
- Selects all table cells (`<td>`)
- Finds all input fields within those cells

### Event Handler Setup
```javascript
$input.on( "keyup", function( event ) {
    // Executes after each key release
});
```

### Text Selection Check
```javascript
var selection = window.getSelection().toString();
if ( selection !== '' ) {
    return;
}
```
**Purpose**: Skips formatting if user has selected text (prevents interference with copy/paste)

### Arrow Key Exclusion
```javascript
if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
    return;
}
```
**Key Codes**:
- 38: Up arrow
- 40: Down arrow  
- 37: Left arrow
- 39: Right arrow

**Purpose**: Prevents formatting when navigating with arrow keys

### Input Processing
```javascript
var $this = $( this );
var input = $this.val();
var input = input.replace(/[\D\s\_\-]+/g, "");
```
- Gets current input value
- Removes all non-digit characters using regex:
  - `\D`: Non-digits
  - `\s`: Whitespace
  - `\_`: Underscores
  - `\-`: Hyphens

### Number Conversion
```javascript
input = input ? parseInt( input, 10 ) : 0;
```
- Converts string to integer (base 10)
- Sets to 0 if empty or invalid

### Formatted Output
```javascript
$this.val( function() {
    return ( input === 0 ) ? 0 : input.toLocaleString( "en-US" );
} );
```
- Returns 0 if input is zero
- Otherwise formats with US locale (comma separators)

## HTML Structure

### Table Layout
```html
<table>
<tr>
<td>
    <input name="Hours" id="FC_NOV_17-18621232_I" value="0.00" size="12" type="text">
</td>
<td>
    <input name="Hours" id="FC_NOV_17-18621232_J" value="10.00" size="12" type="text">
</td>
<td></td>
</tr>
</table>
```

### Input Field Attributes
- **name**: "Hours" (form submission name)
- **id**: Unique identifiers for each field
- **value**: Initial values ("0.00", "10.00")
- **size**: Display width (12 characters)
- **type**: "text" (allows formatted input)

## Formatting Examples

### Input → Output
- User types: "1234" → Displays: "1,234"
- User types: "1234567" → Displays: "1,234,567"
- User types: "abc123def" → Displays: "123"
- User types: "12.34" → Displays: "12" (decimals removed)

## Use Cases
- Financial amount entry
- Quantity fields
- Any numeric input requiring thousand separators
- Form fields where visual formatting improves readability

## Limitations
- **Decimal Support**: Removes decimal points
- **Negative Numbers**: May not handle negative values correctly
- **Currency**: Doesn't include currency symbols
- **International**: Fixed to US locale formatting

## Browser Compatibility
- **jQuery 3.3.