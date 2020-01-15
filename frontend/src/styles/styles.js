
import { green } from '@material-ui/core/colors'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
// import { palette } from '@material-ui/system'
// import Switch from '@material-ui/core/Switch'

//================================
// SETTINGS
//================================
const drawerWidth = 200

//================================
// THEME
//================================
const theme = createMuiTheme({
  palette: {
    primary: green //#4caf50
  }
})

//================================
// STYLES
//================================
const useStyles = makeStyles(theme => ({

  //===== ROOT/BASE STYLES =====
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
    width: '100%'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paperCard: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main
  },
  boxdisplay: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.primary
  },
  noPadding: {
    padding: 0
  },

  //===== NAV =====

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
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
  iconColor: {
    color: '#4caf50' //set to be same as theme
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },

  //===== FORMS =====

  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#000',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  reminderFormPaper: {
    marginTop: theme.spacing(0),
    padding: theme.spacing(2)
  },
  reminderInlineField: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.5)
  }
}))


export {
  useStyles,
  theme
}