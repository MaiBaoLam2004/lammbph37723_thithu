import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchData = () => {
    fetch('http://192.168.1.100:3000/database')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation]);

  const toggleModal = employee => {
    setSelectedEmployee(employee);
    setModalVisible(!isModalVisible);
  };

  const handleEdit = employee => {
    navigation.navigate('AddProduct', {user: employee});
  };

  const confirmDelete = employee => {
    Alert.alert(
      'Xác nhận',
      `Bạn có muốn xoá ${employee.fullName} không?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xoá',
          onPress: () => deleteEmployee(employee.id),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteEmployee = employeeId => {
    fetch(`http://192.168.1.100:3000/database/${employeeId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        fetchData(); // Load lại dữ liệu sau khi xoá thành công
        setModalVisible(false); // Ẩn dialog sau khi xoá thành công
      })
      .catch(error => console.error(error));
  };

  const renderItem = ({item}) => (
    <View style={styles.userCard}>
      <Image source={{uri: item.image}} style={styles.userImage} />
      <TouchableOpacity onPress={() => toggleModal(item)}>
        <Text style={styles.userName}>{item.fullName}</Text>
      </TouchableOpacity>
      <Text style={styles.textfont}>Giới tính: {item.gender}</Text>
      <Text style={styles.textfont}>Ngày sinh: {item.dateOfBirth}</Text>
      <Text style={styles.textfont}>Năm học: {item.dateOfYear}</Text>
      {/* <Text style={styles.textfont}>
        Trạng thái: {item.trangthai ? 'Chính thức' : 'Thử việc'}
      </Text> */}
      <View style={styles.buttonContainer}>
        <Button title="Sửa" onPress={() => handleEdit(item)} />
        <Button title="Xóa" onPress={() => confirmDelete(item)} />
      </View>
    </View>
  );

  // tìm kiếm ở đây, theo tên
  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = data.filter(item =>
    item.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách người dùng</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm theo tên..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* có tìm kiếm */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.userList}
      />

      {/* ko có tìm kiếm */}
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.userList}
      /> */}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddProduct', {user: null})}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          {selectedEmployee && (
            <>
              <Image
                source={{uri: selectedEmployee.image}}
                style={styles.userImage}
              />
              <Text style={styles.userName}>{selectedEmployee.fullName}</Text>
              <Text style={styles.textfont}>
                Giới tính: {selectedEmployee.gender}
              </Text>
              <Text style={styles.textfont}>
                Ngày sinh: {selectedEmployee.dateOfBirth}
              </Text>
              <Text style={styles.textfont}>
                Năm học: {selectedEmployee.dateOfYear}
              </Text>
              {/* <Text style={styles.textfont}>
                Trạng thái:{' '}
                {selectedEmployee.trangthai ? 'Chính thức' : 'Thử việc'}
              </Text> */}
              <View style={{marginTop: 20}}>
                <Button title="Đóng" onPress={() => setModalVisible(false)} />
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  userList: {
    alignItems: 'center',
  },
  userCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    width: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  textfont: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default Home;
