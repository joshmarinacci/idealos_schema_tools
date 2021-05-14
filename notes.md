# goals

Test that JSON schema will do what I need.

* monitor a set of JSON files for changes
* validate that a message matches a JSON schema
* generate RPC proxies using JSON schema (is there a lib for this?)
* convert messages from one type to another
* query json objects to see if it matches some condition
* search a nested json doc for objects matching a condition  
* route messages based


# examples:

### graphics translation

The `draw_image` function needs app and window strings, also x and y to draw to, and width and height and image data to draw, and any masking information.  sidebar will intercept these and modify the x/y before sending them on

### RPC mechanism for display manager helper

line_up button needs to get a list of windows, calculate new positions, and call set window position on them.

```javascript
async function lineup(dm) {
    let windows = await dm.list_windows()
    let y = 0
    windows.forEach(win => {
        win.x = 0
        win.y = y
        y += win.height
    })
    
    windows.forEach(win => {
        dm.set_window_position({app:app, window:win.id, x:win.x, y:win.y})
    })
}
```

### route messages based on type

if(categoryMatch(msg,DRAW)) forward_to_all_of_types(msg,DISPLAY)
if(nameMatch(msg,SET_WINDOW_FOCUSED)) forward_to_target(msg) AND forward_to_type(msg,MENUBAR)
if(nameMatch(msg,WINDOW_OPEN)) {
    await apps.position_window(msg)
    await window_tracker.add_window(msg)
    await forward_to_type(msg,DISPLAY)
    await respond_to_sender(msg)
}

### automatic validations

any message call basic validation on incoming
all message call basic validation on creation before sending out


### queries
find all display servers
find all configured virtual displays
find all services
find all standard apps
send a message to all menubar-plugins
send a message to all sidebar-plugins
find the theme value for button:pressed.background_color
find the translation value for general.document.menubars.file.new.general_document

