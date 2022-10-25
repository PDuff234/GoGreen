import React, {useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";


let dataList = []; 


const Home = () => {


	const [isLoading, setLoading] = useState(true); 
	const [data, setData] = useState([]); 
	console.log(data);

	var temp = JSON.stringify(data); 

	useEffect(() => {
		fetch('http://54.174.101.94:5000/getallfoodtrucks') 
		.then((response) => response.json())
		.then((json) =>{ setData(json)})
		.catch((error) => console.error(error))
		.finally(() => setLoading(false)); 
	}, []); 

return (
    <View style={{ flex: 1, padding: 24 }}>
      
    </View>
  );
};

export default Home;
