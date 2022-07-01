import {  SafeAreaView, View, StyleSheet, TextInput, TouchableOpacity,Text } from "react-native";
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Inputs = ({navigation,
                handleLogin,
                token
                }) => {

    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const onPress = () => {
        handleLogin(email, password)
        navigation.navigate('BrowsePodcastScreen',token)
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.inputs}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="E-mail address"
                    keyboardType="email-address"
                    placeholderTextColor={'#FFFFFF26'}
                />
                <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color="#FFFFFF26"
                    style={styles.email}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor={'#FFFFFF26'}
                />
                <Ionicons
                    name="key-outline"
                    size={24}
                    color="#FFFFFF26"
                    style={styles.key}
                />

            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        left:32,
        top:56,
    },
    inputs:{
      top:72,
    },
    input: {
        height: 58,
        width:276,
        marginBottom: 16,
        borderWidth: 1,
        borderColor:'#FFFFFF26',
        borderBottomLeftRadius:16,
        borderTopRightRadius:16,
        borderTopLeftRadius:16,
        paddingLeft:65,
        color:'#FFFFFF'
    },
    button :{
        width:276,
        height:51,
        marginTop:87,
        backgroundColor:'#3369FF',
        borderRadius:99,
        alignItems:"center",
        justifyContent:"center",
        shadowColor: "#3369FF",
        elevation: 30,
    },
    text:{
        color:"#FFFFFF",
        fontWeight:"500",
        fontSize:16,
        lineHeight:27.2,
        fontFamily:"Roboto",
    },
    email:{
        position:"absolute",
        left:20,
        top:15,
    },
    key:{
        position:"absolute",
        left:20,
        top:90
    }
})

export default Inputs;
