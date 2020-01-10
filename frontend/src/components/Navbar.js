import React from 'react'
import { Link, useHistory } from 'react-router-dom'

//Material UI Styling
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import { ThemeProvider } from '@material-ui/core/styles'

import { useStyles, theme } from '../styles/styles'
import { MenuIcon, PrescriptionIcon, ProfileIcon, LogoutIcon } from '../styles/icons'

function ResponsiveDrawer(props) {

  const history = useHistory()
  const location = history.location.pathname
  const { container } = props
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['prescriptions', 'profile', 'logout'].map((elem, i) => (
          <Link to={`/${elem}`} key={i} className={classes.iconColor}>
            <ListItem>
              {elem === 'prescriptions' && <PrescriptionIcon fontSize='large' />}
              {elem === 'profile' && <ProfileIcon fontSize='large' />}
              {elem === 'logout' && <LogoutIcon fontSize='large' />}
              <ListItemText>{elem}</ListItemText>
            </ListItem>
          </Link>
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
            {(location === '/prescriptions' || location === '/prescriptions/create/' || location === '/profile/' ||
              location === '/prescriptions/' || location === '/prescriptions/create' || location === '/profile' )
              &&
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            }
          </Toolbar>

        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'ltr' ? 'left' : 'right'}
              open={mobileOpen}
              onClick={handleDrawerToggle}
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
          {(location === '/prescriptions' || location === '/prescriptions/create/' || location === 'profile/' ||
            location === '/prescriptions/' || location === '/prescriptions/create' || location === 'profile')
            &&
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
          }
        </nav>
      </ThemeProvider>
    </div>
  )
}

export default ResponsiveDrawer