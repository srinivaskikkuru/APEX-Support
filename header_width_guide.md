# Header Width for HTML Dynamic Table - Documentation

## Code Overview
This CSS code sets specific column widths and background colors for Oracle APEX report tables.

## Complete CSS Code
```css
-----------------------------------------------------------------------------------------------------------------
--- Report Columns Color Backgrounds AND Widths ---
-----------------------------------------------------------------------------------------------------------------	

------- Report Static ID ----> WOLIST
------- Report single column widths 3,5 columns same width

#report_WOLIST .t-Report-wrap .t-Report-tableWrap table thead tr th:nth-child(3),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(3),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table thead tr th:nth-child(5),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(5) {
    min-width: 120px !important;
    max-width: 120px !important;
}

------- Report single column widths 6,7 columns same width

#report_WOLIST .t-Report-wrap .t-Report-tableWrap table thead tr th:nth-child(6),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(6),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table thead tr th:nth-child(7),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(7) {
    min-width: 130px !important;
    max-width: 130px !important;
	
-------	

.report_regs .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(1),
.report_regs .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(2),
.report_regs .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(3),
.report_regs .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(4),
.report_regs .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(5) {
    min-width: 116px !important;
    background-color: #E6E6E6 !important;
    max-width: 116px !important;
}

-------	Reprot headings

.report_regs .t-Report-wrap .t-Report-tableWrap table thead tr th {
    background-color: #CACACA;
}
```

## What This CSS Does
Sets fixed column widths and background colors for specific Oracle APEX report tables.

## Code Breakdown

### Report WOLIST - Columns 3 & 5
```css
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table thead tr th:nth-child(3),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(3),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table thead tr th:nth-child(5),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(5) {
    min-width: 120px !important;
    max-width: 120px !important;
}
```
- **Target**: Report with Static ID "WOLIST"
- **Columns**: 3rd and 5th columns
- **Width**: Fixed at 120px (both minimum and maximum)
- **Applies to**: Both header (`th`) and body (`td`) cells

### Report WOLIST - Columns 6 & 7
```css
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table thead tr th:nth-child(6),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(6),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table thead tr th:nth-child(7),
#report_WOLIST .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(7) {
    min-width: 130px !important;
    max-width: 130px !important;
}
```
- **Target**: Same WOLIST report
- **Columns**: 6th and 7th columns  
- **Width**: Fixed at 130px
- **Purpose**: Slightly wider than columns 3 & 5

### Report regs - Data Columns
```css
.report_regs .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(1),
.report_regs .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(2),
.report_regs .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(3),
.report_regs .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(4),
.report_regs .t-Report-wrap .t-Report-tableWrap table tbody tr td:nth-child(5) {
    min-width: 116px !important;
    background-color: #E6E6E6 !important;
    max-width: 116px !important;
}
```
- **Target**: Report with class "report_regs"
- **Columns**: First 5 columns (1-5)
- **Width**: Fixed at 116px
- **Background**: Light gray (#E6E6E6)
- **Applies to**: Only body cells (`td`), not headers

### Report regs - Header Styling
```css
.report_regs .t-Report-wrap .t-Report-tableWrap table thead tr th {
    background-color: #CACACA;
}
```
- **Target**: All header cells in report_regs
- **Background**: Medium gray (#CACACA)
- **Purpose**: Distinguishes headers from data cells

## CSS Selector Structure

### APEX Report Structure
```
#report_WOLIST (or .report_regs)
└── .t-Report-wrap
    └── .t-Report-tableWrap
        └── table
            ├── thead
            │   └── tr
            │       └── th (header cells)
            └── tbody
                └── tr
                    └── td (data cells)
```

## Key Features

### Fixed Width Columns
- Uses both `min-width` and `max-width` with same value
- Prevents columns from resizing
- `!important` overrides other CSS rules

### Color Coding
- **#E6E6E6**: Light gray for data cells
- **#CACACA**: Medium gray for headers
- Creates visual separation between different sections

### Responsive Considerations
- Fixed widths may cause horizontal scrolling on small screens
- Consider using `max-width` only for better mobile experience

## Usage Instructions
1. Add this CSS to your APEX application's CSS section
2. Ensure your reports have the correct Static IDs:
   - "WOLIST" for the first report
   - Class "report_regs" for the second report
3. Test column widths and adjust pixel values as needed

## Customization Options
- Change pixel values for different column widths
- Modify background colors using hex codes
- Add or remove columns by changing nth-child numbers
- Apply to different reports by changing the ID/class selectors