import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {database} from '../../App';
import Loader from '../util/Loader';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
});
class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      Gallery: false
    }
  }
  componentWillMount(){
    database.ref('Gallery/').once('value',(snapshot) => {
        this.setState({Gallery: snapshot.val()});
    });
  }
  render() {
    const { classes } = this.props;
    let imageData = this.state.Gallery;
    return (
      <div className="User-gallery flex-h sp-bt">
        <div className="User-gallery-script-m flex-v sp-bt">
        <h1 className="head-mark">Wording</h1>
          <div className="User-gallery-script">
            <p className="User-gallery-script-p">Cast your burden on the LORD, and he will sustain you; he will never permit the righteous to be moved.”</p>

            <p className="User-gallery-script-p">“The LORD of hosts is with us; the God of Jacob is our fortress.”</p>

            <p className="User-gallery-script-p">“The LORD is my strength and my song; he has become my salvation. Glad songs of salvation are in the tents of the righteous: ‘The right hand of the LORD does valiantly, the right hand of the LORD exalts, the right hand of the LORD does valiantly!’”</p>

            <p className="User-gallery-script-p">“You are my hiding place and my shield;I hope in your word. Depart from me, you evildoers, that I may keep the commandments of my God.”</p>

            <p className="User-gallery-script-p">“When you pass through the waters, I will be with you; and through the rivers, they shall not overwhelm you; when you walk through fire you shall not be burned, and the flame shall not consume you.”</p>

            <p className="User-gallery-script-p">“Jesus looked at them and said, ‘With man it is impossible, but not with God. For all things are possible with God.’”</p>
          </div>
        </div>
        <div className="User-gallery-content flex-v sp-bt">
        <h1 className="head-mark">Gallery</h1>
          <div className={classes.root}>
            {this.state.Gallery ?
              <GridList cellHeight={160} className={classes.gridList} cols={2}>
                {imageData.map(tile => (
                  <GridListTile key={tile.img} cols={tile.cols || 1}>
                    <img src={tile.img} alt={tile.title} className="Gallery-img"/>
                  </GridListTile>
                ))}
              </GridList>
            :
              <Loader />
            }
          </div>
        </div>
      </div>
    );
  }
}
Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gallery);