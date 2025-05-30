# Navigating to a Page - Documentation

## Code Overview
This file contains various Oracle APEX navigation methods including popups, redirects, and page links.

## Complete Code
```javascript
function callMyPopup1 (rspl_number,original_part_number)  {
      
    $.colorbox({href:"f?p=&APP_ID.:22:&APP_SESSION.::NO:RP,22:P22_RSPL_NUMBER,P22_PART_NUMBER:" + rspl_number + ',' + original_part_number ,width:"500px", height:"400px", iframe:true});
     
}

apex.navigation.redirect('f?p=&APP_ID.:4:&SESSION.::NO::P4_PROJECT,P4_OA_NUMBER:'+$x('P4_PROJECT_1').value+','+$x('P4_OA_NUM_1').value);
apex.navigation.redirect('f?p=&APP_ID.:15:&SESSION.::NO::P15_OA_ID:'+$x('P4_OA_ID').value);
apex.navigation.redirect('f?p=&APP_ID.:15:&SESSION.::NO::P15_OA_ID:61967');
javascript:redirect('f?p=&APP_ID.:3:&SESSION.::NO:::');
javascript:redirect('f?p=&APP_ID.:15:&SESSION.::NO:::');
window.open('f?p=&APP_ID.:15:&SESSION.::NO:::');
<a href="f?p=&APP_ID.:15:&SESSION.::NO::P15_OA_ID:&P4_OA_ID." target="_blank">
```

## Navigation Methods Explained

### 1. Colorbox Popup Function
```javascript
function callMyPopup1 (rspl_number,original_part_number)  {
    $.colorbox({
        href:"f?p=&APP_ID.:22:&APP_SESSION.::NO:RP,22:P22_RSPL_NUMBER,P22_PART_NUMBER:" + rspl_number + ',' + original_part_number,
        width:"500px", 
        height:"400px", 
        iframe:true
    });
}
```

**Purpose**: Opens APEX page 22 in a colorbox popup modal
**Parameters**:
- `rspl_number`: First parameter value
- `original_part_number`: Second parameter value

**Colorbox Settings**:
- **Width**: 500px
- **Height**: 400px  
- **iframe**: true (loads page in iframe)
- **href**: APEX URL with page items set

### 2. APEX Navigation Redirects
```javascript
apex.navigation.redirect('f?p=&APP_ID.:4:&SESSION.::NO::P4_PROJECT,P4_OA_NUMBER:'+$x('P4_PROJECT_1').value+','+$x('P4_OA_NUM_1').value);
```

**Purpose**: Redirects to page 4 with dynamic values
**Page Items Set**:
- `P4_PROJECT`: Value from `P4_PROJECT_1` 
- `P4_OA_NUMBER`: Value from `P4_OA_NUM_1`

```javascript
apex.navigation.redirect('f?p=&APP_ID.:15:&SESSION.::NO::P15_OA_ID:'+$x('P4_OA_ID').value);
```
**Purpose**: Redirects to page 15 with dynamic OA_ID

```javascript
apex.navigation.redirect('f?p=&APP_ID.:15:&SESSION.::NO::P15_OA_ID:61967');
```
**Purpose**: Redirects to page 15 with fixed OA_ID value (61967)

### 3. JavaScript Redirects
```javascript
javascript:redirect('f?p=&APP_ID.:3:&SESSION.::NO:::');
javascript:redirect('f?p=&APP_ID.:15:&SESSION.::NO:::');
```

**Purpose**: Basic redirects to pages 3 and 15
**Note**: No page items are set (empty parameter section)

### 4. Window Open
```javascript
window.open('f?p=&APP_ID.:15:&SESSION.::NO:::');
```

**Purpose**: Opens page 15 in new browser window/tab

### 5. HTML Link
```html
<a href="f?p=&APP_ID.:15:&SESSION.::NO::P15_OA_ID:&P4_OA_ID." target="_blank">
```

**Purpose**: HTML anchor link to page 15
**Features**:
- Opens in new tab/window (`target="_blank"`)
- Sets `P15_OA_ID` to value of `&P4_OA_ID.` (substitution string)

## APEX URL Structure

### URL Format
```
f?p=&APP_ID.:PAGE_ID:&SESSION.::CLEAR_CACHE:ITEM_NAMES:ITEM_VALUES
```

**Components**:
- `f?p=`: APEX page call
- `&APP_ID.`: Application ID substitution
- `PAGE_ID`: Target page number
- `&SESSION.`: Session ID substitution  
- `CLEAR_CACHE`: Pages to clear (NO = don't clear)
- `ITEM_NAMES`: Comma-separated page item names
- `ITEM_VALUES`: Comma-separated values

### Examples Breakdown
```
f?p=&APP_ID.:22:&APP_SESSION.::NO:RP,22:P22_RSPL_NUMBER,P22_PART_NUMBER:value1,value2
```
- **Page**: 22
- **Clear Cache**: Reset pages RP and 22
- **Items**: P22_RSPL_NUMBER, P22_PART_NUMBER
- **Values**: value1, value2

## Function Usage

### Getting Page Item Values
```javascript
$x('P4_PROJECT_1').value  // Gets value of page item P4_PROJECT_1
```

### Setting Multiple Items
```javascript
// Sets two items with two values
'P4_PROJECT,P4_OA_NUMBER:' + value1 + ',' + value2
```

## Best Practices

### When to Use Each Method
- **apex.navigation.redirect()**: Standard APEX redirects (recommended)
- **Colorbox popup**: Modal dialogs and forms
- **window.open()**: New windows/tabs
- **HTML links**: Static navigation links
- **javascript:redirect()**: Legacy method (avoid if possible)

### Security Considerations
- Validate parameters before passing to URLs
- Use APEX built-in functions when possible
- Sanitize user input in dynamic URLs

## Dependencies
- **Colorbox**: Requires jQuery Colorbox plugin
- **APEX**: Oracle APEX framework functions
- **jQuery**: For `$x()` function and DOM manipulation

## Common Issues
- Missing colorbox library causes popup failures
- Incorrect page item names result in empty values
- Session timeout can break navigation
- URL length limits with many parameters