import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; 
import Dialog from '@material-ui/core/Dialog';  
import Slide from '@material-ui/core/Slide';
import {database} from '../../App';

import Loader from '../util/Loader';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import UserIcon from '@material-ui/icons/Users';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  }, 
  bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
  },
  rightIcon: {  
  },
  title: {
    fontSize: 14,
  },
  pos: {
      marginBottom: 12,
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function Transition(props) {
  return <Slide direction="right" {...props} />;
}
function TransitionDown(props) {
  return <Slide direction="down" {...props} />;
}

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      val: false,
      openN: false,
      notify: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.PopUp = this.PopUp.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object
  }
  componentDidMount() {
    database.ref('Notify/').once('value',(snapshot) => {
        this.setState({notify: snapshot.val()})
    });
  }
  handleRedirect = (e) => {
    this.context.router.history.push('/admin'); 
  }
  handleClose = (e) => {
    this.setState({val: !this.state.val});
  }
  PopUp = (e) => { 
    this.setState({openN: !this.state.openN}); 
    localStorage.setItem('notify',this.state.notify.length);
  }
  render() {  
    const {classes} = this.props;
    let value = 0;
    if(this.state.notify) {
      if(localStorage.notify) {
        const notifyLocal = localStorage.getItem('notify');
        value = this.state.notify.length - notifyLocal;
        if(value < 0) {
          localStorage.setItem('notify',this.state.notify.length);  
        }
      } else {
        localStorage.setItem('notify',this.state.notify.length);
        value = this.state.notify.length;
      }
    }
    let jsx = <Loader />;
    if(this.state.notify) {
      jsx = this.state.notify.map(val => {
        return (
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{val.h1}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography> 
                {val.text}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })
    }
    return (
      <div className="Navbar flex-v fl-st"> 
          <div className="header flex-h sp-bt desktop">
            <div className="contain flex-h sp-bt desktop">
              <span className="header-date">{Date().substring(0,24)}</span>
              <i className="header-icon" onClick={this.handleRedirect}><NotificationsIcon /></i>
            </div>
          </div>
          <div className="nav">
            <div className="contain flex-h sp-bt">
              <h1 className="nav-head">Kullur Chruch</h1>
              <div className="flex-h width-none sp-bt h-full noti-top">
                <div className="notification flex-h"  onClick={this.PopUp}>
                  <NotificationsIcon className={classes.rightIcon} onClick={this.PopUp}/>
                  {value > 0 
                    ?
                    <span className="notification-bar">{value}</span>
                    :
                    <span className="notification-none"></span>
                  }
                </div>
                <div className="nav-btn flex-v mobile">
                  <span className="nav-btn-icon"></span>
                  <span className="nav-btn-icon"></span>
                  <span className="nav-btn-icon"></span>
                </div>   
                <Dialog
                  fullScreen
                  open={this.state.openN}
                  onClose={this.PopUp}
                  TransitionComponent={TransitionDown}
                >   
                  
                  <span onClick={this.PopUp} className="btn close close-small">x</span>
                  <h1 className="head">Notifications</h1>
                  <div className={classes.root}>
                    {jsx}
                  </div>
                </Dialog>
              </div>
              <input type="checkbox" className="nav-checkbox" checked={this.state.val} onChange={this.handleClose}/>
              <ul className="nav-list flex-h fl-st desktop">
                <NavLink exact to="/" activeClassName="active" className="nav-list-item">Home</NavLink>
                <NavLink exact to="/news" activeClassName="active" className="nav-list-item">News</NavLink>
                <NavLink exact to="/events" activeClassName="active" className="nav-list-item">Events</NavLink>
                <NavLink exact to="/about" activeClassName="active" className="nav-list-item">About</NavLink>
                <NavLink exact to="/contact" activeClassName="active" className="nav-list-item">Contact</NavLink>
                <NavLink exact to="/others" activeClassName="active" className="nav-list-item">Others</NavLink>
              </ul>
              <Dialog
                fullScreen
                open={this.state.val}
                onClose={this.handleClose}
                TransitionComponent={Transition}
              > 
                <ul className="nav-mobile mobile flex-v">
                  <div className="flex-h nav-sign sp-bt">
                    <span className="nav-sign-icon">Sign in</span>
                    <span onClick={this.handleClose} className="nav-close">x</span>
                  </div>
                  <NavLink to="/" className="nav-mobile-list">Home</NavLink> 
                  <NavLink to="/news" className="nav-mobile-list">News</NavLink> 
                  <NavLink to="/events" className="nav-mobile-list">Events</NavLink> 
                  <NavLink to="/contact" className="nav-mobile-list">Contact</NavLink> 
                  <NavLink to="/others" className="nav-mobile-list">Others</NavLink> 
                  <input type="text" className="nav-mobile-search" value="Search ..."/>
                </ul>    
              </Dialog> 
            </div>
          </div>
      </div>
    )
  }
}
export default withStyles(styles)(Nav);
