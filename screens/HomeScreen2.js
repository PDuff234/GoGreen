import React, { useState, useContext, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { query, collection, limit, orderBy, onSnapshot } from "firebase/firestore";

import { db } from '../config/firebase';
import { AuthenticatedUserContext } from '../providers';
import CustomStatusBar from '../components/StatusBar';
import { recycleGreen } from '../styles/constants';

const HomeScreen = () => {
  const [ topPlayers, setPlayers ] = useState([]);
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    const userRef = collection(db, "UserData");
    const q = query(userRef, orderBy("score"), limit(5));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const players = []
      querySnapshot.forEach((doc) => {
        const { email, score } = doc.data();
        const name = email.split("@")[0];
        players.push({
          name,
          score
        });
      });
      setPlayers(players);
    });
    
    return unsubscribe;
  }, []);

  let proTips = [
    'Reclying Fact #1: Always clean out items before recycling!',
    'Reclying Fact #2: Do not crush cans before recycling them',
    'Reclying Fact #3: If unsure about whether something is recyclable, its better to throw it out!',
    'Reclying Fact #4: Remember! Recycling is just one of the R\'s its better to Reduce and Reuse!',
    'Reclying Fact #5: Glass is 100% recyclable and can be recycled endlessly without loss in quality or purity',
    'Reclying Fact #6: Just because there is a recycling symbol on it does not mean it can be recycled curbside',
    'Reclying Fact #7: Aluminum can be recycled forever without any loss of quality',
    'Reclying Fact #8: Plastic recycling is cumbersome. Considering replacing plastics or reusing where you can!',
    'Reclying Fact #9: Still unsure whether something can be recycled? Check out Earth911 and iRecycle!',
    'Reclying Fact #10: Bottle caps do not have to be removed before recycling water bottles']

  const randoNum = () => {
    return Math.floor((Math.random() * 10));
  }

  let num = randoNum();

  const randomProTip = proTips[num];

  const sortedArray = topPlayers.sort((a, b) => b.score - a.score);
  return (
    <>
      <CustomStatusBar />
      <View style={styles.container}>
        <View style={styles.topBarInfoContainer}>
          <Animatable.Image 
            animation="bounceIn"
            duraton="1500"
            source={require('../assets/goGreen-Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={{marginTop: 100}}>
          <Card>
            <Card.Title style = {{fontSize: 20, fontWeight: 'bold'}}>Hello {user.email.split("@")[0]}!</Card.Title>
            <Card.Divider />
            <Text style={{ fontSize: 15 }}>
              Just snap a photo of a item and we'll let you know if and where it
              can be recycled near you!
            </Text>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Title style={{ fontSize: 20, color: recycleGreen, fontWeight: 'bold', marginLeft: 50, marginRight: 50 }}> Top Chart</Card.Title>
            <Card.Divider />
            {sortedArray.map((sorA) => {
              return (
                <View key={sorA.name}>
                  <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
                    {sorA.name}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'center' }}>
                    {sorA.score} points
                  </Text>
                </View>
              )
            }
            )}
          </Card>
        </View>
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            {randomProTip}
          </Text>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#CFC493",
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
  textWithShadow: {
    fontWeight: '500',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 80, 0, 0.9)',
    marginTop: 110,
    marginRight: 70,
    fontSize: 24,
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 5
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
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
  topBarInfoContainer: {
    position: 'absolute',
    top: 0,
    height: 80,
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
  logo: {
    width: height_logo,
    height: height_logo,
    marginBottom: -35
},
});