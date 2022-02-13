import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import {Camera} from 'expo-camera'
import * as Permissions from 'expo-permissions'
import * as FaceDetector from 'expo-face-detector'
import { StatusBar } from 'react-native-web';

export default class Main extends React.Component{
constructor(props){
super(props)
this.state={
    hascamPermissions:null,
    faces:[]

}
}

onCameraPermission=(status)=>{
    this.setState({
        hascamPermissions:status.status== 'granted'
    })
    console.log('hola')
}

faceDetected=(faces)=>{
    this.setState({
        faces:faces
    })
    console.log('hello')
}

detectError=(error)=>{
    console.log(error)
    console.log('hi')
}

componentDidMount(){
    Permissions.askAsync(Permissions.CAMERA).then(this.onCam)
    
}

  render(){
      const{hascamPermissions}=this.state
      if(hascamPermissions==null){
          return <View/>
      }

      if(hascamPermissions==false){
          return(
              <View>
                  <Text>Please give camera access</Text>
              </View>
          )
      }

      console.log(this.state.faces)

   return (
    <View style={styles.container}>
        <SafeAreaView style={styles.androidSafeArea} />
        <View style={styles.headingContainer}>
            <Text style={styles.titleText}>FRAPP</Text>
        </View>
        <View style={styles.cameraSection}>
            <Camera 
            style={{flex:1}}
            type={Camera.Constants.Type.front}
            faceDetectorSetting={{
                
                mode: FaceDetector.FaceDetectorMode.fast,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                runClassifications: FaceDetector.FaceDetectorClassifications.all,
            }}
            onFacesDetected={this.faceDetected}
            onFacesDetectionError={this.detectError}
            />
        </View>
        <View style={styles.filter}>

        </View>
        <View style={styles.action}>

        </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
      flex: 0.1
  },
  titleText:{
     fontSize:30 
  },
  cameraSection:{
      flex:0.65
  },
  filter:{
  //    flex:
  },
  action:{
 //     flex:
  },
  androidSafeArea:{
      marginTop:Platform.OS=='android'?StatusBar.currentHeight:0
  }
});

//● mode (FaceDetector.Constants.Mode) : Whether to detect faces in fast or accurate mode.
//● detectLandmarks(FaceDetecto r.Constants.Landmarks): Whether to detect and return landmark positions on the face (ears, eyes, mouth, cheeks, nose). Valid values: all, none.
//● runClassifications(FaceDetect or.Constants.Classifications): Whether to run additional classifications on detected faces (smiling probability, open eye probabilities). Valid values: all, none