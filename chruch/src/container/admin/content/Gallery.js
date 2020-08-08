import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import {storage,database} from '../../../App';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Loader from '../../../components/util/Loader';
const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },

    gridList: {
      width: '100%',
      height: '100%',
    },
    card: {
        minWidth: 275,
        width: '95%',
        margin: '0 auto'
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
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            Gallery: false,
            img: '',
            text: '',
            url: '',
            progress: false,
            completed: 2,
            choice: 1
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
    }
    componentWillMount(){
        database.ref('Gallery/').once('value',(snapshot) => {
            this.setState({Gallery: snapshot.val()})
        });
    }
    handleFile = (e) => {
        let value = this.state.img;
        if(e.target.files[0]) {     
            value = e.target.files[0];
            this.setState({img: value});
        } 
    }
    handleUploadImage = (e) => {
        this.setState({progress: true})
        const uploadTask = storage.ref(`Gallery/${this.state.img.name}`).put(this.state.img);
        uploadTask.on('state_changed',(snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred  / snapshot.totalBytes) * 100);
            this.setState({completed: progress})
        },(err) => {
            console.log(err);
            this.setState({progress: false})
        },() => {
            storage.ref('Gallery').child(this.state.img.name).getDownloadURL()
                .then(url => { 
                    this.setState({url,progress: false});
                    alert('Image uploaded..');
                })
                .catch(err => console.log(err));
        });
    }
    handleUpdate(e) {
        let val = {
            title: this.state.text,
            img: this.state.url,
            author: 'admin',
            cols: this.state.choice
        }
        let Gallery = this.state.Gallery;
        Gallery.unshift(val);
        this.setState({Gallery,text: '',img: '',url: ''})
        database.ref('Gallery/').set(Gallery)
            .then(data => alert('saved'))
            .catch(err => console.log(err));
    }
    handleText = (e) => {
        this.setState({text: e.target.value});
    }
    handleChoice = (e) => {
        this.setState({choice: e.target.value});
    }
  render() {
    const {classes} = this.props;
    const imageData = this.state.Gallery;
    return (
      <div className="Gallery flex-h">
        {this.state.progress &&
            <div className="loading">
                <div className="position-center">
                    <CircularProgress
                        className={classes.progress}
                        variant="static"
                        value={this.state.completed}
                    />
                </div>
            </div>
        }
        <div className="Gallery-control flex-v">
            <Card className={classes.card}>
                <CardContent>
                    <h1 className="head">Upload image for gallery here</h1>
                    <div className="flex-h sp-bt">
                        <input 
                            type="file" 
                            onChange={this.handleFile} 
                            className="input mb-3" 
                        />
                        <Button variant="contained" color="default" className={classes.button} onClick={this.handleUploadImage}>
                            Upload Image
                            <CloudUploadIcon className={classes.rightIcon} />
                        </Button>
                    </div>
                    <span className="label mt-2 mb-1">Enter Image Name</span>
                    <input 
                        type="text" 
                        placeholder="Enter image name" 
                        onChange={this.handleText} 
                        className="form-control"
                        value={this.state.text}
                    /> 
                
                    <Button 
                        variant="contained" color="secondary" 
                        className={classes.button} onClick={this.handleUpdate}
                    >
                        Upload
                    </Button>
                </CardContent>
            </Card>
        </div>
        <div className="Gallery-content">
            {this.state.Gallery &&
                <div className={classes.root}>
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        {imageData.map(tile => (
                        <GridListTile key={Math.random()} cols={tile.cols || 1}>
                            <img src={tile.img} alt={tile.title} />
                        </GridListTile>
                        ))}
                    </GridList>
                </div>
            }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Gallery);
