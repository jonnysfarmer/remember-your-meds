import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import MenuIcon from '@material-ui/icons/Menu'
import SvgIcon from '@material-ui/core/SvgIcon'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

// this is Themse for the form palette



const drawerWidth = 200

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > svg': {
      margin: theme.spacing(2)
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
      // the below sets the header to be 100% width on desktop, with the menu appearing below
      zIndex: theme.zIndex.drawer + 1,
      colorPrimary: theme.palette.success.main
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

function ResponsiveDrawer(props) {
  const theme = createMuiTheme({
    palette: {
      primary: green
    }
  })

  //SVG icons
  function MenuIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
      </SvgIcon >
    )
  }
  function PrescriptionIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M18,14H14V18H10V14H6V10H10V6H14V10H18M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
      </SvgIcon >
    )
  }
  function ProfileIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M6,17C6,15 10,13.9 12,13.9C14,13.9 18,15 18,17V18H6M15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6A3,3 0 0,1 15,9M3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5C3.89,3 3,3.9 3,5Z" />
      </SvgIcon >
    )
  }
  function LogoutIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
      </SvgIcon >
    )
  }


  const { container } = props
  const classes = useStyles()
  // const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Prescriptions', 'Profile', 'Logout'].map((elem, i) => (
          <ListItem button key={i}>
            {elem === 'Prescriptions' && <PrescriptionIcon htmlColor='green' fontSize='large' />}
            {elem === 'Profile' && <ProfileIcon htmlColor='green' fontSize='large' />}
            {elem === 'Logout' && <LogoutIcon htmlColor='green' fontSize='large' />}
            <ListItemText primary={elem} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Take your medicine!
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'ltr' ? 'left' : 'right'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>


      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
      </main> */}
    </div>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element)
}

export default ResponsiveDrawer