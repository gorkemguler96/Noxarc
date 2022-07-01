import React from 'react';
import {Text, View, ImageBackground,TouchableWithoutFeedback, StyleSheet, ScrollView, Image} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Podcast = ({ podcasts, navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>Podcast (5)</Text>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {podcasts?.length > 0 && podcasts.map((podcast, index) => (
                    <View key={index}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('PodcastScreen', {podcast})}>
                            <ImageBackground source={require('../../assets/BG2.png')} resizeMode="cover" style={styles.image}>
                                <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{podcast.title}</Text>
                                <View style={styles.like}>
                                    <Text style={styles.likeText}>{podcast.likes}</Text>
                                    <AntDesign style={styles.likeIcon} name="like2" size={18} color="black" />
                                    <Text style={styles.likeText}>{podcast.dislikes}</Text>
                                    <AntDesign style={styles.likeIcon} name="dislike2" size={18} color="black" />
                                    <View style={styles.playIconContainer}>
                                        <Feather name="play" size={24} style={styles.playIcon} />
                                    </View>
                                </View>
                                <View style={styles.authorContainer}>
                                    <Image
                                        style={styles.avatar}
                                        source={{uri:'https://w7.pngwing.com/pngs/627/97/png-transparent-avatar-web-development-computer-network-avatar-game-web-design-heroes.png'}}
                                    />
                                    <Text style={styles.author}>{podcast.author}</Text>
                                </View>
                                <View>

                                </View>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    title:{
        fontSize:16,
        fontWeight:"500",
        lineHeight:19,
        color:'#898F97',
        marginBottom:24,
    },
    container:{

    },
    image: {
        height:180,
        width:309,
        marginBottom:50,
        paddingLeft:32,
    },
    text:{
        fontWeight:"500",
        fontSize:20,
        lineHeight:26,
        color: '#FFFFFF',
        fontFamily:"Roboto",
        marginTop:29,
        marginRight:41,

    },
    like:{
        flexDirection: 'row',
        display:"flex",
        alignItems:"center"
    },
    likeText:{
        color:'#898F97',
        marginTop:19,
        paddingLeft:50,
        fontWeight:'500',
        fontSize:16,
        fontFamily:'Roboto',

    },
    likeIcon:{
        color:'#898F97',
        marginTop:19,
        marginLeft:5,
    },
    authorContainer:{
      display:"flex",
      flexDirection:"row",
        paddingTop:20,

    },
    author:{
        color:'#ffffff',
        fontSize:13,
        fontWeight:'400',
        fontFamily:'Roboto',
    },
    avatar:{
        height:16,
        width:16,
        borderRadius:8,
        marginRight:8,
    },
    playIconContainer: {
        backgroundColor:'#FF334B',
        borderRadius:50,
        color:'#fff',
        padding:8,
        position:"absolute",
        right: 20,
        top:44,
        shadowColor: '#FF334B',
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 30,
    },
    playIcon:{
        backgroundColor:'#FF334B',
        borderRadius:50,
        color:'#fff',
    }
})

export default Podcast;
