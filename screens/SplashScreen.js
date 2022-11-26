import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';


const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={splash_styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={splash_styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/goGreen-Logo.png')}
            style={splash_styles.logo}
            resizeMode="stretch"
            />
            <Animatable.View
            animation="bounceIn"
            duraton="1500"
            style={{alignItems: "center"}}>
               <Text style={splash_styles.title}>Go Green</Text>
                <Text style={splash_styles.moto}>
                Reduce-Reuse-Recycle
                </Text>
            </Animatable.View>
        </View>
        <Animatable.View 
            style={[splash_styles.footer]}
            animation="fadeInUpBig"
        >
            <Text style={[splash_styles.quote, {
                color: colors.text
            }]}>Recycling the planet one user at a time!</Text>
            <Text style={splash_styles.text}>Sign in with an account</Text>
            <View style={splash_styles.button}>
            <TouchableOpacity style={splash_styles.signIn} onPress={()=>navigation.navigate('SignInScreen')}>
                    <Text style={{fontSize: 16, color:"black" }}>Get Started</Text><MaterialIcons 
                        name="navigate-next"
                        color="black"
                        size={20}
                    />
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const splash_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green"
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        felx: 1, 
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50, 
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: "white",
        fontSize: 48,
        fontWeight: "bold"
    },
    moto: {
        color: "white",
        fontSize: 16,
    },
    quote: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold"
    },
    text: {
        color: "grey",
        marginTop: 5
    },
    button: {
        alignItems: "flex-end",
        marginTop: 30,
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        flexDirection: "row",
        backgroundColor: "green"
    },
    textSign: {
        color: "white", 
        fontWeight: "bold"
    }
})