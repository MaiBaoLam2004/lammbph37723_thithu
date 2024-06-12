import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';

const AddProduct = ({ navigation, route }) => {
  const { user } = route.params;

  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [image, setImage] = useState('');
  const [trangthai, setTrangthai] = useState(true);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setGender(user.gender);
      setDateOfBirth(user.dateOfBirth);
      setImage(user.image);
      setTrangthai(user.trangthai);
    }
  }, [user]);

  const handleSubmit = () => {
    const data = {
      fullName,
      gender,
      dateOfBirth,
      image,
      trangthai,
    };

    if (user) {
      // Nếu có user, đây là việc cập nhật
      fetch(`http://192.168.1.100:3000/database/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(() => {
          console.log('Update successful');
          navigation.navigate('Home');
        })
        .catch(error => console.error('Error:', error));
    } else {
      // Nếu không có user, đây là việc thêm mới
      fetch('http://192.168.1.100:3000/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(() => {
          console.log('Insert successful');
          navigation.navigate('Home');
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{user ? 'Chỉnh sửa thông tin người dùng' : 'Thêm người dùng mới'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Giới tính"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày sinh (YYYY-MM-DD)"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />
      <TextInput
        style={styles.input}
        placeholder="URL Hình ảnh"
        value={image}
        onChangeText={setImage}
      />
      <View style={styles.switchContainer}>
        <Text>Trạng thái:</Text>
        <Switch
          value={trangthai}
          onValueChange={setTrangthai}
        />
        <Text>{trangthai ? 'Chính thức' : 'Thử việc'}</Text>
      </View>
      <Button title={user ? 'Cập nhật' : 'Thêm'} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default AddProduct;
