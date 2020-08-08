import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'; 
import AssessmentIcon from '@material-ui/icons/Assessment'; 
import BookIcon from '@material-ui/icons/Book';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Slider from './content/Slider';
import Notify from './content/Notify';
import News from './content/News';
import Gallery from './content/Gallery';
import Obi from './content/Obi';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'crimson'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 1
    }
    this.handleClick = this.handleClick.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object
  }
  componentWillMount(){
    if(localStorage.auth) {
      let val = Math.floor(Date.now() /1000);
      let data = JSON.parse(localStorage.getItem('auth'));
      if(data.exp <= val) {
        localStorage.removeItem('auth');
        this.context.router.history.push('/login'); 
      }
    } else {
      this.context.router.history.push('/login'); 
    } 
  }
  handleClick =  (e) => {
    if(e.target.id) {
      this.setState({current: e.target.id})
    } else {
      let val = e.target.parentElement.parentElement;
      if(val.id) {
        this.setState({current: val.id});
      } else {
        val = e.target.parentElement.parentElement.parentElement;
        this.setState({current: val.id});
      }
    }
  }
  render() {
    const { classes } = this.props;
  const icon = [<NotificationsIcon />,<ViewDayIcon />,<AssessmentIcon />,<BookIcon />,<AssessmentIcon />];
    let jsx = "Loading...";
    console.log(this.state);
    if(this.state.current == 2) 
      jsx = <Slider />
    else if(this.state.current == 3)
      jsx = <News />
    else if(this.state.current == 4)
      jsx = <Gallery />
    else if(this.state.current == 5)
      jsx = <Obi />
    else if(this.state.current == 1)
      jsx = <Notify />
    else
      jsx = "Not yet designed.....";
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h5" color="inherit" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {['Notification','Slider', 'News', 'Gallery', 'Obituroy'].map((text, index) => (
              <ListItem button key={text} id={index +1} onClick={this.handleClick}>
                <ListItemIcon>{icon[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {jsx}
        </main>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);
