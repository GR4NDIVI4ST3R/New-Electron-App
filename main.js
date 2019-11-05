//?If npm isn't recognized, type [SET PATH=C:/Program Files/Nodejs;%PATH%] into command line
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
// Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
let win

/*
let template = [{...}]
  Use this for a global menu template variable

  Initialize it with:
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
*/

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Load the front-end (.html) of the app.
  win.loadFile('index.html')

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null // Dereference the window object
  })

  //* Put Window items below here

  var menu = Menu.buildFromTemplate([ //* Create Custom Menu
    {
      label: 'Preferences',
      submenu: [
        {
          label: 'Adjust Notification Value',
          click() {}          
        }, {
          label: 'coinmarketcap.com',
          click() { shell.openExternal('https://coinmarketcap.com') }
        },
        {type: 'separator'},
        {
          label: 'Info',
          // win.close() closes the window called 'win' and if 'win' is the only window it'll kill the entire app
          click() { win.close() } // Other option: app.quit()
        }
      ]
    },
    {
      label: 'Exit',
      click() { app.quit() }
    }

  ]) // End of .buildFromTemplate
  Menu.setApplicationMenu(menu) //* Initialize menu

  //* End of Window Items
} 

// This method will be called when Electron has finished initialization and is ready to create browser windows (Some APIs can only be used after this event occurs).
app.on('ready', createWindow) //Also possible to initialize menu from here

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
  if (process.platform !== 'OS X' || 'darwin') {
    app.quit()
  }
})

// On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})