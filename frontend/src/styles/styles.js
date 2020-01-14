
import { green, red } from '@material-ui/core/colors'
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles'
// import { palette } from '@material-ui/system'
import Switch from '@material-ui/core/Switch'

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
  //===== FOR NAV =====
  iconColor: {
    color: '#4caf50' //set to be same as theme
  },
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
  },

  
  //===== FOR PAGES =====
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },

    
  //===== FOR SPECIAL FORMS =====
  
  reminderFormPaper: {
    marginTop: theme.spacing(0),
    padding: theme.spacing(2)
  },
  reminderInlineField: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.5)    
  }

}))


//================================
// SWITCH STYLES
//================================
const SwitchOnOFF = withStyles({
  switchBase: {
    color: red[500],
    '&$checked': {
      color: green[500]
    },
    '&$checked + $track': {
      backgroundColor: green[500]
    },
    '& + $track': {
      backgroundColor: red[500]
    }
  },
  checked: {},
  track: {}
})(Switch)



export {
  useStyles,
  theme,
  SwitchOnOFF
}