
import { green } from '@material-ui/core/colors'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import Background from './back1.png'

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
    // margin: theme.spacing(1), //was adding a margin on my homepage, check whether it hurts other pages to not have it
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
    margin: theme.spacing(1)
  },
  centeralign: {
    alignItems: 'center',
    display: 'flex'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: green
  },
  avatargrey: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: green
  },
  boxdisplay: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.primary
  },
  noPadding: {
    padding: 0
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  inlineTitle: {
    color: '#000'
  },
  inlineLink: {
    color: theme.palette.success.main,
    '&:hover': {
      color: theme.palette.success.dark
    }
  },
  inlineText: {
    marginBottom: theme.spacing(1)
  },
  centerText: {
    textAlign: 'center'
  },
  false: {
    color: theme.palette.error.main
  },
  active: {
    color: theme.palette.success.main
  },

  //===== NAV =====
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      // the below sets the header to be 100% width on desktop, with the menu appearing below
      zIndex: theme.zIndex.drawer + 1,
      colorPrimary: theme.palette.success.main
    }
  },
  menuButton: {
    // justifyContent: 'flexEnd',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
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
  navLink: {
    color: '#000000',
    textDecoration: 'none',
    textTransform: 'capitalize'
  },

  //===== FORMS =====
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1)
  },
  reminderFormPaper: {
    marginTop: theme.spacing(0),
    padding: theme.spacing(2)
  },
  reminderInlineField: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.5)
  },
  submitgrey: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  submitred: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.secondary
    }
  },
  submitsmall: {
    margin: theme.spacing(1, 0, 2),
    color: '#000',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#000',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },

  //===== HOMEPAGE =====

  backCol: {
    minHeight: '100%',
    background: 'linear-gradient(45deg, #00B950 35%, #38ef7d 100%)'
  },
  backImg: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url("${Background}")`
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Nunito, serif',
    color: '#FFFFFF',
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(2),
    textShadow: '2px 2px 10px #504CAF'
  },
  homeIcon: {
    textAlign: 'center',
    color: '#504CAF'
  },
  containedButton: {
    backgroundColor: '#504CAF',
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  outlinedButton: {
    color: '#504CAF',
    borderColor: '#504CAF',
    backgroundColor: '#00B950',
    fontWeight: 'bold'
  }
}))


export {
  useStyles,
  theme
}