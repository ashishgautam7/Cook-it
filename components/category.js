import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  ScrollView,
  Image
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { categoryData } from "./mockData";

export default function Category() {
  return (
    <View style={{ margin: hp(2) }}>
      <Text style={{ fontSize: 20, color: "#EC8F5E" }}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}
      >
        {
            categoryData.map((category, index)=>{
                return(
                    <Pressable key={index} style={{display:'flex', alignItems:'center'}}>
                        <View style={{borderRadius:hp(20),borderRadius:hp(200),padding:hp(1)}}>
                            <Image
                                source={{uri: category.image}}
                                style={{width:hp(7),height:hp(7),borderRadius:hp(20)}}
                            />                            
                        </View>
                        <Text>{category.name}</Text>
                    </Pressable>
                )
            })
        }
      </ScrollView>
    </View>
  );
}
