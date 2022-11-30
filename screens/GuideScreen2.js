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
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const GuideScreen2 = ({navigation}) => {
    return (
        <View style={splash_styles.container}>
             <View style={splash_styles.header}>
             <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/goGreen-Logo.png')}
            style={splash_styles.logo}
            resizeMode="contain"
            />
            </View>


            {/* FOOTER */}
            
            <Animatable.View 
            style={splash_styles.footer}
            animation="fadeInUpBig"
            >
            <Image 
                source={require('../assets/styrofoam_food_container.png')}
                style={splash_styles.picture}
            />
             <Text style={splash_styles.bigFont}>GOOD PHOTOS ARE KEY</Text>
             <Text style={splash_styles.smallFont}>Our app is trained to recognize small recycables. Good photos are ones with a single item in frame, taken under adequate lighting. </Text>
             <View style={splash_styles.navCircle}>
             <FontAwesome
                name='circle'
                color="grey"
                size={20} 
                style={splash_styles.circle}
            />
            <FontAwesome
                name='circle'
                color="green"
                size={20} 
                style={splash_styles.circle}
            />
            <FontAwesome
                name='circle'
                color="gray"
                size={20} 
                style={splash_styles.circle}
            />
            </View>

            <View style={splash_styles.chevron}>
            <TouchableOpacity
            onPress={() => navigation.navigate("Guide1")}
            >
            <FontAwesome
                name='chevron-left'
                color="gray"
                size={20} 
                style={{paddingHorizontal: 50}}
            />
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={()=>navigation.navigate('Guide3')}
            >
            <FontAwesome
                name='chevron-right'
                color="gray"
                size={20} 
                style={{paddingHorizontal: 50}}
            />
            </TouchableOpacity>

            </View>
            </Animatable.View>



        </View>
    );
}


export default GuideScreen2;



const {height} = Dimensions.get("screen");
const height_logo = height * 0.1;

const splash_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green"
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 9,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: 'center'
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    bigFont: {
        color: "green",
        fontSize: 20,
        fontWeight: "bold",
    },
    smallFont: {
        color: "green",
        fontSize: 16,
        fontWeight: "semibold",
        textAlign: "center",
        marginTop: 10
    },
    navCircle: {
        flexDirection: "row",
    },
    circle: {
        padding: 10,
        marginTop: 20  
    },  
    chevron: {
        flexDirection: "row",
        padding: 50,
    },
    picture: {
        resizeMode: "center",
        flex: 1,
        marginBottom: 50,
        marginTop: 100
    }
})