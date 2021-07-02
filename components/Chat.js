import React from 'react';
import { GiftedChat, Bubble} from 'react-native-gifted-chat'
import { View, Text, Button, Platform, KeyboardAvoidingView} from 'react-native';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      name:''
    }
  }
  componentDidMount() {
    const { name } = this.props.route.params;
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hello developer`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: `${name} has join the chat`,
          createdAt: new Date(),
          system: true,
         },
      ],
    })
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
        <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
         messages={this.state.messages}
         onSend={messages => this.onSend(messages)}
        user={{
       _id: 1,
             }}
       />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
 }
      </View>
    );
  };
}
