import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import * as Permissions from "expo-permissions";

import * as FaceDetector from 'expo-face-detector';

import { Camera } from 'expo-camera';

import Filter1 from './Filter1'
import Filter2 from './Filter2'
import Filter3 from './Filter3'
import Filter4 from './Filter4'
import Filter5 from './Filter5'
import Filter6 from './Filter6'
import Filter7 from './Filter7'
import Filter8 from './Filter8'
import Filter9 from './Filter9'
import Filter10 from './Filter10'

let data = [
    {   
        "id": "1",
        "image": require('../assets/glasses.png')
    },
    {   
        "id": "2",
        "image": require('../assets/glasses-round.png')
    },
    {   
        "id": "3",
        "image": require('../assets/FRAPP-02.png')
    },
    {   
        "id": "4",
        "image": require('../assets/Frapp-03.png')
    },
    {   
        "id": "5",
        "image": require('../assets/Frapp-04.png')
    },
    {   
        "id": "6",
        "image": require('../assets/Frapp-05.png')
    },
    {   
        "id": "7",
        "image": require('../assets/Frapp-06.png')
    },
    {   
        "id": "8",
        "image": require('../assets/Frapp-07.png')
    },
    {   
        "id": "9",
        "image": require('../assets/Frapp-08.png')
    },
    {   
        "id": "10",
        "image": require('../assets/Frapp-09.png')
    },
]


export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: [],
            current_filter: "filter_1"
        }
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onFacesDetected = this.onFacesDetected.bind(this)
        this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
    }

    componentDidMount() {
        Permissions
            .askAsync(Permissions.CAMERA)
            .then(this.onCameraPermission)
    }

    onCameraPermission = (status) => {
        this.setState({ hasCameraPermission: status.status === 'granted' })
    }

    onFacesDetected = (faces) => {
        this.setState({ faces: faces })
    }

    onFaceDetectionError = (error) => {
        console.log(error)
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        console.log(this.state.faces)
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <View styles={{ flexDirection: 'row', flexWrap: 'wrap'}}> 
                    <Text style={styles.titleText1}>FR</Text><Text style={styles.titleText2}>APP</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}> 
                    <Text style={styles.subheading1}>Try Our</Text><Text style={styles.subheading2}> Cool Frames</Text>
                </View>
            </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                    {
                            this.state.faces.map(face => {
                                if (this.state.current_filter === "filter_1") {
                                return <Filter1 key={face.faceID} face={face} />
                                } else if (this.state.current_filter === "filter_2") {
                                    return <Filter2 key={face.faceID} face={face} />
                                } else if (this.state.current_filter === "filter_3") {
                                    return <Filter3 key={face.faceID} face={face} />
                                } else if (this.state.current_filter === "filter_4") {
                                    return <Filter4 key={face.faceID} face={face} />
                                } else if (this.state.current_filter === "filter_5") {
                                    return <Filter5 key={face.faceID} face={face} />
                                } else if (this.state.current_filter === "filter_6") {
                                    return <Filter6 key={face.faceID} face={face} />
                                } else if (this.state.current_filter === "filter_7") {
                                    return <Filter7 key={face.faceID} face={face} />
                                } else if (this.state.current_filter === "filter_8") {
                                    return <Filter8 key={face.faceID} face={face} />
                                } else if (this.state.current_filter === "filter_9") {
                                    return <Filter9 key={face.faceID} face={face} />
                                } else if (this.state.current_filter === "filter_10") {
                                    return <Filter10 key={face.faceID} face={face} />
                                }
                            })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },

});

