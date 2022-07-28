import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  style,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';
//
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CalendarPicker from 'react-native-calendar-picker';
import {Picker} from '@react-native-community/picker';
import Bajas2 from './Bajas2.js';

export default class Admincitas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCita: props.datosC,
      hora: props.hora1,
      dia: props.dia1,
      mes: props.mes1,
      codigo: props.codigo1,
      id: props.id1,
      nombre: props.nombre1,
      diasemana: props.diaSemana1,
      carrera: props.carrera1,
      bandera: 0,
      selectedStartDate: null,
      hora: '',
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  //
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  //

  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    const borra = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if (xhttp.responseText == 0) {
            Alert.alert('Intentelo mas tarde');
          } else {
            Alert.alert('Cita borrada');
            _this.setState({bandera: 1});
          }
        }
      };
      xhttp.open(
        'GET',
        'https://josess.000webhostapp.com/BajasCitas.php?id=' + this.state.id,
        true,
      );
      xhttp.send();
    };

    if (this.state.bandera == 0) {
      return (
        <View style={{backgroundColor: '#e6e6fa'}}>
          <View style={styles.fondo}>
            <Text style={styles.datos}>{this.state.datosCita}</Text>
            <View style={styles.boton}>
              <Button title="borrar" onPress={borra} color="#8b0000"></Button>
            </View>
          </View>
        </View>
      );
    } else {
      /*else if (this.state.bandera == 2) {
      return (
        <View style={{backgroundColor: '#f0e68c'}}>
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
          <Button
            title="modificar cita"
            onPress={Modifica}
            color="#ffd700"></Button>
        </View>
      );
    }
    */
      return <View></View>;
    }
  }
}
const styles = StyleSheet.create({
  boton: {
    width: 110,
    height: 40,
    marginTop: 10,
    marginLeft: 25,
  },
  datos: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 20,
  },
  fondo: {
    width: 280,
    height: 200,
    borderWidth: 2,
    marginLeft: 40,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    // shadowColor:"#000",
    //shadowOffset:{
    //width:0,
    //height:4,
    // },
    // shadowOpacity:0.32,
    // shadowRadius:5.46,
    // elevation:9,
    flex: 1,
    justifyContent: 'center',
  },
});
