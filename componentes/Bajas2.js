import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Button,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MenuDrawer from 'react-native-side-drawer';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Admincitas from './admincitas.js';
import {Picker} from '@react-native-community/picker';

global.carreraAdmin;

export default class Bajas2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citas: [],
      diasem: '',
    };
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  salir = () => {
    this.props.navigation.navigate('Login');
    this.setState({citas: []});
  };

  mandardia = () => {
    global.weekdays = this.state.diasem;
    console.log(global.weekdays);
    this.setState({diasem: ''});
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
        <Button title="cerrar sesion" onPress={this.salir}></Button>
      </View>
    );
  };
  //() => this.props.navigation.navigate('Login')
  componentDidMount = async () => {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      console.log(this.status);
      if (this.readyState == 4 && this.status == 200) {
        _this.setState({citas: []});
        _this.setState({citas: JSON.parse(xhttp.responseText)});
        console.log(_this.state.citas);
      }
    };
    xhttp.open(
      'GET',
      'https://josess.000webhostapp.com/verCitasAdmin.php?carrera=' +
        global.carreraAdmin,
      true,
    );
    xhttp.send();
  };

  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.diasem}
          style={{height: 50, width: 120}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({diasem: itemValue})
          }>
          <Picker.Item label="Elige" value="Elige" />
          <Picker.Item label="Mon" value="Mon" />
          <Picker.Item label="Tue" value="Tue" />
          <Picker.Item label="Wed" value="Wed" />
          <Picker.Item label="Thu" value="Thu" />
          <Picker.Item label="Fri" value="Fri" />
          <Picker.Item label="Sat" value="Sat" />
        </Picker>
        <View style={{marginTop: 5}}>
          <Button title="buscar" onPress={this.mandardia}></Button>
        </View>
        <ScrollView>
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
          <View>
            <SafeAreaView style={stylesSAV.contenedor}>
              {this.state.citas.map((citas, index) => (
                <Admincitas
                  key={index}
                  hora1={citas.Hora}
                  dia1={citas.Dia}
                  mes1={citas.Mes}
                  codigo1={citas.Codigo}
                  id1={citas.Id}
                  nombre1={citas.Nombre}
                  diaSemana1={citas.Diasemana}
                  carrera1={citas.Carrera}
                  datosC={
                    'Hora:' +
                    citas.Hora +
                    '\n' +
                    'Fecha:' +
                    citas.Dia +
                    '/' +
                    citas.Mes +
                    '\n' +
                    'Codigo:' +
                    citas.Codigo +
                    '\n' +
                    'Nombre:' +
                    citas.Nombre
                  }
                />
              ))}
            </SafeAreaView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const stylesSAV = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 30,
  },
});

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
    backgroundColor: '#add8e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    zIndex: 0,
  },
});
