
import { green } from '@material-ui/core/colors'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'

// These are the styles for the form

const useStyles = makeStyles(theme => ({
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
    backgroundColor: theme.palette.success.main

  }
}))

// this is Themse for the form palette

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

export {
  useStyles,
  theme
}