import React from 'react';
import { View, Text, Button} from 'react-native';

export default class Chat extends React.Component {

  render() {
    // access the user's name via this.props route params
    let { name , backColor} = this.props.route.params;
    this.props.navigation.setOptions({ title: name
                                       
    });

    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center", backgroundColor:`${backColor}`}}>
        <Button 
            title="go to the start"
            onPress={()=>this.props.navigation.navigate("Start")}
        />
      </View>
    );
  };
}
