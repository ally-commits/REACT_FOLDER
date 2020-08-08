import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {database,storage} from '../../../App';
import Loader from '../../../components/util/Loader';

const style = theme => ({
    card: {
        width: '100%'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: '20px',
        marginBottom: '20px',
        width: '100%',
    },
    progress: {
        margin: theme.spacing.unit * 4,
        width: '40px'
    },
})

class Obi extends React.Component {
    constructor() {
        super();
        this.state = {
            obi: false,
            name: '',
            url: '',
            img: '',
            from: '',
            to: '',
            desc:'',
            progress: false
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    componentWillMount() {
        database.ref('Obi/').once('value',(snapshot) => {
            this.setState({obi: snapshot.val()})
        });
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
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
        const uploadTask = storage.ref(`Obi/${this.state.img.name}`).put(this.state.img);
        uploadTask.on('state_changed',(snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred  / snapshot.totalBytes) * 100);
            this.setState({completed: progress})
        },(err) => {
            console.log(err);
            this.setState({progress: false})
        },() => {
            storage.ref('Obi').child(this.state.img.name).getDownloadURL()
                .then(url => { 
                    this.setState({url,progress: false});
                    alert('Image uploaded..');
                })
                .catch(err => console.log(err));
        });
    }
    handleUpdate = (e) => {
            let value = this.state.obi; 
            value.unshift({
                img: this.state.url,
                name: this.state.name,
                from: this.state.from,
                to: this.state.to,
                desc: this.state.desc
            });
            database.ref('Obi/').set(value)
                .then((data)=>{
                    alert('updated');
                })
                .catch((error)=>{ 
                    alert('No updated try again');
                })
            this.setState({obi: value,img: '',name: '',from:' ',to: '',desc: '',url: ''})
    }
    render() {
        const {classes} = this.props;
        let jsx = <Loader />;
        if(this.state.obi) {
            jsx = this.state.obi.map(val => {
                return (
                    <div class="O-box">
                        <img src={val.img} className="O-box-img" />
                        <h1 className="O-box-h1">{val.name}</h1>
                        <h1 className="O-box-span">{val.from} - {val.to}</h1>
                        <h1 className="O-box-desc">{val.desc}</h1>
                    </div>
                )
            })
        }
        return (
            <div className="Obi flex-h">
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
                <div className="Obi-control">
                    <Card className={classes.card}>
                        <CardContent>
                            <h1 className="head">Upload image for here</h1>
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
                            <span className="label mt-2 mb-1">Enter Name of the person</span>
                            <input 
                                type="text" 
                                placeholder="Enter Person name"  
                                className="form-control" 
                                value={this.state.name}
                                name="name"
                                onChange={this.handleChange}
                            />  
                            <span className="label mt-2 mb-1">Enter birth date</span>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.from}
                                name="from"
                                onChange={this.handleChange}
                            />
                            <span className="label mt-2 mb-1">Enter expired date</span>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.to}
                                name="to"
                                onChange={this.handleChange}
                            />
                            <span className="label mt-2 mb-1">Enter Description</span>
                            <textarea
                                className="form-control mb-2"
                                placeholder="Enter the Desription"
                                value={this.state.desc}
                                name="desc"
                                onChange={this.handleChange}
                            >
                            </textarea>
                            <Button 
                                variant="contained" color="secondary"  
                                onClick={this.handleUpdate}
                            >
                                Upload
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="Obi-content flex-h wrap">
                    {jsx}
                </div>
            </div>
        )
    }
}
export default withStyles(style)(Obi);