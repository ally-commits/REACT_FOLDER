import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent'; 
import Typography from '@material-ui/core/Typography'; 
import {database} from '../../App';
import Nav from '../Home/Nav';
import Loader from '../util/Loader';

const styles = {
    card: {
      minWidth: 275,
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
};

class NewsPage extends Component {
    constructor() {
        super();
        this.state = {
            current: false,
            news: false
        }
    }
    componentWillMount() {
        database.ref('News/').once('value',(snapshot) => {
            this.setState({news: snapshot.val(),current: snapshot.val()[0]});
        });
    }
    handleCurrent = (e) => {
        this.setState({current: this.state.news[e.target.id]}); 
    }
  render() {
    const { classes } = this.props;
    let jsx = <Loader />;
    if(this.state.current) {
    let val = this.state.current;
        jsx = (
            <Card className={classes.card}>
                <CardContent>
                    <img src={val.src} className="NewsPage-content-img"/>
                    <Typography  gutterBottom variant="h2" component="h1">
                        {val.h1}
                    </Typography>
                    <Typography component="p">
                        {val.p}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
    let content = <Loader />;
    if(this.state.news) {
        content = this.state.news.map((val,i) => {
            return (
                <div className="NewsPage-box flex-v fl-st" id={i} onClick={this.handleCurrent}>
                    <div className="flex-h NewsPage-box-dir" id={i}>
                        <img src={val.src} className="NewsPage-box-img" id={i}/>
                        <div className="NewsPage-box-content flex-v fl-st" id={i}>
                            <h1 id={i}>{val.h1}</h1>
                            <p id={i}>{val.p.substring(0,50)}</p>
                        </div>
                    </div>
                </div>
            )
        })  
    }
    return (
      <div className="flex-v NewsPage">
        <Nav />
        <div className="flex-h NewsPage">
            <div className="flex-v NewsPage-content">
                {jsx}
            </div>
            <div className="flex-v NewsPage-data">
                {content}
            </div>
        </div>
      </div>
    )
  }
}

NewsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(NewsPage);