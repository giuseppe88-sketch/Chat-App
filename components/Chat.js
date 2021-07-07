import React from 'react';
import { GiftedChat, Bubble} from 'react-native-gifted-chat'
import { View, Text, Button, Platform, KeyboardAvoidingView} from 'react-native';

//import firebase
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: null
      }
    };
  const firebaseConfig = {
    apiKey: "AIzaSyB2MfxO9hFdjdfD6FaX7rrTgHUFNmhqGRk",
    authDomain: "test-e20eb.firebaseapp.com",
    projectId: "test-e20eb",
    storageBucket: "test-e20eb.appspot.com",
    messagingSenderId: "936257791893",
    appId: "1:936257791893:web:4a339353ae5554f975b89c",
    measurementId: "G-GP90869BT8"
  };

      if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
        }
    
        this.referenceMessagesLists = firebase.firestore().collection("messages");
      };

      componentDidMount() {
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            _id: user._id,
            messages: [],
          });
          this.referenceMessagesLists = firebase.firestore().collection("messages");

          this.unsubscribeUser = this.referenceMessagesLists
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
    
   };

   componentWillUnmount() {
    // stop listening to authentication
   this.authUnsubscribe();
   // stop listening for changes
    this.unsubscribeUser();
 }

   onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    
    this.setState({
      messages,
    });
  };
   addMessages() {
    const messages = this.state.messages[0];
   
    this.referenceMessagesLists.add({
      _id: messages._id,
      createdAt: messages.createdAt,
      text: messages.text,
      user: {
        _id: messages.user._id,
        avatar: messages.user.avatar,
        name: messages.user.name,
      },
    })
  };
  //adding new message and append the previous one
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    })),
    () => {
      this.addMessages();
    }
  } 

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }
  render() {
    // access the user's name via this.props route params
    let { name , backColor} = this.props.route.params;

    this.props.navigation.setOptions({ title: name
       });
    return (
      <View style={{flex:1, backgroundColor:`${backColor}`}}>
        <GiftedChat //rendering message to userinterface using giftedchat whit its props, renderbubble allows altered how message display
        renderBubble={this.renderBubble.bind(this)}
         messages={this.state.messages}
         onSend={messages => this.onSend(messages)}
        user={{
       _id: 1,
       name:name
             }}
       />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
 }
      </View>
    );
  };
}
