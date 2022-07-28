import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  style,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Picker} from '@react-native-community/picker';

export default class Login extends Component {
  state = {
    codigo: '',
    nip: '',
    bandera: 0,
    usuario: '',
    contraseña: '',
    carrera: '',
    dato: '',
  };
  render() {
    //funcion para regresar a la vista principal
    const regreso = () => {
      console.log('regreso');
      this.setState({bandera: 0});
      this.setState({usuario: ''});
      this.setState({contraseña: ''});
      this.setState({codigo: ''});
      this.setState({nip: ''});
    };
    //funcion del boton para mostrar la vista de alumnos
    const alumnos = () => {
      console.log('alumnos');
      this.setState({bandera: 1});
    };
    //funcion del boton para vista registro como administrador
    const admin = () => {
      console.log('administrador');
      this.setState({bandera: 2});
    };
    //funcion del boton para vista ingresar como administrador
    const registro = () => {
      console.log('ingresar');
      this.setState({bandera: 3});
    };
    //funcion para el boton de ingresar como alumno
    const inicio = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          if (xhttp.responseText == 0) {
            Alert.alert('Datos erroneos, intentalo de nuevo');
          } else {
            var datoS = xhttp.responseText;
            var datosSeparados = datoS.split(',');
            var codi = datosSeparados[1];
            var nom = datosSeparados[2];
            var carr = datosSeparados[4];
            global.codigo = codi;
            global.nombre = nom;
            global.carrera = carr;
            var cadena =
              'Codigo:' +
              datosSeparados[1] +
              '\nNombre:' +
              datosSeparados[2] +
              '\nCarrera:' +
              datosSeparados[4];
            global.resultado = cadena;
            _this.props.navigation.navigate('Usuario');
            _this.setState({bandera: 0});
            _this.setState({codigo: ''});
            _this.setState({nip: ''});
          }
        }
      };
      xhttp.open(
        'GET',
        'https://cuceimobile.tech/Escuela/datosudeg.php?codigo=' +
          this.state.codigo +
          '&nip=' +
          this.state.nip,
        true,
      );
      xhttp.send();
    };

    //funcion del boton de registrarse como administrador de citas
    const registroAdmin = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          if (xhttp.responseText == 1) {
            Alert.alert('Registro exitoso');
          } else {
            Alert.alert('Datos erroneos, intentalo de nuevo');
          }
        }
      };
      xhttp.open(
        'GET',
        'https://josess.000webhostapp.com/altaUser.php?nombre=' +
          this.state.usuario +
          '&contraseña=' +
          this.state.contraseña +
          '&carrera=' +
          this.state.carrera,
        true,
      );
      xhttp.send();
    };

    //hasta aqui

    //funcion para ingresar como administador de citas
    const ingresoAdmin = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          if (xhttp.responseText == 0) {
            Alert.alert('Datos erroneos, intentalo de nuevo');
          } else {
            var datosU = xhttp.responseText;
            global.carreraAdmin = datosU;
            _this.props.navigation.navigate('BajasAdmin');
            Alert.alert('Identidad confirmada');
            console.log(global.carreraAdmin);
            _this.setState({bandera: 0});
            _this.setState({usuario: ''});
            _this.setState({contraseña: ''});
            //
          }
        }
      };
      xhttp.open(
        'GET',
        'https://josess.000webhostapp.com/loginUser.php?nombre=' +
          this.state.usuario +
          '&contraseña=' +
          this.state.contraseña,
        true,
      );
      xhttp.send();
    };

    //hasta aqui

    if (this.state.bandera == 0) {
      return (
        <ScrollView>
          <SafeAreaView style={stylesSAV.container}>
            <View
              style={{
                backgroundColor: '#b0c4de',
                padding: 20,
              }}>
              <Image
                style={{
                  width: 310,
                  height: 90,
                  marginTop: 15,
                }}
                source={require('./src/imgs/cuceiudg1.png')}></Image>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {' '}
                CITAS CUCEI{' '}
              </Text>
              <View style={stylesSAV.btn}>
                <Button
                  title="Ingresar como alumno"
                  color="#9acd32"
                  onPress={alumnos}></Button>
              </View>
              <View style={stylesSAV.btn}>
                <Button
                  title="registro administrador"
                  color="#9acd32"
                  onPress={admin}></Button>
              </View>
              <View style={stylesSAV.btn}>
                <Button
                  title="ingreso administrador"
                  color="#9acd32"
                  onPress={registro}></Button>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      );
    } else if (this.state.bandera == 1) {
      return (
        <ScrollView>
          <SafeAreaView style={stylesSAV.container}>
            <View
              style={{
                backgroundColor: '#b0c4de',
                padding: 20,
              }}>
              <Image
                style={{
                  width: 310,
                  height: 90,
                  marginTop: 15,
                }}
                source={require('./src/imgs/cuceiudg1.png')}></Image>
              <Text style={{fontSize: 20, textAlign: 'center'}}> ALUMNO </Text>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {' '}
                CITAS CUCEI{' '}
              </Text>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {' '}
                INGRESA TUS DATOS{' '}
              </Text>
              <TextInput
                placeholder="codigo"
                keyboardType="number-pad"
                onChangeText={(codigo) => this.setState({codigo})}
                value={this.state.codigo}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
              />
              <TextInput
                placeholder="nip"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={(nip) => this.setState({nip})}
                value={this.state.nip}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
              />
              <View style={stylesSAV.btn}>
                <Button
                  title="ingresar"
                  onPress={inicio}
                  color="#9acd32"></Button>
              </View>
              <View style={stylesSAV.btn}>
                <Button
                  title="regresar"
                  onPress={regreso}
                  color="#9acd32"></Button>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      );
    } else if (this.state.bandera == 2) {
      return (
        <ScrollView>
          <SafeAreaView style={stylesSAV.container}>
            <View
              style={{
                backgroundColor: '#b0c4de',
                padding: 20,
              }}>
              <Image
                style={{
                  width: 310,
                  height: 90,
                  marginTop: 15,
                }}
                source={require('./src/imgs/cuceiudg1.png')}></Image>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {' '}
                ADMINISTRADOR{' '}
              </Text>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {' '}
                CITAS CUCEI{' '}
              </Text>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {' '}
                INGRESA TUS DATOS{' '}
              </Text>
              <TextInput
                placeholder="usuario"
                keyboardType="number-pad"
                onChangeText={(usuario) => this.setState({usuario})}
                value={this.state.usuario}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
              />
              <TextInput
                placeholder="contraseña"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={(contraseña) => this.setState({contraseña})}
                value={this.state.contraseña}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
              />
              <Text>Carrera</Text>
              <Picker
                selectedValue={this.state.carrera}
                style={{height: 50, width: 120}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({carrera: itemValue})
                }>
                <Picker.Item label="COM" value="COM" />
                <Picker.Item label="INCE" value="INCE" />
                <Picker.Item label="INNI" value="INNI" />
              </Picker>
              <View style={stylesSAV.btn}>
                <Button
                  title="registrarse"
                  onPress={registroAdmin}
                  color="#9acd32"></Button>
              </View>
              <View style={stylesSAV.btn}>
                <Button
                  title="regresar"
                  onPress={regreso}
                  color="#9acd32"></Button>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      );
    } else if (this.state.bandera == 3) {
      return (
        <ScrollView>
          <SafeAreaView style={stylesSAV.container}>
            <View
              style={{
                backgroundColor: '#b0c4de',
                padding: 20,
              }}>
              <Image
                style={{
                  width: 310,
                  height: 90,
                  marginTop: 15,
                }}
                source={require('./src/imgs/cuceiudg1.png')}></Image>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {' '}
                ADMINISTRADOR{' '}
              </Text>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {' '}
                CITAS CUCEI{' '}
              </Text>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {' '}
                INGRESA TUS DATOS{' '}
              </Text>
              <TextInput
                placeholder="usuario"
                keyboardType="number-pad"
                onChangeText={(usuario) => this.setState({usuario})}
                value={this.state.usuario}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
              />
              <TextInput
                placeholder="contraseña"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={(contraseña) => this.setState({contraseña})}
                value={this.state.contraseña}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
              />
              <View style={stylesSAV.btn}>
                <Button
                  title="ingresar"
                  onPress={ingresoAdmin}
                  color="#9acd32"></Button>
              </View>
              <View style={stylesSAV.btn}>
                <Button
                  title="regresar"
                  onPress={regreso}
                  color="#9acd32"></Button>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      );
    }
  }
}

const stylesSAV = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  btn: {
    //borderColor: 'black',
    //borderWidth: 1,
    marginTop: 15,
  },
});
