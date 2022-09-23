import React, { useEffect, useCallback } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useForm } from 'react-hook-form';

const UserInputScreen = () => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = useCallback(formData => {
    console.log(formData);
  }, []);
  const onChangeField = useCallback(
    name => text => {
      setValue(name, text);
    },
    []
  );

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  return (
    <View style = {{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
        <Text style = {{ padding: 8, fontSize: 18}}> Add Vendors Here! </Text>
        <TextInput
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Email"
            onChangeText={onChangeField('email')}
            style = {{ padding: 8, fontSize: 18 }}
        />
        <TextInput
            secureTextEntry
            autoCompleteType="password"
            placeholder="Password"
            onChangeText={onChangeField('password')}
            style = {{ padding: 8, fontSize: 18 }}
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default UserInputScreen;