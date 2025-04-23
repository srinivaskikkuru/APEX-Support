# Creating an Oracle APEX Session Using PL/SQL

This document explains how to programmatically create an Oracle APEX session using PL/SQL, which can be useful for automated testing, batch processing, or integration scenarios.

## Overview

The `sp_create_apex_session` procedure allows you to programmatically establish an APEX session for a specific application and user without requiring the user to log in through the browser. This can be valuable for automation, testing, or batch processing scenarios.

## Procedure Definition

```sql
CREATE OR REPLACE PROCEDURE sp_create_apex_session(
  p_app_id IN apex_applications.application_id%TYPE,
  p_app_user IN apex_workspace_activity_log.apex_user%TYPE,
  p_app_page_id IN apex_application_pages.page_id%TYPE DEFAULT 1) 
AS
  l_workspace_id apex_applications.workspace_id%TYPE;
  l_cgivar_name  owa.vc_arr;
  l_cgivar_val   owa.vc_arr;
BEGIN
 
  htp.init; 
   
  l_cgivar_name(1) := 'REQUEST_PROTOCOL';
  l_cgivar_val(1) := 'HTTP';
   
  owa.init_cgi_env( 
    num_params => 1, 
    param_name => l_cgivar_name, 
    param_val => l_cgivar_val ); 
     
  SELECT workspace_id
  INTO l_workspace_id
  FROM apex_applications
  WHERE application_id = p_app_id;
 
  wwv_flow_api.set_security_group_id(l_workspace_id); 
 
  apex_application.g_instance := 1; 
  apex_application.g_flow_id := p_app_id; 
  apex_application.g_flow_step_id := p_app_page_id; 
 
  apex_custom_auth.post_login( 
    p_uname => p_app_user, 
    p_session_id => null, -- could use APEX_CUSTOM_AUTH.GET_NEXT_SESSION_ID
    p_app_page => apex_application.g_flow_id||':'||p_app_page_id); 
END;
```

## How It Works

The procedure:

1. Initializes HTTP output processing using `htp.init`
2. Sets up a basic CGI environment with the HTTP protocol
3. Looks up the workspace ID for the specified application
4. Sets the security group (workspace) context
5. Initializes APEX application globals (instance, flow ID, page ID)
6. Uses `apex_custom_auth.post_login` to create a session

## Example Usage

### Creating a Session

```sql
BEGIN
  sp_create_apex_session(
    p_app_id => 106,
    p_app_user => 'MARTIN',
    p_app_page_id => 10);
END;
```

### Verifying Session Properties

```sql
-- Check session values
SELECT v('APP_USER') app_user, 
       v('APP_SESSION') app_session,
       v('APP_PAGE_ID') page_id, 
       v('P1_X') p1_x
FROM dual;

-- Example output:
-- APP_USER   APP_SESSION     PAGE_ID    P1_X
-- ---------- --------------- ---------- ----------
-- MARTIN     374363229560201 10
```

### Setting Session State

```sql
-- Set a page item value
EXEC apex_util.set_session_state('P1_X', 'abc');

-- Verify the value was set
SELECT v('P1_X') p1_x FROM dual;
-- Output: abc
```

### Clearing Session State

```sql
-- Clear entire application cache/session state
EXEC APEX_UTIL.CLEAR_APP_CACHE(p_app_id => 106);
```

## Use Cases

This procedure is particularly useful for:

1. **Automated Testing** - Creating sessions programmatically for test automation
2. **Batch Processing** - Running reports or processes that require an APEX session
3. **Integration** - Allowing external systems to work with APEX sessions
4. **Debugging** - Testing session-specific behavior from SQL*Plus or other tools

## Important Considerations

- This approach bypasses normal authentication flows and should be used with caution
- Security implications should be carefully considered before implementing in production
- The procedure has dependencies on the APEX architecture that may change in future versions
- Access to this procedure should be restricted to appropriate database roles
- Session IDs created this way follow normal APEX session timeout rules

## Compatibility

This code has been tested with Oracle APEX 19.1 and later versions. Adjustments may be needed for compatibility with earlier or future APEX releases.
