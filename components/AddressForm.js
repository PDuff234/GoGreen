import React, { useEffect, useCallback } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';

const InscriptionScreen = () => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = useCallback(formData => {
    console.log(formData);
    fetch('', {
      method: 'POST', 
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(formData)
    })
  }, []);
  const onChangeField = useCallback(
    name => text => {
      setValue(name, text);
    },
    []
  );

  useEffect(() => {
    register('username'); 
    register('password'); 
  }, [register]);



  return (
    <View style = {{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
        <View style = {styles.inputView}>
          <TextInput 
              style = {styles.inputText}
              placeholder = "Username"
              placeholderTextColor = "#003f5c"
              onChangeText = {onChangeField('username')}
          />
        </View>

        <View style = {styles.inputView}>
          <TextInput 
              style = {styles.inputText}
              placeholder = "Password"
              placeholderTextColor = "#003f5c"
              secureTextEntry = {true}
              onChangeText = {onChangeField('password')}
          />
        </View>

        <TouchableOpacity>
          <Text style = {styles.forgot_button}> Not a user? Register Here! </Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.loginBtn}>
            <Text style = {styles.loginText}> Login </Text>
        </TouchableOpacity>
    </View>
  );
};

export default InscriptionScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006747",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  inputText: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 25,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: 'black', 
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

  loginText: {
      color: "white", 
      fontSize: 16
  }
});