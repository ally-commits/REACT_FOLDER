import React, { Component } from 'react'
import {database,storage} from '../../../App';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import Loader from '../../../components/util/Loader';

const styles = theme => ({
    card: {
      minWidth: 275,
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
    progress: {
        margin: theme.spacing.unit * 4,
        width: '40px'
    },
});

class Slider extends Component {
    constructor() {
        super();
        this.state = {
            slider: false,
            progress: 0,        
            img: [
                {
                    image: null,
                    url: null,
                },
                {
                    image: null,
                    url: null,
                },
                {
                    image: null,
                    url: null,
                },
                {
                    image: null,
                    url: null,
                }
            ]
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleH1 = this.handleH1.bind(this);
        this.handleP = this.handleP.bind(this);
        this.handleEnable = this.handleEnable.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    componentDidMount() {
        database.ref('Slider/').once('value',(snapshot) => {
            this.setState({slider: snapshot.val()})
        });
    }
    handleFile = (e) => {
        let value = this.state.img;
        if(e.target.files[0]) {     
            value[e.target.name].image = e.target.files[0];
            this.setState({img: value});
            this.handleUploadImage(e.target.name);
        }
    }
    handleH1 = (e) => {
        let value = this.state.slider;
        value[e.target.name].h1 = e.target.value;
        this.setState({slider: value});
    }
    handleP = (e) => {
        let value = this.state.slider;
        value[e.target.name].p = e.target.value;
        this.setState({slider: value});
    }
    handleEnable = (e) => {
        let value = this.state.slider;
        value[e.target.name].enable = !value[e.target.name].enable;
        this.setState({slider: value});
    }
    handleUpdate = () => {        
        database.ref('Slider/').set(this.state.slider)
        .then(data => alert("updated"))
        .catch(err => console.log(err));
    }
    handleUploadImage = (id) => {
        let val = this.state.img[id];
        let value = this.state.slider;
        const uploadTask = storage.ref(`Slider/${val.image.name}`).put(val.image);
        uploadTask.on('state_changed',(snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred  / snapshot.totalBytes) * 100);
            this.setState({progress})
        },(err) => {
            console.log(err);
        },() => {
            storage.ref('Slider').child(val.image.name).getDownloadURL()
                .then(url => {
                    value[id].src = url;
                    this.setState({slider: value,progress: false});
                    alert('updated');
                })
                .catch(err => console.log(err));
        });
    }
  render() {
    const {slider} = this.state; 
    const { classes } = this.props;
    let jsx = <Loader />;
    if(this.state.slider) { 
        jsx = slider.map((val,i) => {
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <div className="flex-h sp-ar">
                            <h3 className="uppercase">{val.name}</h3>
                            <input 
                                type="checkbox" 
                                onChange={this.handleEnable} 
                                className="checkbox" 
                                checked={val.enable}
                                name={i}
                            />
                        </div>
                        <img src={val.src} className="Slider-img-load" />
                        <input type="file" onChange={this.handleFile} className="input-full" name={i}/>
                        <input
                            type="text" 
                            placeholder="Enter the h1" 
                            onChange={this.handleH1} 
                            className="input-full" 
                            value={val.h1}
                            name={i}
                        />
                        <input 
                            type="text" 
                            placeholder="Enter the p" 
                            onChange={this.handleP} 
                            className="input-full"
                            value={val.p}
                            name={i}
                        />
                    </CardContent>
                </Card>
            )    
        });
    } else {
        jsx = (
            <Loader />
        )
    }
    return (
      <div className="Admin-slider flex-v">
                {this.state.progress &&
                    <div className="loading">
                        <div className="position-center">
                            <CircularProgress
                                className={classes.progress}
                                variant="static"
                                value={this.state.progress}
                            />
                        </div>
                    </div>
                }
            <h1 className="head-admin">Control Sliding Images</h1>
            <button className="btn btn-update" onClick={this.handleUpdate}>Update</button>
            <div className="flex-h sp-ar">
                {jsx}
            </div>
      </div>
    )
  }
}
Slider.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Slider);
