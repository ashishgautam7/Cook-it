import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { categoryData } from "./mockData";
import { color,fontSize } from "./colors";

export default function Category({categories, activeCategory,handelCategoryChange}) {
    // function handelCategory() {
    //     setActiveCategory(categories.strCategory)
    //     console.log(activeCategory);
    // }
    // function type() {
    //   console.log("cat: ", typeof categories);
    // }
    // type()
  return (
    <View style={{  }}>
      <Text style={{ fontSize: 20, color: color.HedingColor }}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}
      >
        {
            categories.map((category, index)=>{
                
                  
                
                let  isActive = activeCategory ==activeCategory;
                let  backgroundColor=isActive ? 'black' : '#EC8F5E';
            
                return(
                    category.strCategory!=='Beef' &&(
                    <TouchableOpacity key={index} style={{display:'flex', alignItems:'center'}}
                    onPress={()=>{handelCategoryChange(category.strCategory)}}>
                        <View style={{borderRadius:hp(20),borderRadius:hp(200),padding:hp(1),margin:
                            hp(1),backgroundColor:{backgroundColor}, width:hp(8),height:hp(8)}}>
                            <Image
                                source={{uri: category.strCategoryThumb}}
                                style={{width:hp(7),height:hp(7),borderRadius:hp(20)}}
                            />                            
                        </View>
                        <Text>{category.strCategory}</Text>
                    </TouchableOpacity>
                    )
                )
            })
        }
      </ScrollView>
    </View>
  );
}
