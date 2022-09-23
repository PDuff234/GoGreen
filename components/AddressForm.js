import React, { useEffect, useCallback, Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useForm } from 'react-hook-form';

const InscriptionScreen = () => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = useCallback(formData => {
    console.log(formData);
    fetch('http://54.174.101.94:5000/updateusertable', {
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
    register('name');
    register('street');
    register('city'); 
    register('state'); 
    register('zip'); 
    register('open'); 
    register('close'); 
  }, [register]);



  return (
    <View style = {{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
        <Text style = {{ padding: 8, fontSize: 18}}> Add Vendor Information Here! </Text>
        <TextInput
            autoCompleteType="off"
            placeholder="Truck Name"
            onChangeText={onChangeField('name')}
            style = {{ padding: 8, fontSize: 18 }}
        />
        <TextInput
            autoCompleteType="off"
            placeholder="Street"
            onChangeText={onChangeField('street')}
            style = {{ padding: 8, fontSize: 18 }}
        />
        <TextInput
            autoCompleteType="off"
            placeholder="City"
            onChangeText={onChangeField('city')}
            style = {{ padding: 8, fontSize: 18 }}
        />
        <TextInput
            autoCompleteType="off"
            placeholder="State"
            onChangeText={onChangeField('state')}
            style = {{ padding: 8, fontSize: 18 }}
        />
        <TextInput
            autoCompleteType="off"
            placeholder="ZIP Code"
            onChangeText={onChangeField('zip')}
            style = {{ padding: 8, fontSize: 18 }}
        />
        <TextInput
            autoCompleteType="off"
            placeholder="Opening Time"
            onChangeText={onChangeField('open')}
            style = {{ padding: 8, fontSize: 18 }}
        />
        <TextInput
            autoCompleteType="off"
            placeholder="Closing Time"
            onChangeText={onChangeField('close')}
            style = {{ padding: 8, fontSize: 18 }}
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default InscriptionScreen;