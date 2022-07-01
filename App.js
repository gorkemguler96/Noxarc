import { StatusBar } from 'expo-status-bar';
import {AppRegistry, StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/Login";
import Podcast from "./screens/Podcast";
import BrowsePodcast from "./screens/BrowsePodcast";

const Stack = createNativeStackNavigator();



export default function App() {
  return (
      <NavigationContainer style={styles.container}>
          <Stack.Navigator screenOptions={{
              headerShown: false
          }}>
              <Stack.Screen style={styles.screen} name="LoginScreen" component={Login} />
              <Stack.Screen style={styles.screen} name="BrowsePodcastScreen" component={BrowsePodcast} />
              <Stack.Screen style={styles.screen} name="PodcastScreen" component={Podcast} />
          </Stack.Navigator>
          {/*<StatusBar style={"auto"} />*/}
      </NavigationContainer>
  );
}

AppRegistry.registerComponent('main', () => App);

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    screen: {
        flex:1,
    }
});
