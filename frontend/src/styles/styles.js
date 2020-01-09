
import { green } from '@material-ui/core/colors'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'

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
<<<<<<< HEAD
    backgroundColor: theme.palette.success.main
=======
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
    

>>>>>>> development
  }
}))



export {
  useStyles,
  theme
}