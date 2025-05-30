# pro_send_email Procedure Documentation

## Code Overview
This document explains the `pro_send_email` procedure from the error.txt file.

## Complete Procedure Code
```sql
PROCEDURE pro_send_email(p_reference_id IN error_log.error_id%TYPE)
AS
BEGIN
  apex_mail.send(p_to => 'name@domain.com'
               , p_cc => NULL
               , p_from => 'name@domain.com'
               , p_subj => 'Unexpected error in app. ID ' || v('APP_ID')
               , p_body => 'Please use an e-mail client that supports HTML messages.'
               , p_body_html =>
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">
     <head>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <style type="text/css">
         body {
           background-color:#fff;
           color:#000;
           font-family:Arial, Helvetica, sans-serif;
           font-size:12px;
         }
       </style>
     </head>
     <body>
       <p>An unexpected error has occurred in application ID ' || v('APP_ID') || ', page ID ' || v('APP_PAGE_ID') || '.<br/>
       Please refer to the error log for detailed information on incident <b>#' || p_reference_id || '</b>.</p>
     </body>
   </html>');
  --
  apex_mail.push_queue();
END pro_send_email;
```

## What This Procedure Does
This Oracle APEX procedure sends an HTML email notification when an error occurs in an application.

## Input Parameter
- **p_reference_id**: Takes an error ID from the error_log table

## Email Settings
- **To**: `name@domain.com` (needs to be updated with actual email)
- **From**: `name@domain.com` (needs to be updated with actual email)  
- **CC**: NULL (no CC recipients)
- **Subject**: "Unexpected error in app. ID [APP_ID]"

## Email Content

### Plain Text Body
```
Please use an e-mail client that supports HTML messages.
```

### HTML Body
The HTML email includes:
- Proper XHTML DOCTYPE declaration
- Meta tags for content type and viewport
- CSS styling for basic formatting
- Error message with:
  - Application ID (from `v('APP_ID')`)
  - Page ID (from `v('APP_PAGE_ID')`)
  - Error reference ID (from input parameter)

### CSS Styling
```css
body {
  background-color:#fff;
  color:#000;
  font-family:Arial, Helvetica, sans-serif;
  font-size:12px;
}
```

## How It Works
1. Receives an error reference ID as input
2. Uses `apex_mail.send()` to compose the email
3. Includes both plain text and HTML versions
4. Uses `apex_mail.push_queue()` to send the email

## APEX Functions Used
- `v('APP_ID')`: Gets current application ID
- `v('APP_PAGE_ID')`: Gets current page ID  
- `apex_mail.send()`: Sends email
- `apex_mail.push_queue()`: Processes email queue

## Setup Requirements
1. Update email addresses in the code
2. Ensure APEX mail is configured
3. Deploy procedure in database
4. Call procedure when errors occur

## Example Usage
```sql
-- Call when an error occurs
pro_send_email(12345);  -- Where 12345 is the error ID
```