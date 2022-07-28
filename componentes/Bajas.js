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
import Celda from './CeldaBajas.js';
global.codigo;
global.resultado;
global.nombre;
global.carrera;

export default class Bajas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citas: [],
    };
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
          title="Regresar a Altas"
          onPress={() => this.props.navigation.navigate('Usuario')}></Button>
        <View style={{marginTop: 5}}>
          <Button
            title="notificaciones"
            onPress={() =>
              this.props.navigation.navigate('Rechazadas')
            }></Button>
        </View>
        <View style={styles.menu}>
          <Text>{global.resultado}</Text>
        </View>
      </View>
    );
  };

  componentDidMount = async () => {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      console.log(this.status);
      if (this.readyState == 4 && this.status == 200) {
        _this.setState({citas: JSON.parse(xhttp.responseText)});
        console.log(_this.state.citas);
      }
    };
    xhttp.open(
      'GET',
      'https://josess.000webhostapp.com/VerCitas.php?codigo=' + global.codigo,
      true,
    );
    xhttp.send();
  };

  render() {
    return (
      <ScrollView>
        <View>
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
          <SafeAreaView style={stylesSAV.contenedor}>
            {this.state.citas.map((citas, index) => (
              <Celda
                key={index}
                hora1={citas.Hora}
                dia1={citas.Dia}
                mes1={citas.Mes}
                codigo1={citas.Codigo}
                id1={citas.Id}
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
                  citas.Codigo
                }
              />
            ))}
          </SafeAreaView>
        </View>
      </ScrollView>
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
