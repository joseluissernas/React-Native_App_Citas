import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  style,
  TouchableOpacity,
  Button,
  Image,
  Alert,
} from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import CalendarPicker from 'react-native-calendar-picker';
import {Picker} from '@react-native-community/picker';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {SafeAreaView} from 'react-navigation';
global.resultado;
global.codigo;
global.nombre;
global.carrera;

export default class Usuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedStartDate: null,
      language: 'java',
      hora: '',
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  drawerContent = () => {
    return (
      <View style={styles.menu}>
        <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
          <Text>CERRAR</Text>
        </TouchableOpacity>

        <Image
          style={{
            borderColor: '#9acd32',
            borderWidth: 5,
            borderRadius: 30,
            width: 100,
            height: 90,
            marginTop: 15,
          }}
          source={require('./src/imgs/user.png')}></Image>
        <Button
          title="Ir a Bajas"
          onPress={() => this.props.navigation.navigate('Bajas')}></Button>
        <View style={{marginTop: 5}}>
          <Button
            title="cerrar sesion"
            onPress={() => this.props.navigation.navigate('Login')}></Button>
        </View>
        <View style={styles.menu}>
          <Text>{global.resultado}</Text>
        </View>
      </View>
    );
  };

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const cita = () => {
      var fecha = startDate;
      var fechaSeparada = fecha.split(' ');
      var horario = this.state.hora;
      var datosFinales =
        fechaSeparada[0] +
        ' ' +
        fechaSeparada[1] +
        ' ' +
        fechaSeparada[2] +
        ' ' +
        horario +
        ' ' +
        global.codigo +
        ' ' +
        global.nombre +
        ' ' +
        global.carrera;
      console.log(datosFinales);

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (xhttp.responseText == '1') {
            Alert.alert('Cita agendada con exito');
          } else if (xhttp.responseText == '2') {
            Alert.alert(
              'La fecha de cita que elegiste no esta disponible, elige otra',
            );
          } else {
            Alert.alert('Algo salio mal, no se agendo la cita');
          }
        }
      };
      xhttp.open(
        'GET',
        'https://josess.000webhostapp.com/altaCitas.php?diaSemana=' +
          fechaSeparada[0] +
          '&mes=' +
          fechaSeparada[1] +
          '&dia=' +
          fechaSeparada[2] +
          '&hora=' +
          horario +
          '&codigo=' +
          global.codigo +
          '&nombre=' +
          global.nombre +
          '&carrera=' +
          global.carrera,
        true,
      );
      xhttp.send();
    };

    return (
      <View style={styles.container}>
        <MenuDrawer
          open={this.state.open}
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}>
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Text>MENU</Text>
          </TouchableOpacity>
        </MenuDrawer>
        <Text style={{color: 'red', fontWeight: 'bold'}}>
          SELECCIONA LA FECHA EN EL CALENDARIO
        </Text>
        <CalendarPicker onDateChange={this.onDateChange} />
        <View>
          <Text style={{color: 'red', fontWeight: 'bold'}}>
            {' '}
            SELECCIONA EL HORARIO
          </Text>
        </View>
        <Picker
          selectedValue={this.state.hora}
          style={{height: 50, width: 120}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({hora: itemValue})
          }>
          <Picker.Item label="8:00" value="8:00" />
          <Picker.Item label="8:15" value="8:15" />
          <Picker.Item label="8:30" value="8:30" />
          <Picker.Item label="8:45" value="8:45" />
          <Picker.Item label="9:00" value="9:00" />
          <Picker.Item label="9:15" value="9:15" />
          <Picker.Item label="9:30" value="9:30" />
          <Picker.Item label="9:45" value="9:45" />
          <Picker.Item label="10:00" value="10:00" />
          <Picker.Item label="10:15" value="10:15" />
          <Picker.Item label="10:30" value="10:30" />
          <Picker.Item label="10:45" value="10:45" />
          <Picker.Item label="11:00" value="11:00" />
          <Picker.Item label="11:15" value="11:15" />
          <Picker.Item label="11:30" value="11:30" />
          <Picker.Item label="11:45" value="11:45" />
          <Picker.Item label="12:00" value="12:00" />
          <Picker.Item label="12:15" value="12:15" />
          <Picker.Item label="12:30" value="12:30" />
          <Picker.Item label="12:45" value="12:45" />
        </Picker>
        <Button title="agregar cita" onPress={cita} color="#4169e1"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7fffd4',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    zIndex: 0,
  },
  animatedBox: {
    backgroundColor: '#9acd32',
    padding: 10,
  },
  body: {
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9acd32',
  },
  menu: {
    flex: 1,
    backgroundColor: '#8fbc8f',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    zIndex: 0,
  },
});
