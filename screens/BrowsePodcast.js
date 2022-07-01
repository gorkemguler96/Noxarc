import React, {useEffect, useState} from 'react';
import { Logs } from "expo";
import { View, Text, StyleSheet } from "react-native";
import Search from "../components/BrowsePodcast/Search";
import Podcast from "../components/BrowsePodcast/Podcast";
import Header from "../components/BrowsePodcast/Header";

const BrowsePodcast = ({ navigation, route }) => {
    const [podcasts, setPodcasts] = useState([])
    const [error, setError] = useState('')
    Logs.enableExpoCliLogging()

    const fetchPodcasts = ({
        model,
        token,
        callback
    }) => {
        let params = '';
        for (var I in model) {
            if(model[I]) {
                params += '' + I + '=' + model[I] + '&'
            }

        }
        if(route?.params?.token) {
            fetch(`https://nox-podcast-api.vercel.app/search?${params}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(res => {
                    return res.json();
                }
            ).then(response => {
                if(callback) {
                    callback(response)
                } else {
                    setPodcasts(response)
                }
            }).catch(err => console.log(err))
        }
    }

    useEffect(() => {
        const model = {
            text: '',
            category: 'technology',
            limit: 5,
        }
        fetchPodcasts({
            model,
            token: route?.params?.token,
        })

    }, [route?.params?.token])

    return (
        <View style={styles.container}>
            <Header/>
            <Search token={route?.params?.token} fetchPodcasts={fetchPodcasts} />
            <Podcast navigation={navigation} podcasts={podcasts}/>

        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:"#09121C",
        paddingLeft:30,
    }
})

export default BrowsePodcast;
