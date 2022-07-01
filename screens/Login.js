import { StyleSheet, View, Dimensions,ImageBackground } from 'react-native';
import { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Login/Header'
import Inputs from "../components/Login/Inputs";


const Login = ({navigation}) => {

    const [token, setToken] = useState('');

    const handleLogin = (email, password) => {
        const model = {
            email,
            password
        }

        fetch('https://nox-podcast-api.vercel.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(model)
        }).then(res => {
                return res.json();
            }
        ).then(response => {
            setToken(response.access_token);
        }).catch(err => console.log(err))

    }

    useEffect(() => {
        if(token) {
            navigation.navigate('BrowsePodcastScreen', { token })
        }
    }, [token]);


    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/loginbg.png')} resizeMode="cover" style={styles.image}>
                <LinearGradient
                    colors={['#09121C', '#09121C', '#09121C','transparent' ]}
                    style={styles.linearGradient}
                >
                    <Header/>
                    <Inputs token={token} handleLogin={handleLogin} navigation={navigation}/>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    image: {
        width:Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    linearGradient: {
        height: Dimensions.get("window").height/1.08,
        width: Dimensions.get("window").width/1.10,
        borderBottomRightRadius:24,
        backgroundColor:"#000000c0",
    }
});

export default Login;

