import React, {Component} from 'react';
import {
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MenuDrawer from 'react-native-side-drawer';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Picker} from '@react-native-community/picker';
import CalendarPicker from 'react-native-calendar-picker';
//carrera del administrador que se logueo
global.carreraAdmin;

const Item = ({citas, onPress}) => (
  <View style={styles.fondo}>
    <Text style={styles.datos} onPress={() => alert(citas.Id)}>
      {citas.Diasemana} {citas.Mes} {citas.Dia} {citas.Hora} {citas.Carrera}{' '}
      {citas.Nombre}
    </Text>
    <View style={styles.boton}>
      <Button
        title="Rechazar"
        color="#87ceeb"
        //mandamos llamar a la funcion borra y le pasamos como parametro el id, que es unico en la tabla
        onPress={onPress}
      />
    </View>
  </View>
);

export default class Bajas2 extends Component {
  constructor(props) {
    super(props);
    //asigancion necesaria para que funcione el this en el llamado a la funcion borra
    this.borra = this.borra.bind(this);
    this.state = {
      // declaracion del arreglo citas donde se guaran los datos de la base de datos
      citas: [],
      //Variable para  hacer refresh
      refreshing: true,
      weekday: '',
      open: false,
      bandera: 0,
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  salir = () => {
    this.props.navigation.navigate('Login');
    this.setState({citas: []});
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

  //funcion que llena la lista con los datos, se declaro en una funcion para no  poner el codigo de conexion cada rato
  //asi solo se manda llmar a la funcion
  TraeDatos = () => {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (xhttp.responseText == '0') {
          Alert.alert('algo salio mal');
        } else {
          _this.setState({citas: JSON.parse(xhttp.responseText)});
          _this.setState({refreshing: false});
          _this.setState({bandera: 0});
          console.log(_this.state.citas);
        }
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
  //funcion que manda llamar a borracitas.php el cual le pasamos como parametro id que es unico no olviden que deben cambiar la ruta
  // asu servidor..
  borra(id) {
    console.log('borra');
    console.log(id);
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        if (xhttp.responseText === '1') {
          Alert.alert('cita rechazada');
          _this.setState({citas: []});
          _this.TraeDatos();
        } else {
          Alert.alert('No se encontro registro');
        }
      }
    };
    xhttp.open(
      'GET',
      'https://josess.000webhostapp.com/Rechazadas.php?id=' + id,
      true,
    );
    xhttp.send();
  }

  //Accion que actualiza la tabla o lista
  onRefresh() {
    this.setState({citas: []});
    this.TraeDatos();
  }
  //accion que carga los datos cuando carga la vista en el cel para verla
  componentDidMount = async () => {
    this.TraeDatos();
  };
  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    const renderItem = ({item: citas}) => (
      <Item citas={citas} onPress={() => this.borra(citas.Id)} />
    );
    //funcion para mostrar la busqueda de calendario
    const muestraCalendario = () => {
      console.log('mostrar calendario');
      this.setState({bandera: 1});
    };

    //funcion para buscar por dia de la semana
    const busquedaDia = () => {
      console.log(this.state.weekday);
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (xhttp.responseText == 0) {
            Alert.alert('algo fallo');
          } else {
            _this.setState({
              citas: JSON.parse(xhttp.responseText),
              refreshing: false,
            });
          }
        }
      };

      xhttp.open(
        'GET',
        'https://josess.000webhostapp.com/weekdayFilter.php?diaSemana=' +
          this.state.weekday +
          '&carrera=' +
          global.carreraAdmin,
        true,
      );
      xhttp.send();
    };
    //
    //funcion para buscar por fecha
    const buscaxFecha = () => {
      let _this = this;
      var fecha = startDate;
      var fechaSeparada = fecha.split(' ');
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (xhttp.responseText == '0') {
            Alert.alert('algo fallo');
          } else {
            _this.setState({
              citas: JSON.parse(xhttp.responseText),
              refreshing: false,
            });
            _this.setState({bandera: 0});
          }
        }
      };

      xhttp.open(
        'GET',
        'https://josess.000webhostapp.com/monthdayFilter.php?dia=' +
          fechaSeparada[2] +
          '&mes=' +
          fechaSeparada[1] +
          '&carrera=' +
          global.carreraAdmin,
        true,
      );
      xhttp.send();
    };
    //
    //accion que se ejecuta mietras carga los datos, pantalla fiusha con el texto de cargando datos

    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{flex: 1, backgroundColor: '#C2185B', paddingTop: 20}}>
          <Text> Cargando</Text>
          <ActivityIndicator />
        </View>
      );
    }
    if (this.state.bandera == 0) {
      return (
        //Vista de la lista, se uso el componente Flatlist
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
          <View style={{marginTop: 20}}>
            <Picker
              selectedValue={this.state.weekday}
              style={{height: 50, width: 120}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({weekday: itemValue})
              }>
              <Picker.Item label="Elige" value="Elige" />
              <Picker.Item label="Mon" value="Mon" />
              <Picker.Item label="Tue" value="Tue" />
              <Picker.Item label="Wed" value="Wed" />
              <Picker.Item label="Thu" value="Thu" />
              <Picker.Item label="Fri" value="Fri" />
              <Picker.Item label="Sat" value="Sat" />
            </Picker>
          </View>
          <View style={{marginTop: 5}}>
            <Button
              title="buscar por dia"
              onPress={busquedaDia}
              color="#87ceeb"></Button>
          </View>
          <View style={{marginTop: 5}}>
            <Button
              title="buscar por fecha"
              onPress={muestraCalendario}
              color="#87ceeb"></Button>
          </View>
          <View style={{marginBottom: 350}}>
            <FlatList
              // de donde se obtienen los datos, de el arreglo citas
              data={this.state.citas}
              //no se, en la documentacion no la encontre, si la quito no veo cambios, la dejo..
              enableEmptySections={true}
              //Vista de los datos item es el arreglo y para acceder a los datos hay que hace item.Hora, item.Dia etc
              renderItem={renderItem}
              keyExtractor={(item) => item.Id}
              refreshControl={
                <RefreshControl
                  //esto es para cuando bajas la lista se actualiza, ya se hace en automatico alla arriba :P
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
            />
          </View>
        </View>
      );
    } else if (this.state.bandera == 1) {
      return (
        <View style={{backgroundColor: '#f0e68c'}}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>
            SELECCIONA LA FECHA EN EL CALENDARIO
          </Text>
          <CalendarPicker onDateChange={this.onDateChange} />
          <Button title="Buscar" onPress={buscaxFecha} color="#ffd700"></Button>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: 10,
  },
  rowViewContainer: {
    fontSize: 20,
    padding: 10,
  },
  rowViewContainer1: {
    marginLeft: 200,
  },
  fondo: {
    width: 300,
    height: 95,
    borderWidth: 0,
    borderRadius: 10,
    marginLeft: 40,
    marginTop: 5,
    borderWidth: 1,

    //shadowColor: '#000',
    //shadowOffset: {
    //  width: 0,
    //  height: 2,
    //},
    // shadowOpacity: 0.25,
    //shadowRadius: 5.46,

    //elevation: 5,
  },
  datos: {
    marginTop: 5,
    marginLeft: 20,
    fontSize: 12,
  },
  boton: {
    width: 100,
    height: 40,
    marginTop: 4,
    marginLeft: 180,
    alignItems: 'center',
  },
  menu: {
    flex: 1,
    backgroundColor: '#add8e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    zIndex: 0,
  },
  body: {
    width: 70,
    height: 30,
    marginLeft: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9acd32',
  },
  animatedBox: {
    backgroundColor: '#9acd32',
    padding: 10,
  },
});
