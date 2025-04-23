# Displaying BLOB Images in Oracle APEX

This document explains how to display images stored as BLOBs in an Oracle APEX application.

## Overview

Displaying images stored as BLOB data in database tables is a common requirement in APEX applications. This code snippet demonstrates how to render these images directly in reports or other page components.

## Code

```sql
decode(nvl(dbms_lob.getlength(PICTURE),0),0,NULL, 
  '<img alt="'||ID||'" title="'||id||'" style="border: 4px solid #ccc; -moz-border-radius: 4px; -webkit-border-radius: 4px;"'|| 
  'src="'|| apex_util.get_blob_file_src('P12_PICTURE',"ROWID")|| '" height="75" width "75" />') "IMAGE"
```

## How It Works

The code performs these steps:

1. Checks if the BLOB column (`PICTURE`) is empty using `dbms_lob.getlength()`
2. If empty (length = 0), returns NULL (no image displayed)
3. If not empty, constructs an HTML `<img>` tag with:
   - `alt` and `title` attributes set to the record ID
   - Custom styling (border and border-radius)
   - `src` attribute set using `apex_util.get_blob_file_src()` to generate a URL for the BLOB
   - Fixed dimensions (75x75 pixels)

## Implementation

### Report Column Setup

1. Create a report column with the type "Standard Report Column"
2. Set the Column Definition to the SQL expression above
3. Ensure "Escape Special Characters" is set to "No" to allow HTML rendering
4. Set the heading to "IMAGE" or another appropriate label

### Required Page Item

This code assumes:
- A page item named `P12_PICTURE` exists to temporarily store the BLOB data
- The report query includes the `ROWID` column for each record

### Style Customization

The inline styles can be adjusted as needed:
```
style="border: 4px solid #ccc; -moz-border-radius: 4px; -webkit-border-radius: 4px;"
```

Alternatively, you can reference a CSS class instead of using inline styles:
```sql
'<img alt="'||ID||'" title="'||id||'" class="report-thumbnail" src="'||
apex_util.get_blob_file_src('P12_PICTURE',"ROWID")||'" height="75" width="75" />'
```

## Improved Version

Here's an enhanced version with proper width attribute and added error handling:

```sql
decode(nvl(dbms_lob.getlength(PICTURE),0),0,'<span class="no-image">No Image</span>', 
  '<img alt="'||ID||'" title="Image ID: '||id||'" '||
  'class="report-thumbnail" '||
  'src="'||apex_util.get_blob_file_src('P12_PICTURE',"ROWID")||'" '||
  'height="75" width="75" />'
) "IMAGE"
```

## Alternative Approaches

### Using APEX 19.1+ Built-in Functions

For APEX 19.1 and above, you can use the built-in support for BLOB columns:

```sql
PICTURE "IMAGE"
```

Then set the column properties:
- Type: Display as Image
- BLOB Attributes: Specify the correct MIME type
- Image Attributes: Set width, height, scaling options, etc.

### Using Base64 Encoding (Self-Contained)

For smaller images where you want to avoid separate HTTP requests:

```sql
'<img src="data:image/jpg;base64,'||
encode(PICTURE,'base64')||'" height="75" width="75" />'
```

## Performance Considerations

- Using `apex_util.get_blob_file_src()` is more efficient for larger images
- The APEX engine caches images for better performance
- Consider adding a version parameter for cache-busting when images change
- For reports with many images, consider lazy loading or pagination

## Notes

- The code assumes the BLOB contains valid image data (JPEG, PNG, etc.)
- Make sure your database column has the correct MIME type information if using APEX's built-in image handling
- The width attribute appears to have a syntax error in the original code (`width "75"`) - it should be `width="75"`
