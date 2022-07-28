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
//codigo del alumno que se logueo
global.codigo;

const Item = ({citas, onPress}) => (
  <View style={styles.fondo}>
    <Text style={styles.datos} onPress={() => alert(citas.Id_R)}>
      {citas.DiaS} {citas.Mes} {citas.Dia} {citas.Hora} {citas.Codigo}
    </Text>
    <View style={styles.boton}>
      <Button
        title="Borrar"
        color="#87ceeb"
        //mandamos llamar a la funcion borra y le pasamos como parametro el id, que es unico en la tabla
        onPress={onPress}
      />
    </View>
  </View>
);

export default class Rechazadas extends Component {
  constructor(props) {
    super(props);
    //asigancion necesaria para que funcione el this en el llamado a la funcion borra
    this.borra = this.borra.bind(this);
    this.state = {
      // declaracion del arreglo citas donde se guaran los datos de la base de datos
      citas: [],
      //Variable para  hacer refresh
      refreshing: true,
      open: false,
      bandera: 0,
    };
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  salir = () => {
    this.props.navigation.navigate('Bajas');
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
        <Button title="Regresar a Bajas" onPress={this.salir}></Button>
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
      'https://josess.000webhostapp.com/VerRechazadas.php?codigo=' +
        global.codigo,
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
          Alert.alert('notificacion borrada');
          _this.setState({citas: []});
          _this.TraeDatos();
        } else {
          Alert.alert('No se encontro registro');
        }
      }
    };
    xhttp.open(
      'GET',
      'https://josess.000webhostapp.com/BorrarRechazadas.php?id=' + id,
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
    const renderItem = ({item: citas}) => (
      <Item citas={citas} onPress={() => this.borra(citas.Id_R)} />
    );
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
          <View style={{marginTop: 30}}>
            <Text
              style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>
              CITAS RECHAZADAS
            </Text>
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
