import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View, TouchableWithoutFeedback} from "react-native";
import {Audio} from 'expo-av';
import {AntDesign, Entypo, Feather, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';


const Podcast = ({  route }) => {
    const [track, setTrack] = useState({});
    const [sound, setSound] = React.useState();
    const [duration, setDuration] = useState('');
    const [position, setPosition] = useState('0%');
    const [millis, setMillis] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const { podcast } = route.params


    const playSound = async () => {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            {
                uri: track.audio_url
            },
            {},
            (status) => {
                if(status.isPlaying) {
                    let result = (status.positionMillis * 100) / status.durationMillis
                    console.log(status)
                    setIsPlaying(true);
                    setPosition(`${result}%`)
                    setDuration(status.durationMillis)
                    setMillis(status.positionMillis)
                } else {
                    setIsPlaying(false);
                }
            },
            true,
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync(); }

    React.useEffect(() => {
        if(sound) {
            return sound
                ? () => {
                    console.log('Unloading Sound');
                    sound.unloadAsync(); }
                : undefined;
        }
    }, [sound]);

    const stopSound = () => {
        if(sound) {
            sound.pauseAsync()
            setIsPlaying(false);
        }
    }

    const continueSound = () => {
        if(sound) {
            sound.playAsync()
        }
    }

    const fastForward = () => {
        if(sound) {
            sound.playFromPositionAsync(millis + 10000)
        }
    }

    const rewind = () => {
        if(sound) {
            sound.playFromPositionAsync(millis - 10000)
        }
    }

    useEffect(() => {
        if(route?.params?.podcast) {
            setTrack(route?.params?.podcast);
        }
    }, [route?.params?.podcast]);

    const onPressPlay =() => {
        console.log(isPlaying)
        if(isPlaying) {
            stopSound()
        } else {
            if(position === '0%') {
                playSound()
            } else {
                continueSound()
            }
        }
    }

    const formatTime = (milliseconds) => {
        const time = {
            h: Math.floor(milliseconds / 3600000),
            m: Math.floor((milliseconds % 3600000) / 60000),
            s: Math.floor(((milliseconds % 3600000) % 60000) / 1000)
        };
        return `${time.h}:${time.m}:${time.s}`;
    }
    return (
        <View style={styles.container}>

            <ImageBackground style={styles.podcastBG} source={require('../assets/podcastImg.png')} resizeMode="cover">
            {track && <>
                <View style={styles.flex}>
                        <AntDesign style={styles.arrow} name="arrowleft" size={24} color="#FFFFFF" />
                    <Feather style={styles.menu} name="menu" size={24} color="#FFFFFF" />
                </View>

                <Text style={styles.headerText}>About flow and our motivations</Text>
                <Text style={styles.author}>{track.author}</Text>

                <View style={styles.flexBtn}>
                    <Image style={styles.leftImg} source={require('../assets/podcastLeftImg.png')} resizeMode={"contain"}/>

                    <TouchableWithoutFeedback onPressOut={rewind}>
                        <Image source={require('../assets/Back.png')} style={styles.back}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPressOut={() => onPressPlay()}>
                        {isPlaying ? (
                            <AntDesign style={styles.pauseBtn} name="pause" size={48} color="#FFFFFF" />
                        ):(
                            <Ionicons name="play-outline" size={45} color="#FFF" style={styles.playBtn} />
                        )}
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPressOut={fastForward}>
                        <Image source={require('../assets/Forward.png')} style={styles.forward}/>
                    </TouchableWithoutFeedback>
                    <Image style={styles.rightImg} source={require('../assets/podcastRigtImg.png')} resizeMode={"contain"}/>

                </View>

            </>}
            </ImageBackground>

            <View style={styles.podcastUnder}>
                    <View style={{ width: '90%', height: 10, alignSelf:"center" }}>
                        <View style={{ width: '100%', height: 4, backgroundColor: '#fff',marginTop:40 }}>
                            <View style={{
                                backgroundColor: '#fff',
                                borderRadius: 7.5,
                                width: 15,
                                height: 15,
                                borderWidth:3,
                                borderColor:'#3369ff',
                                position: 'absolute',
                                left: position,
                                top: -5,
                            }}>
                            </View>

                        </View>
                    </View>
            </View>

            <View style={styles.likesGroup}>
                <AntDesign style={styles.likeIcon} name="like2" size={24} color="#459221" />
                <Text style={{color:'#FFF', fontFamily:'Roboto', fontSize:12, lineHeight:20, marginRight:80}}>
                    {podcast?.likes}
                </Text>
                <Text style={{color:'#FFF', fontFamily:'Roboto', fontSize:14, lineHeight:24, marginRight:80}}>
                    {formatTime(duration)}
                </Text>
                <Text style={{color:'#FFF', fontFamily:'Roboto', fontSize:12, lineHeight:20, marginRight:9}}>
                    {podcast?.dislikes}
                </Text>
                <AntDesign style={styles.dislikeIcon} name="dislike2" size={24} color="#898F97" />
            </View>

            <View style={{display:'flex', flexDirection:'row', width:'90%',marginLeft:'5%',alignItems:'center',bottom:160}}>
                <MaterialCommunityIcons style={styles.waves} name="waveform" size={24} color="#fff" />
                <Text style={styles.episodeText}>Episode 2</Text>
                <Feather style={styles.download} name="download" size={24} color="#fff" />
                <Text style={styles.mbText}>50mb</Text>
                <Entypo style={styles.dots} name="dots-three-vertical" size={24} color="#fff" />
            </View>

            <Text style={styles.description}>{podcast.description}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:"#09121C",
        marginTop:25,
    },
    podcastBG:{
        width:375,
        alignSelf:"center"
    },
    flex: {
        display:"flex",
        flexDirection: 'row'
    },
    arrow:{
          marginLeft:32,
        marginTop:50,
        flex:1
    },
    menu:{
        marginTop:50,
        marginRight:32,
    },
    headerText:{
        fontSize:24,
        color:'#ffffff',
        width:236,
        marginLeft:70,
        marginTop:38,
        textAlign:"center",
    },
    author:{
        color:'#898F97',
        textAlign:"center",
        marginTop:12,
    },
    leftImg:{
        height:161,
        right:289,
        top:10,
        position:"absolute",
    },
    rightImg:{
        left:20,
    },
    flexBtn:{
        display:"flex",
        flexDirection: 'row',
        marginLeft:112,
    },
    pauseBtn:{
      backgroundColor:'#FF334B',
        borderRadius:52,
        marginTop:20,
        padding:5,
        justifyContent:"center",
        alignSelf:"center",
        shadowColor:'#FF334B',
        elevation:100,
    },
    playBtn:{
        backgroundColor:'#FF334B',
        borderRadius:90,
        marginTop:20,
        padding:5,
        justifyContent:"center",
        alignSelf:"center",
        shadowColor:'#FF334B',
        elevation:100,
    },
    back:{
        marginTop:85,
        marginRight:32,
    },
    forward:{
        marginTop:85,
        marginLeft:32,
    },
    podcastUnder:{
        height:250,
        backgroundColor:'#09121C',
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        bottom:20
    },
    likesGroup:{
        display:"flex",
        flexDirection:"row",
        bottom:190,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'rgba(137,143,151,.15)',
        paddingBottom:29,
        width:'90%',
        marginLeft:'5%'
    },
    likeIcon:{
        backgroundColor:'rgba(69,146,33,.15)',
        borderRadius:50,
        padding:5,
        marginRight:9
    },
    dislikeIcon:{
        backgroundColor:'rgba(137, 143, 151, 0.15)',
        borderRadius:50,
        padding:5
    },
    waves:{
        backgroundColor:'#19232f',
        padding:8,
        borderRadius:30,
        marginRight:11,
    },
    download:{
        backgroundColor:'#19232f',
        padding:8,
        borderRadius:30,
        marginRight:11,
    },
    dots:{
        borderRadius:30,
        marginLeft:125.5,
    },
    episodeText:{
        color:'#FFF',
        fontFamily:'Roboto',
        fontSize:12,
        lineHeight:18,
        marginRight:24,
    },
    mbText:{
        color:'#FFF',
        fontFamily:'Roboto',
        fontSize:12,
        lineHeight:18
    },
    description:{
        color:'#fff',
        fontFamily:'Roboto',
        fontSize:13,
        lineHeight:22.1,
        width:309,
        alignSelf:"center",
        bottom:120,
    }
})

export default Podcast;
