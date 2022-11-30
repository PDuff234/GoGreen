import * as React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { Card } from 'react-native-elements';


const HomeScreen = ({ }) => {

  let proTips = [
    'Reclying Fact #1: 70% of corrugated cardboard is recovered for recycling',
    'Reclying Fact #2: Food scraps make up almost 12% of municipal solid waste generated in the U.S.',
    'Reclying Fact #3: One ton of recycled cardboard saves 46 gallons of oil',
    'Reclying Fact #4: 2.5 million plastic bottles are thrown away every hour in America',
    'Reclying Fact #5: Glass is 100% recyclable and can be recycled endlessly without loss in quality or purity',
    'Reclying Fact #6: 70% of the total waste in offices is paper waste',
    'Reclying Fact #7: Aluminum can be recycled forever without any loss of quality',
    'Reclying Fact #8: The average person generates 4.4 pounds of solid waste every day',
    'Reclying Fact #9: You will produce about 127 to 604 pounds of garbage in your lifetime.',
    'Reclying Fact #10: Americans throw away enough trash in an average year to circle the earth 24 times.']

  const randoNum = () => {
    return Math.floor((Math.random() * 10));
  }

  let num = randoNum();

  const randomProTip = proTips[num];

  const Players = [
    { name: "Josh", score: 10 },
    { name: "Robert", score: 30 },
    { name: "Ryan", score: 5 },
    { name: "Marissa", score: 6 },
    { name: "Jennifer", score: 21 }
  ];

  const sortedArray = Players.sort((a, b) => b.score - a.score);


  return (
    <View style={styles.container}>
      <View style={styles.topBarInfoContainer}>
        <Text style={{ textAlign: 'center', marginTop: 60, color: 'white', fontSize: 19, fontWeight: '700' }}>
          Go Green!
        </Text>
      </View>
      <View>
        <Text style={styles.textWithShadow}>
          Hello Human,
        </Text>
        <Text style={{ marginTop: 5, marginRight: 70, marginBottom: 30, color: 'black', fontSize: 28, fontWeight: '500' }}>
          Glad to have you back!
        </Text>
      </View>
      <Card style={{ width: '18rem' }}>
        <Card.Title style={{ fontSize: 35, color: 'green', fontWeight: 'bold', marginLeft: 50, marginRight: 50 }}> Top Chart</Card.Title>
        <Card.Divider />
        {sortedArray.map((sorA) => {
          return (
            <View>
              <Text style={{ fontSize: 25, fontWeight: '600', textAlign: 'center' }}>
                {sorA.name}
              </Text>
              <Text style={{ fontSize: 17, fontWeight: '400', textAlign: 'center' }}>
                {sorA.score} points
              </Text>
            </View>
          )
        }
        )}
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
    marginTop: 130,
    marginRight: 70,
    fontSize: 35,
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
    height: 100,
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