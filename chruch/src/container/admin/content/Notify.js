import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import {database} from '../../../App';
import Loader from '../../../components/util/Loader';

const styles = {
    card: {
      minWidth: '100%',
      width: '100%'
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

class Notify extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            h1: '',
            date: '',
            notify: []
        }
    }
    componentDidMount() {
        database.ref('Notify/').once('value',(snapshot) => {
            this.setState({notify: snapshot.val()})
        });
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleUpdate = (e) => {
        let value = this.state.notify;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        today = mm + '/' + dd + '/' + yyyy; 
        if(value == null) {
            value = [{
                text: this.state.text,
                h1: this.state.h1,
                date: today,
                id: Math.random()
            }];
        } else {
            value.unshift({
                text: this.state.text,
                h1: this.state.h1,
                date: today,
                id: Math.random()
            });
        }
        database.ref('Notify/').set(value)
            .then((data)=>{
                alert('updated');
            })
            .catch((error)=>{ 
                alert('No updated try again');
            })
        this.setState({notify: value,text: '',h1: ''})
    }
    handleDelete = (e) => {
        let value = this.state.notify;
        value = value.filter(val => {
            if(e.target.id != val.id) {
                return (
                    val
                )
            }
        }); 
        database.ref('Notify/').set(value)
            .then((data)=>{
                alert('updated');
            })
            .catch((error)=>{ 
                alert('No updated try again');
            })
        this.setState({notify: value});
    }
  render() {
    const {classes} =  this.props;
    let jsx = <Loader />;
    if(this.state.notify) {
        if(this.state.notify.length > 0) {
            jsx = this.state.notify.map(val => {
                return (
                    <div className="Notify-p">
                        <p className="Notify-p-h1">{val.h1}</p>
                        <p className="Notify-p-1">{val.text.substring(0,100)}....</p>
                        <div className="flex-h Notify-p-content">
                            <p>{val.date}</p>
                            <button  
                                className="btn btn-simple" 
                                onClick={this.handleDelete}
                                id={val.id}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            });
        } else {
            jsx = (
                <div className="Notify-p">
                    <p className="Notify-p-1">No data</p>
                </div>
            )
        }
    }
    return (
      <div className="flex-h Notify">
          <div className="flex-v Notify-control">
            <Card className={classes.card}>
                <CardContent>
                    <h1 className="head">Notify</h1>
                    <label className="label">Enter Notification Head</label>
                    <input
                        type="text"
                        name="h1"
                        value={this.state.h1}
                        onChange={this.handleInput}
                        className="form-control"
                    />
                    <label className="label">Enter Notification Content</label>
                    <textarea  
                        className="form-control mt-3 mb-3"
                        value={this.state.text}
                        name="text"
                        onChange={this.handleInput}
                    >
                    </textarea>
                    <Button 
                        variant="contained"
                        color="secondary"  
                        onClick={this.handleUpdate}
                    >
                        Upload
                    </Button>
                </CardContent>
            </Card>
        </div>
        <div className="flex-v Notify-content">
            <Card className={classes.card}>
                <CardContent >
                    {jsx}
                </CardContent>
            </Card>
        </div>
      </div>
    )
  }
}
Notify.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notify);
