import React from 'react'
import { Link, useHistory } from 'react-router-dom'

//Material UI Styling
import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Toolbar } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'

import { useStyles, theme } from '../styles/styles'
import { MenuIcon, PrescriptionIcon, ProfileIcon, LogoutIcon } from '../styles/icons'
import Auth from '../lib/auth'

function ResponsiveDrawer(props) {
  // eslint-disable-next-line no-unused-vars
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
        {location !== '/' &&
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {Auth.isAuthorized() &&
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
        }
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
          {Auth.isAuthorized() &&
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