import * as React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { Card } from 'react-native-elements'; 

const HomeScreen = () => {

    let proTips = [
        'Pro Tip #1: Flip it over! Check it out before you chuck it out!',
        'Pro Tip #2: Save the Earth! Its the only planet with Chocolate. ',
        'Pro Tip #3: Follow the Three R\'s: Reduce, Reuse, Recycle.',
        'Pro Tip #4: Flip it over! Check it out before you chuck it out!',
        'Pro Tip #5: Save the Earth! Make the Turtles proud!',
        'Pro Tip #6: Don’t be trashy! Be Flashy and Recycle!', 
        'Pro Tip #7: Recycling plastic feels fantastic!', 
        'Pro Tip #8: It’s easy being green- Reduce, Reuse, Recycle.',
        'Pro Tip #9: You will produce about 127 to 604 pounds of garbage in your lifetime.',
        'Pro Tip #10: Have you hugged your recycling bin today?']
      
      const randoNum = () => {
        return Math.floor((Math.random() * 10));
      }
      
      let num = randoNum();
      
      const randomProTip = proTips[num];
  
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title style = {{fontSize: 20, fontWeight: 'bold'}}>Go Green!</Card.Title>
        <Card.Divider />
        <Text style={{ fontSize: 15 }}>
          Just snap a photo of any item and we'll let you know if and where it
          can be recycled near you!
        </Text>
      </Card>
      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          {randomProTip}
        </Text>
      </View>
    </View>
    );
  };
  
  export default HomeScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      margin: 0,
      padding: 0,
      alignItems: 'center', 
    },
    contentContainer: {
      paddingTop: 0,
    },
    flex: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      padding: 10,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    getStartedText: {
      fontSize: 15,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#006600',
      paddingVertical: 10,
    },
    tabBarInfoText: {
      fontSize: 12,
      color: 'white',
      textAlign: 'center',
      marginLeft: 2.5,
      marginRight: 2.5
    },
    helpContainer: {
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  });