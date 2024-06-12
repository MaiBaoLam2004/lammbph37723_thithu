import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Wellcome = ({navigation}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('Home'); // Sử dụng replace để thay thế màn hình hiện tại
        }, 1000);
    
        return () => clearTimeout(timer); // Xóa timer khi component bị hủy
      }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={{width: 300, height: 100}} resizeMode='center' source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/FPT_Polytechnic.png/1200px-FPT_Polytechnic.png'}}/>
        <Text style={{fontSize: 30, color:'black', marginTop: 50}}>Mai Bảo Lâm</Text>
        <Text style={{fontSize: 30, color:'red'}}>MSV: PH37723</Text>
    </View>
  )
}

export default Wellcome

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'yellow'
    }
})