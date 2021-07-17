import React from 'react';
import { GiftedChat, Bubble,InputToolbar} from 'react-native-gifted-chat'
import { View, Platform, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
//import firebase
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: null,
      },
      isConnected: false,
      image: null,
      location:null,
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
    
        this.referenceChatMessages = firebase.firestore().collection("messages");
      };

      componentDidMount() {
        NetInfo.fetch().then(connection => {
          if (connection.isConnected) {
            console.log('online');
            this.setState({ isConnected: true });
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            user: {
              _id: user.uid,
              avatar: 'https://placeimg.com/140/140/any',
            },
            messages: [],
          });
          /*this.setState({
            _id: user._id,
            messages: [],
          });*/
          //this.referenceMessagesLists = firebase.firestore().collection("messages");

          this.unsubscribeUser = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
      }else{
        console.log('offline');
        this.getMessages();;
        this.setState({ isConnected: false });
      }
    });
   };

   componentWillUnmount() {
    // stop listening to authentication
   this.authUnsubscribe();
   // stop listening for changes
    this.unsubscribeUser();
 }
 async getMessages() {
  let messages = '';
  try {
    messages = await AsyncStorage.getItem('messages') || [];
    this.setState({
      messages: JSON.parse(messages)
    });
  } catch (error) {
    console.log(error.message);
  }
};
async saveMessages() {
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch (error) {
    console.log(error.message);
  }
}
async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message);
  }
}


   onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || null,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          avatar: data.user.avatar,
        },
        image: data.image,
        location: data.location
      });
    });
    this.setState({
      messages,
    })
  }
   addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || null,
      user: message.user,
      image: message.image || null,
      location: message.location || null
    })
  };
  //adding new message and append the previous one
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      this.addMessages();
      this.saveMessages();
    }

    );
  } 
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
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
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
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
        renderCustomView={this.renderCustomView}
        renderActions={this.renderCustomActions}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
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

