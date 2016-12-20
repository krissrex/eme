'use strict'
const {
  BrowserWindow,
  MenuItem,
  shell
} = require('electron')

module.exports = {
  append(params, browserWindow) {
    const text = params.selectionText
    
    return [
      new MenuItem({
        type: 'separator'
      }),
      new MenuItem({
        label: 'Search in Google',
        enabled: Boolean(text),
        click() {
          if (text) {
            shell.openExternal(`https://www.google.com/search?q=${text}`)
          }
        }
      }),
      new MenuItem({
        label: 'Show Markdown help',
        click() {
          let child = new BrowserWindow({parent: browserWindow, modal: true, useContentSize: true})
          child.on('closed', () => {
            child = null
          })
          child.setMenu(null)
          child.loadURL('https://help.github.com/articles/basic-writing-and-formatting-syntax/')
        }
      })
    ]
  }
}
