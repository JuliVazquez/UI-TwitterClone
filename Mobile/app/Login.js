import React, { useState } from "react";
import { View, Text, Image, ToastAndroid } from "react-native";
import { useRouter } from "expo-router";
import styles from "./Styles";
import Logo from "../assets/images/twitter_logo.png";
import TwitterInput from "./molecules/TwitterInput";
import TwitterButton from "./molecules/TwitterButton";
import Api from "./Api";

const Login = () => {
  const navigation = useRouter();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPressed = async () => {
    const data = { username: usuario, password: password };
    Api.login(data)
      .then(() => {
        navigation.push("/Home", { isLoggedIn: true });
      })
      .catch((error) => {
        ToastAndroid.show(error,ToastAndroid.LONG);
      });
  };

  const onRegisterPressed = () => {
    navigation.push({ pathname: "/Register" });
  };

  return (
    <View style={styles.login_root}>
      <Image source={Logo} style={styles.login_logo} resizeMode="contain" />
      <Text style={styles.welcomeText}>
        ¡Hola otra vez! Inicia sesión para enterarte de lo último
      </Text>

      <TwitterInput
        value={usuario}
        setValue={setUsuario}
        placeholder="Usuario"
        containerWidth="75%"
      />

      <TwitterInput
        value={password}
        setValue={setPassword}
        placeholder="Password"
        containerWidth="75%"
        secureEntry={true}
      />

      <TwitterButton
        text={"Iniciar sesión"}
        onPress={onLoginPressed}
        containerWidth="70%"
        backgroundColor="#FFFFFF"
      />
      <Text style={styles.text}>o</Text>
      <TwitterButton
        text={"Registrarse"}
        onPress={onRegisterPressed}
        containerWidth="70%"
        backgroundColor="#FFFFFF"
      />
    </View>
  );
};

export default Login;
