import React, { useState, useEffect } from 'react';
import {View, StyleSheet, TextInput, ScrollView, TouchableWithoutFeedback, Text} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const Search = ({ fetchPodcasts, token }) => {

    const [text, setText] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = useState([])
    const categories = [
        {
            name: 'general',
            label: 'General',
        },
        {
            name: 'business',
            label: 'Business',
        },
        {
            name: 'art',
            label: 'Art',
        },
        {
            name: 'health',
            label: 'Health',
        },
        {
            name: 'sports',
            label: 'Sports',
        },
        {
            name: 'science',
            label: 'Science',
        },
    ]

    const handlePress = (category) => {
        setSelectedCategory(category);
    }

    useEffect(() => {
        if (selectedCategory) {
            fetchPodcasts(
                {
                    model: {
                        category: selectedCategory.name,
                        limit: 5,
                    },
                    token,
                }
            )
        }
    }, [selectedCategory]);




    const renderIcon = (name, color) => {
        const icons = {
            general: <AntDesign style={styles.categoryIcon} name="earth" size={24} color={color} />,
            business: <MaterialIcons style={styles.categoryIcon} name="business-center" size={24} color={color} />,
            art: <Ionicons style={styles.categoryIcon} name="color-palette-outline" size={24} color={color} />,
            health: <FontAwesome style={styles.categoryIcon} name="heartbeat" size={24} color={color} />,
            sports: <MaterialIcons style={styles.categoryIcon} name="sports-basketball" size={24} color={color} />,
            science: <MaterialIcons style={styles.categoryIcon} name="science" size={24} color={color} />,

        }
        return icons[name];
    }

    const handleSearch = () => {
        fetchPodcasts(
            {
                model: {
                    text: text.toLowerCase(),
                    limit: 5,
                },
                token,
            }
        )
    }


    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder="Search a podcast..."
                    placeholderTextColor={"#898F97"}
                    onSubmitEditing={handleSearch}
                />
                <TouchableWithoutFeedback onPress={handleSearch}>
                    <AntDesign
                        style={styles.icon}
                        name="search1" size={20}
                        color="#898F97"
                    />
                </TouchableWithoutFeedback>
            </View>
            <View>
                <ScrollView horizontal fadingEdgeLength={1} showsHorizontalScrollIndicator={false}>
                    {categories.map((category, index) => {
                        return (
                            <TouchableWithoutFeedback key={index} style={styles.categoryContainer} onPress={() => {
                                handlePress(category);
                            }}>
                                <View>
                                    <View style={selectedCategory.name === category.name ? styles.selectedCategoryStngs : styles.categoryStngs}>
                                        {renderIcon(category.name, selectedCategory.name === category.name ? '#fff' : '#898F97')}
                                    </View>
                                    <Text style={styles.categoryText}>{category.label}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {

    },
    input: {
        backgroundColor:"#010304",
        marginTop:32,
        width:312,
        height:48,
        borderRadius:16,
        color:"#FFFFFF",
        paddingLeft:16,
        paddingTop:11,
        paddingBottom:13,
    },
    icon:{
      position:"absolute",
        bottom:15,
        left:273,
    },
    selectedCategoryStngs : {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight:22,
        marginTop:32,
        backgroundColor:  '#343d48',
        color: '#fff',
        justifyContent:"center"
    },
    categoryStngs:{
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight:22,
        marginTop:32,
        backgroundColor:  '#19232F',
        color: '#fff',
        justifyContent:"center"
    },
    categoryText:{
        color:'#898F97',
        fontSize:12,
        fontWeight:'500',
        textAlign:"center",
        right:12,
        marginTop:16,
        marginBottom:51,
    },
    categoryIcon:{
        alignSelf:"center",
    }
})

export default Search;
