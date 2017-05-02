import PropTypes from 'prop-types'
import React from 'react'
import settingsActions from 'stores/settings/settingsActions'
import styles from '../SettingStyles'
import shallowCompare from 'react-addons-shallow-compare'
import {
  Paper, TextField, IconButton, FontIcon,
  Table, TableRow, TableBody, TableRowColumn
} from 'material-ui'

const ACCELERATOR_NAMES = {
  // Application
  preferences: 'Preferences',
  showWindow: 'Show Window',
  hideWindow: 'Hide Window',
  hide: 'Hide',
  hideOthers: 'Hide Others',
  quit: 'Quit',

  // Edit
  undo: 'Undo',
  redo: 'Redo',
  cut: 'Cut',
  copy: 'Copy',
  paste: 'Paste',
  pasteAndMatchStyle: 'Paste and Match Style',
  selectAll: 'Select All',
  find: 'Find',
  findNext: 'Find Next',

  // View
  toggleFullscreen: 'Toggle Fullscreen',
  toggleSidebar: 'Toggle Sidebar',
  toggleMenu: 'Toggle Menu',
  navigateBack: 'Navigate Back',
  navigateForward: 'Navigate Forward',
  zoomIn: 'Zoom In',
  zoomOut: 'Zoom Out',
  zoomReset: 'Zoom Reset',
  reload: 'Reload',
  developerTools: 'Developer Tools',

  // Window
  minimize: 'Minimize',
  cycleWindows: 'Cycle Windows',
  previousMailbox: 'Previous Mailbox',
  nextMailbox: 'Next Mailbox',
  mailboxIndex: 'Mailbox at Index',
  serviceIndex: 'Service at Index'
}
const APPLICATION_SECTION = [
  'preferences',
  'showWindow',
  'hideWindow',
  'hide',
  'hideOthers',
  'quit'
]
const EDIT_SECTION = [
  'undo',
  'redo',
  'cut',
  'copy',
  'paste',
  'pasteAndMatchStyle',
  'selectAll',
  'find',
  'findNext'
]
const VIEW_SECTION = [
  'toggleFullscreen',
  'toggleSidebar',
  'toggleMenu',
  'navigateBack',
  'navigateForward',
  'zoomIn',
  'zoomOut',
  'zoomReset',
  'reload',
  'developerTools'
]
const WINDOW_SECTION = [
  'minimize',
  'cycleWindows',
  'previousMailbox',
  'nextMailbox',
  'mailboxIndex',
  'serviceIndex'
]
const SECTIONS = [
  { name: 'Application', items: APPLICATION_SECTION },
  { name: 'Edit', items: EDIT_SECTION },
  { name: 'View', items: VIEW_SECTION },
  { name: 'Window', items: WINDOW_SECTION }
]

export default class AcceleratorSettings extends React.Component {
  /* **************************************************************************/
  // Class
  /* **************************************************************************/

  static propTypes = {
    accelerators: PropTypes.object.isRequired
  }

  /* **************************************************************************/
  // Rendering
  /* **************************************************************************/

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  /**
  * Renders the table row for an accelerator
  * @param accelerators: the accelerators
  * @param name: the name of the field to render for
  * @param isFirst: true if this is the first row
  * @param isLast: true if this is the last row
  * @return jsx
  */
  renderAcceleratorTableRow (accelerators, name, isFirst, isLast) {
    const accelerator = accelerators[name]
    const acceleratorDefault = accelerators[name + 'Default']
    // Put the key on the TextField so when the value is changed this will be updated
    return (
      <TableRow key={name}>
        <TableRowColumn>{ACCELERATOR_NAMES[name]}</TableRowColumn>
        <TableRowColumn style={{ overflow: 'visible', textAlign: 'right' }}>
          <TextField
            key={accelerator}
            style={{ width: 180 }}
            hintText={acceleratorDefault}
            defaultValue={accelerator}
            onBlur={(evt) => settingsActions.setAccelerator(name, evt.target.value)} />
          <IconButton
            onClick={() => settingsActions.restoreAcceleratorDefault(name)}
            tooltipPosition={isLast ? 'top-center' : 'bottom-center'}
            tooltip={`Restore Default (${acceleratorDefault})`}>
            <FontIcon className='material-icons'>settings_backup_restore</FontIcon>
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }

  /**
  * Renders the accelerator section
  * @param accelerators: the accelerators
  * @param section: the section to render
  * @return jsx
  */
  renderAcceleratorSection (accelerators, section) {
    return (
      <Paper key={section.name} zDepth={1} style={styles.paper}>
        <h1 style={styles.subheading}>{`${section.name} Shortcuts`}</h1>
        <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
            {section.items.map((name, index, items) => this.renderAcceleratorTableRow(accelerators, name, index === 0, index === items.length - 1))}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  render () {
    const {
      accelerators,
      ...passProps
    } = this.props

    return (
      <div {...passProps}>
        <h1 style={styles.heading}>Keyboard Shortcuts</h1>
        {SECTIONS.map((section) => this.renderAcceleratorSection(accelerators, section))}
      </div>
    )
  }
}
