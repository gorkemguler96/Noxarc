import {View, Text, Image, StyleSheet} from "react-native";

const Header = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            <Text style={styles.text}>Episodic series of digital audio.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        left:33,
        top:56,
    },
    text: {
        width:195,
        height:60,
        marginTop:60,
        color: "#FFFFFF",
        fontSize:24,
        lineHeight:30,
        fontWeight:"500",
        fontFamily:"Roboto",
    },
});

export default Header;
