import React, { Component } from 'react'
import {database,storage} from '../../../App';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'; 
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Loader from '../../../components/util/Loader';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    card: {
      width: '100%',
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
    progress: {
        margin: theme.spacing.unit * 4,
        width: '40px'
    },
})
class News extends Component {
    constructor() {
        super();
        this.state = {
            news:  false,
            img: '',
            h1: '',
            p:'',
            url: '',
            edit: false,
            progress: 0
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleH1 = this.handleH1.bind(this);
        this.handleP = this.handleP.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleTextUpdate = this.handleTextUpdate.bind(this);
    }
    componentDidMount() {
        database.ref('News/').once('value',(snapshot) => {
            this.setState({news: snapshot.val()})
        });
    }
    handleFile = (e) => {
        let value = this.state.img;
        if(e.target.files[0]) {     
            value = e.target.files[0];
            this.setState({img: value});
        } 
    }
    handleH1 = (e) => { 
        this.setState({h1: e.target.value});
    }
    handleP = (e) => {  
        this.setState({p: e.target.value});
    }
    handleTextUpdate = (e) => {
        let val = this.state.news;
        if(e.target.id == 1) {
            val[this.state.edit].h1 = e.target.value;
        } else {
            val[this.state.edit].p = e.target.value;
        }
        this.setState({news: val})
    }
    handleDelete = (e) => {
        let value = this.state.news;
        let _id = e.target.id;
        value = value.filter(val => { 
            if(val._id != _id) { 
                return val;
            }
        }); 
        this.setState({news: value});
    }
    handleUpdate = () => {        
        database.ref('News/').set(this.state.news)
            .then(d => alert('done'))
            .catch(err => alert('somethig went wrong..'));
    }
    handleUploadImage = (e) => {  
        const uploadTask = storage.ref(`News/${this.state.img.name}`).put(this.state.img);
        uploadTask.on('state_changed',(snapshot) => {
            const progress = Math.round(    (snapshot.bytesTransferred  / snapshot.totalBytes) * 100);
            this.setState({progress})
        },(err) => {
            console.log(err);
        },() => {
            storage.ref('News').child(this.state.img.name).getDownloadURL()
                .then(url => { 
                    if(this.state.edit) {
                        let val = this.state.news;
                        val[this.state.edit].src = url;
                        this.setState({news: url,progress: false});
                        alert('Done...!');
                    } else {
                        this.setState({url});
                    }
                })
                .catch(err => console.log(err));
        });
    }
    handleAdd = (e) => {
        let value = this.state.news;
        value.unshift({
            _id: Math.random(),
            h1: this.state.h1,
            name: 'news-' + this.state.news.length,
            p: this.state.p,
            src: this.state.url
        });
        this.setState({news: value});
    }
    handleEdit = (e) => {
        this.setState({edit: e.target.id });
    }
    handleUpdateFile = (e) => {
        let value = this.state.img;
        if(e.target.files[0]) {     
            value = e.target.files[0];
            this.setState({img: value});
        }
        this.handleUploadImage('content');
    }
    handleCloseEdit = (e) => {
        this.setState({edit: false,img: ''});
    }
  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    let jsx = <Loader />; 
    let current = <Loader />;
    if(this.state.news) {
        jsx = this.state.news.map((val,i) => {
            return (
                <div className="admin-box flex-v fl-st">
                    <div className="flex-h admin-box-dir">
                        <img src={val.src} className="admin-box-img" />
                        <div className="admin-box-content flex-v">
                            <h1>{val.h1}</h1>
                            <p>{val.p.substring(0,50)}</p>
                        </div>
                    </div>
                    <div className="flex-h sp-ar"> 
                        <button  id={i} className="btn btn-edit" onClick={this.handleEdit}>Edit</button>
                        <button  id={val._id} className="btn btn-edit" onClick={this.handleDelete}>Delete</button>
                    </div>
                </div>
            )
        });
    }
    if(!this.state.edit) {
        current = (
            <div>
                <div className="flex-h sp-bt">
                    <input type="file" onChange={this.handleFile} className="input mb-3" name="1" />
                    <Button variant="contained" color="default" className={classes.button} onClick={this.handleUploadImage}>
                        Upload Image
                        <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                </div>
                <input type="text" onChange={this.handleH1} placeholder="Enter heading" className="form-control mb-3" value={this.state.h1}/>
                <textarea onChange={this.handleP} placeholder="Enter paragraph" value={this.state.p} className="mb-3 form-control" >
                
                </textarea>
                <Button variant="contained" color="secondary"
                    classes={classes.button} onClick={this.handleAdd}
                >
                    Add
                </Button>
            </div>
        )
    } else {
        current = (
            <div>
                <div className="flex-h sp-bt">
                    <input type="file" onChange={this.handleUpdateFile} className="input mb-3" name="1" />
                    <Button variant="contained" color="default" className={classes.button} onClick={this.handleUploadImage}>
                        Upload Image
                        <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                </div>
                <input 
                    type="text" onChange={this.handleTextUpdate} 
                    placeholder="Enter heading" className="form-control mb-3" 
                    value={this.state.news[this.state.edit].h1}
                    id={1}
                />
                <textarea 
                    onChange={this.handleTextUpdate} placeholder="Enter paragraph" 
                    value={this.state.news[this.state.edit].p} className="mb-3 form-control" 
                    id={2}
                >
                
                </textarea>
                <Button variant="contained" color="secondary"
                    classes={classes.button} onClick={this.handleCloseEdit}
                >
                    Update
                </Button>
            </div>
        )
    }
    return (
      <div className="Admin-news flex-v">
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
        <h1 className="head-admin">News</h1>
        <button className="btn btn-update " onClick={this.handleUpdate}>Update</button>
        <div className="flex-h Admin-news-content">
            <div className="flex-v Admin-news-content-block">
                <Card className={classes.card}>
                    <CardContent>
                        {current}
                    </CardContent> 
                </Card>
            </div>
            <div className="flex-v Admin-news-content-right">
                {jsx}
            </div>
        </div> 
      </div>
    )
  }
}
News.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(News);
