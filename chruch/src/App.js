import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'; 
import firebase from 'firebase';

import 'bootstrap/dist/css/bootstrap.css';
import './style/style.scss';

import {config} from './config/firebase';


import Home from './components/Home';
import NewsPage from './components/News/NewsPage';

//secured
import Admin from './container/admin/Admin'; 
import Login from './container/Login'; 

firebase.initializeApp(config);

export const storage = firebase.storage();
export const database = firebase.database();
export const fire = firebase;

// // // // writeUserData(email,fname,lname){ 
  // firebase.database().ref('Notify/').set([
  //   {
  //      date: '12/01/1000',
  //      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fuga. Et officiis voluptatum tenetur dolorum eius. Odit modi placeat architecto!',
  //      id: Math.random()
  //   } 
  // ]).then((data)=>{
  //     //success callback
  //     console.log('data ' , data)
  // }).catch((error)=>{
  //     //error callback
  //     console.log('error ' , error)
  // })

// firebase.database().ref('UsersList/').push({
//   email: 'alwyncrasta nskdsk',
//   fname: 'laiwn'
// }).then((data)=>{
//   //success callback
//   console.log('data ' , data)
// }).catch((error)=>{
//   //error callback
//   console.log('error ' , error)
// })

// firebase.database().ref('News/').set([
//   {
//     name: 'news-1',
//     _id: Math.random(),
//     src: 'https://firebasestorage.googleapis.com/v0/b/chruch-fb1df.appspot.com/o/Slider%2F20171121174939.jpg?alt=media&token=ce47d6d9-55a2-4fde-a6e3-9a49434119d5',
//     h1: 'news-1',
//     p: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia explicabo doloremque, quod deserunt porro aperiam ratione cum optio pariatur est voluptatum. Dolore ex in eos nemo id aspernatur numquam facilis, officiis ipsum cumque corrupti sit unde pariatur voluptatem harum maiores illo laborum, quis hic nam?', 
//   },
//   {
//     name: 'news-2',
//     _id: Math.random(),
//     src: 'https://firebasestorage.googleapis.com/v0/b/chruch-fb1df.appspot.com/o/Slider%2F20171121174939.jpg?alt=media&token=ce47d6d9-55a2-4fde-a6e3-9a49434119d5',
//     h1: 'news-2',
//     p: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia explicabo doloremque, quod deserunt porro aperiam ratione cum optio pariatur est voluptatum. Dolore ex in eos nemo id aspernatur numquam facilis, officiis ipsum cumque corrupti sit unde pariatur voluptatem harum maiores illo laborum, quis hic nam?', 
//   },
//   {
//     name: 'news-3',
//     _id: Math.random(),
//     src: 'https://firebasestorage.googleapis.com/v0/b/chruch-fb1df.appspot.com/o/Slider%2F20171121174939.jpg?alt=media&token=ce47d6d9-55a2-4fde-a6e3-9a49434119d5',
//     h1: 'news-3',
//     p: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia explicabo doloremque, quod deserunt porro aperiam ratione cum optio pariatur est voluptatum. Dolore ex in eos nemo id aspernatur numquam facilis, officiis ipsum cumque corrupti sit unde pariatur voluptatem harum maiores illo laborum, quis hic nam?', 
//   } 
// ]);


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home}></Route>  
              <Route exact path="/news" component={NewsPage}></Route>  
              <Route exact path="/admin" component={Admin}></Route>  
              <Route exact path="/login" component={Login}></Route>  
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
