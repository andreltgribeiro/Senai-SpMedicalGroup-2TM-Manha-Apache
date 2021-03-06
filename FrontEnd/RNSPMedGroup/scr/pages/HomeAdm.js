import React, { Component } from 'react'
import { Text, StyleSheet, Image, View, StatusBar, AsyncStorage, TouchableOpacity } from 'react-native'
import jwt from 'jwt-decode'

class HomeAdm extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require("../assets/img/house-outline.png")}
                style={styles.tabNavigatorIconHome}
            />
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            token: '', nome: '', loggedIn: false
        }

    }
    buscarToken = async () => {
        try {
            const value = await AsyncStorage.getItem("userToken");
            if (value !== null) {
                this.setState({ nome: jwt(value).nomeuser });
                this.setState({ token: value });
                this.setState({ loggedIn: true });
            }
        } catch (error) { }
    };
    logout = async () => {
        try {
            AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Tela inicial')
        } catch (error) {
        }
    }

    componentDidMount() {
        this.buscarToken();
        this.props.navigation.setParams({ logout: this.logout.bind(this) })
    }
    render() {

        return (
            <View>
                <StatusBar backgroundColor="#5e9bff" barStyle="light-content" />
                <View style={styles.overlay} />
                <View style={styles.conteudo}>

                    <Image
                        source={require("../assets/img/logo.png")}
                        style={styles.image}
                    />
                    <Text style={styles.bemVindo}>Bem vindo {this.state.nome}</Text>
                    <TouchableOpacity
                        onPress={this.logout}
                    >
                        <Text style={styles.textoBotao}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}

export default HomeAdm;

const styles = StyleSheet.create({
    bemVindo: {
        fontSize: 20
    },
    tabNavigatorIconHome: {
        width: 25,
        height: 25,
        tintColor: "#FFFFFF"
    },
    red: {
        backgroundColor: 'red',
        color: 'red',
        height: 10,
        width: 10
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#FFFFFF"
    },
    conteudo: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    image: {
        height:80,
        width:75
    },
    botao: {
        height: 38,
        elevation: 4,
        width: 240,
        borderRadius: 30,
        backgroundColor: "#81DF99",
        marginTop: 10
    },
    textoBotao: {
        fontSize: 16,
        fontFamily: "OpenSans-Regular",
        color: "blue"
    },
    input: {
        width: 240,
        marginBottom: 10,
        fontSize: 12,
        color: '#5e9bff'
    }
});