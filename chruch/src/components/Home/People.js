import React from 'react';
import img from '../../img/france.jpg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; 
import Dialog from '@material-ui/core/Dialog';  
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Loader from '../util/Loader';

const styles = {
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
    card: {
        minWidth: 275,
        width: '90%',
        height: '90vh',
        margin: '5vh auto'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
        title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};
  
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
  
class People extends React.Component {
    state = {
      open: false,
      people: [
          {
            src: img,
            h1: 'POPE Franchis 1',
            h3: 'POPE',
            p: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis qui sed sapiente voluptatum, quod tempora voluptates molestias ipsa quidem exercitationem soluta a, veritatis magni eaque libero perspiciatis itaque mollitia quos deleniti corrupti necessitatibus, nobis impedit pariatur? Cupiditate, necessitatibus. Eum expedita eveniet voluptates culpa hic alias ipsum, repudiandae necessitatibus distinctio! Totam.'
          },
          {
            src: img,
            h1: 'POPE Franchis 2',
            h3: 'POPE',
            p: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis qui sed sapiente voluptatum, quod tempora voluptates molestias ipsa quidem exercitationem soluta a, veritatis magni eaque libero perspiciatis itaque mollitia quos deleniti corrupti necessitatibus, nobis impedit pariatur? Cupiditate, necessitatibus. Eum expedita eveniet voluptates culpa hic alias ipsum, repudiandae necessitatibus distinctio! Totam.'
          },
          {
            src: img,
            h1: 'POPE Franchis 3',
            h3: 'POPE',
            p: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis qui sed sapiente voluptatum, quod tempora voluptates molestias ipsa quidem exercitationem soluta a, veritatis magni eaque libero perspiciatis itaque mollitia quos deleniti corrupti necessitatibus, nobis impedit pariatur? Cupiditate, necessitatibus. Eum expedita eveniet voluptates culpa hic alias ipsum, repudiandae necessitatibus distinctio! Totam.'
          },
          {
            src: img,
            h1: 'POPE Franchis 4',
            h3: 'POPE',
            p: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis qui sed sapiente voluptatum, quod tempora voluptates molestias ipsa quidem exercitationem soluta a, veritatis magni eaque libero perspiciatis itaque mollitia quos deleniti corrupti necessitatibus, nobis impedit pariatur? Cupiditate, necessitatibus. Eum expedita eveniet voluptates culpa hic alias ipsum, repudiandae necessitatibus distinctio! Totam.'
          }
      ]
    };
  
    handleClickOpen = (e) => {
      this.setState({ open: true,current: this.state.people[e.target.id] });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    render() {
      const { classes } = this.props;
      let jsx = <Loader />;
      let current = <Loader />;
      if(this.state.people) {
        jsx = this.state.people.map((val,i) => {
            return (
                <div className="People-box" onClick={this.handleClickOpen} id={i}> 
                    <img src={val.src} alt="img" className="People-box-img" id={i}/>
                    <h3 className="People-box-h3" id={i}>{val.h1}</h3>
                    <p className="People-box-p" id={i}>{val.h3}</p>
                </div>
            )
        })
      }
      if(this.state.current) {
          let val = this.state.current;
          current = (
            <div className="flex-v">
                <img src={val.src} alt="img" className="Dailog-box-img" />
                <h3 className="Dailog-box-h3">{val.h1}</h3>
                <p className="Dailog-box-p">{val.h3}</p>
                <p className="Dailog-box-p">{val.p}</p>
            </div>
          )
      }
      return (
        <div className="People flex-v"> 
            <h1 className="head-mark">KEY Persons</h1>
            <div className="flex-h sp-bt wrap">{jsx}</div>
            <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={Transition}
            >
                <Card className={classes.card}>
                    <CardContent>
                        <span className="btn close" onClick={this.handleClose  }>x</span>
                        {current}
                    </CardContent>
                </Card>
            </Dialog>
        </div>
      );
    }
  }
  
People.propTypes = {
classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(People);
 
