import React from 'react';
import {View, Text, StyleSheet, Image } from "react-native";


const Header = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/browserLogo.png')}/>
            <Text style={styles.text}>Browse</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
    },
    logo:{
        marginTop:56,
        left:6,
    },
    text: {
        color:"#FFFFFF",
        marginTop:42,
        fontWeight:"700",
        fontSize:48,
        lineHeight:56.25,
    }
})

export default Header;
