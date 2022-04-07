
import React, {useEffect} from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";

function renderModuleItem({item}) {
  const sum_points = 50;
  return (
    <View>
      <Text>
        {item.name}
      </Text>
    </View>
    
  )
}


function SkillTree(props) {

  const [modules, setModules] = React.useState([]);

  const modules_data = require('../data/db.json');

  /*useEffect(() => {
    const fetchData = async () => {
      axios.get('http://192.168.1.106:3000/modules')
      .then((response) => {
        console.log(response);
        setModules(response.data);
      });
      /*const data = await fetch('http://localhost:3000/modules'); // získá data
      const json = await data.json(); // převede na json
      setModules(json); // nastaví state modules na data*/
    //}

    //fetchData().catch(error => console.log(error)); // zavolá fetchdata a případně catchne error

    /*fetch('http://localhost:3000/modules')
    .then(resp => {return resp.json();})
    .then(responseData => {
      console.log("ok");
      console.log(responseData);
      setModules(responseData);
    }).catch(error => console.log(error))
  *///}, [])
  
  return (
    <View>
      <FlatList
      data={modules_data.modules}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={renderModuleItem}
      />

    </View>
  );
}

export default SkillTree;
