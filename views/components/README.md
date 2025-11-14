# Components
EJS Components work with mongodb objects.
Elements requires the `components.css` file for styling; this is included in the `header.ejs` partial.

## Files in this directory

- `editor.ejs` Editor
- `view.ejs` view
- `nav.ejs` reusable nav element

## editor
requires a valid course object. The value of `course._id` determines if the editor calls for an update or insert to database.

### posts

- `/update/[course._id]` : done if there `course._id` is non-zero
- `/insert` : done if `course._id` is zero

## listing
A single view of a Course, requires 

- `id`
- `code`
- `credits`
- `title`

### messages

gets `/edit/[_id]` to edit
posts `/delete/[_id]` to delete - asks user to confirm.

## nav
Basic navigation component. Does not require any inputs.
