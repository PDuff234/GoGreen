import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../styles/constants';



const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
    });

    const textInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            })

        }
        else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            })
        }
    }


    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    return (
        <View style={signInStyles.container}>
            <View style={signInStyles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={require('../assets/goGreen-Logo.png')}
                style={signInStyles.logo}
                resizeMode="center"
            />
            <Animatable.View
                animation="fadeInUpBig"
            >
                <Text style={signInStyles.text_header}>Go Green</Text>
                <Text style={signInStyles.moto}>
                Reduce-Reuse-Recycle
                </Text>
            </Animatable.View>
            </View>
            <Animatable.View 
                style={signInStyles.footer}
                animation="fadeInUpBig"
            >
                <Text style={signInStyles.text_footer}>Email</Text>
                <View style={signInStyles.action}>
                    <FontAwesome
                        name='user-o'
                        color="black"
                        size={20}
                        />
                    <TextInput 
                        placeholder='Email' 
                        style={signInStyles.textInput} 
                        autoCapitalize="none" 
                        onChangeText={(val) => textInputChange(val)}
                    />
                    
                    { data.check_textInputChange ? 
                    <Animatable.View animation="bounceIn">
                        <FontAwesome
                        name="check"
                        color="green"
                        size={20}
                    />
                    </Animatable.View>
                    : null}
                </View>
                <Text style={[signInStyles.text_footer, {marginTop: 35}]}>Password</Text>
                <View style={signInStyles.action}>
                    <FontAwesome
                        name='lock'
                        color="black"
                        size={20}
                        />
                    <TextInput 
                        placeholder='Password' 
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={signInStyles.textInput} 
                        autoCapitalize="none" 
                        onChangeText={(val) => handlePasswordChange(val)} 
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                    { data.secureTextEntry ? 
                     <Animatable.View animation="bounceIn">
                        <FontAwesome
                        name="eye-slash"
                        color="gray"
                        size={20}
                    />
                    </Animatable.View>
                    : 
                    <Animatable.View animation="bounceIn">
                        <FontAwesome
                        name="eye"
                        color="gray"
                        size={20}
                    />
                    </Animatable.View> 
                    }
                    </TouchableOpacity>
                </View>

                <View style={signInStyles.button}>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate("TabNavigator")}
                    style={signInStyles.signIn}

                    >
                    <Text style={signInStyles.textSign}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("SignUpScreen")}
                        style={[signInStyles.signIn, {
                            backgroundColor: "white",
                            borderWidth: 2,
                            borderColor: "green",
                            marginTop: 20
                        }]}
                    >
                    <Text style={signInStyles.textSign}>Sign Up</Text>
                    </TouchableOpacity>

                </View>
            </Animatable.View>
        </View>
    )
}


export default SignInScreen;



const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const signInStyles = StyleSheet.create({
    
    container: {
        flex: 1, 
        backgroundColor: 'green'
      },
      header: {
          flex: 1,
          justifyContent: 'center',
          alignItems: "center",
          paddingHorizontal: 20,
          paddingBottom: 50
      },
      footer: {
          flex: 2,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
      },
      logo: {
        width: height_logo,
        height: height_logo,
        marginBottom: -35
    },
      text_header: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 30,
      },
      moto: {
        color: "white",
        fontSize: 16,
    },
      text_footer: {
          color: '#05375a',
          fontSize: 18
      },
      action: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingBottom: 5
      },
      actionError: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#FF0000',
          paddingBottom: 5
      },
      textInput: {
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 0 : -12,
          paddingLeft: 10,
          color: '#05375a',
      },
      errorMsg: {
          color: '#FF0000',
          fontSize: 14,
      },
      button: {
          alignItems: 'center',
          marginTop: 50
      },
      signIn: {
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: "green"
      },
      textSign: {
          fontSize: 18,
          fontWeight: 'bold'
      }
})