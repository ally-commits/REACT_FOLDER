import React, { Component } from 'react';
import post from '../../img/post-2.jpg';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import {database} from '../../App';
import Loader from '../util/Loader';
export default class News extends Component {
  constructor() {
    super();
    this.state = {
      news: false,
      active: 1
    }
    this.handlePagination = this.handlePagination.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object
  }
  componentDidMount() {
    database.ref('News/').once('value',(snapshot) => {
      this.setState({news: snapshot.val()})
    });
  }
  handlePagination = (e) => {
    this.setState({active: e.target.id});
  }
  handleRedirect = (e) => {
    this.context.router.history.push('./news');
  }
  render() {
    let jsx = <Loader />,i=0;
    let total = Math.floor(this.state.news.length / 4);
    let extra = this.state.news.length % 4;
    let start = this.state.active * 4 - 4;
    let end = this.state.active * 4; 
    if(extra > 0) {
      total++;
    } 
    if(this.state.news) {
      jsx = this.state.news.map((val,i) => { 
        if(i >= start && i < end) {
          return (
            <div className="News-box" onClick={this.handleRedirect}>
                <img src={val.src || post} alt="img" className="News-img" />
                <p className="News-text"><span>{val.h1}</span>{val.p.substring(0,30)}</p>
            </div>
          )
        } else {
          return (
            <div className="none"></div>
          )
        }
      });
    }
    let active = this.state.active;
    let items = [];
    for (let number = 1; number <= total; number++) {
      items.push(
        <Pagination.Item key={number} active={number == active} id={number} onClick={this.handlePagination}>
          {number}
        </Pagination.Item>,
      );
    }
    return (
      <div className="News flex-v">
        <h1 className="head-mark">Latest news</h1>
        <div className="flex-h wrap">{jsx}</div>
        <div className="flex-h pagi">
          <Pagination>{items}</Pagination>
        </div>
      </div>    
    )
  }
}
