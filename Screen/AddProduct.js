import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Switch} from 'react-native';

const AddProduct = ({navigation, route}) => {
  const {user} = route.params;

  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [image, setImage] = useState('');
  const [dateOfYear, setDateOfYear] = useState('');
  // const [trangthai, setTrangthai] = useState(true);
  const [dateOfYearError, setDateOfYearError] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setGender(user.gender);
      setDateOfBirth(user.dateOfBirth);
      setImage(user.image);
      setDateOfYear(user.dateOfYear);
      // setTrangthai(user.trangthai);
    }
  }, [user]);

  const handleSubmit = () => {

    // kiểm tra năm học phải là số
    // // Clear previous error
    // setDateOfYearError('');
    // // Validate dateOfYear
    // if (isNaN(dateOfYear)) {
    //   setDateOfYearError('Năm học phải là số');
    //   return;
    // }

    const data = {
      fullName,
      gender,
      dateOfBirth,
      image,
      dateOfYear,
    };

    if (user) {
      // Update existing user
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
      // Add new user
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
      <Text style={styles.header}>
        {user ? 'Chỉnh sửa thông tin người dùng' : 'Thêm người dùng mới'}
      </Text>
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
        placeholder="Năm học"
        value={dateOfYear}
        onChangeText={setDateOfYear}
      />
      {/* lệnh kiểm tra năm học khi ấn thêm là chữ */}
      {/* {dateOfYearError ? (
        <Text style={styles.errorText}>{dateOfYearError}</Text>
      ) : null} */}
      
      <TextInput
        style={styles.input}
        placeholder="URL Hình ảnh"
        value={image}
        onChangeText={setImage}
      />
      {/* <View style={styles.switchContainer}>
        <Text>Trạng thái:</Text>
        <Switch
          value={trangthai}
          onValueChange={setTrangthai}
        />
        <Text>{trangthai ? 'Chính thức' : 'Thử việc'}</Text>
      </View> */}
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddProduct;
