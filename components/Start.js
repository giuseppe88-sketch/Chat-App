import React, { Component, useState} from 'react';
//import packages 
import { ImageBackground,StyleSheet, TouchableOpacity, Alert, View, Text, TextInput, Button } from 'react-native';


export default class Start extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
    name: '',
    backColor: '#757083'
  }
 
}

 render() {
    
     return (
     <View style={styles.container}>
         <ImageBackground source={require('/home/giuseppe/Desktop/Chat/assets/assets_project/Background-Image.png')} style={styles.image}>
           <Text style={styles.title}>Chat App</Text>
           <View style={styles.chatBox}>
             <TextInput style={styles.InputText}
               onChangeText={(name) => this.setState({name})}
               value={this.state.name}
               placeholder='your name ...'
             />
             <View>
                 <Text style={styles.chooseText}>Choose BackGround Color</Text>
                 <View style={styles.colorStyle}>

             <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="More options"
                  accessibilityHint="Let’s you choose you backround color."
                  style={styles.backColor1}
                  onPress={() => this.setState({ backColor: '#090C08' })} >
               
               </TouchableOpacity>
               <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="More options"
                  accessibilityHint="Let’s you choose you backround color."
                  style={styles.backColor2}
                  onPress={() => this.setState({ backColor: '#474056' })} >
               
               </TouchableOpacity>
               <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="More options"
                  accessibilityHint="Let’s you choose you backround color."
                  style={styles.backColor3}
                  onPress={() => this.setState({ backColor: '#8A95A5' })} >
               
               </TouchableOpacity>
               <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="More options"
                  accessibilityHint="Let’s you choose you backround color."
                  style={styles.backColor4}
                  onPress={() => this.setState({ backColor: '#B9C6AE' })} >
               
               </TouchableOpacity>
                </View>
             </View>
             <TouchableOpacity
                //navigate to chat page whit this name and color adding an object to the second poarameter to navigate
                 onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, backColor: this.state.backColor })}
                 style={styles.startButton}
                accessibilityLabel="click for start you chat"
                >
               <Text style={styles.textButton}>Start Chatting</Text>
                </TouchableOpacity>
          
          </View>   
        </ImageBackground> 
     </View>
   );
 }
}
// create styles 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    chatBox:{
        width: '88%',
        backgroundColor:'white',
        marginRight: 'auto',
        marginLeft:'auto',
        height: '44%',
        
    
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
        
      },
    title:{
        fontSize: 45,
        fontWeight:"600",
        color:'#FFFFFF',
        margin: 'auto',
        textAlign: 'center',
        height:'50%',
        paddingTop:3
    },
    InputText:{
        height: 55, 
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingLeft: 20,
        fontSize: 16,
        fontWeight:"400",
        borderRadius:4
        
    },
    colorStyle:{
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 2
    },

    backColor1:{
        backgroundColor:'#090C08',
        width: 50,
        height: 50,
        borderRadius: 30,
        margin:3
    },
    backColor2:{
        backgroundColor:'#474056',
        width: 50,
        height: 50,
        borderRadius: 30,
        margin:3
    },
    backColor3:{
        backgroundColor:'#8A95A5',
        width: 50,
        height: 50,
        borderRadius: 30,
        margin:3
    },
    backColor4:{
        backgroundColor:'#B9C6AE',
        width: 50,
        height: 50,
        borderRadius: 30,
        margin:3
    },
    chooseText:{
        fontSize: 16,
        fontWeight: "300",
        color:'#757083',
        opacity: 100,
        marginLeft:10
    },
    startButton:{
        height:50,
        backgroundColor: '#757083',
        marginRight:15,
        marginLeft:15,
        marginTop:5
        
    },
    textButton:{
        fontSize:16,
        fontWeight:"600",
        color:"#FFFFFF",
        textAlign: 'center',
        margin: 13
    }


  });