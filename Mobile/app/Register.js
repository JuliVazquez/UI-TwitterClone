import { SafeAreaView, Text, Image, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import styles from "./Styles";
import Logo from "../assets/images/twitter_logo.png";
import TwitterInput from "./molecules/TwitterInput";
import TwitterButton from "./molecules/TwitterButton";
import isValidImageUrl from './functions/validUrl'
import Api from "./Api";

const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [background, setBackground] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigation = useRouter();

  const onRegisterPressed = () => {

    let imageData = image.trim();
    if (imageData !== "" && !isValidImageUrl(imageData)) {
      ToastAndroid.show(
        "Inserta una URL válida para la imagen de perfil (debe terminar en .jpg|jpeg|png|gif)",
        ToastAndroid.LONG
      );
      return;
    }
    if (imageData === "") {
      imageData = "https://i.pinimg.com/originals/20/20/30/2020308937e1c92898d47efa7f1b22e9.jpg";
    }

    let backgrounData = background.trim();
    if (backgrounData !== "" && !isValidImageUrl(backgrounData)) {
      ToastAndroid.show(
        "Inserta una URL válida para la imagen de background (debe terminar en .jpg|jpeg|png|gif)",
        ToastAndroid.LONG
      );
      return;
    }
    if (backgrounData === "") {
      backgrounData = "https://media.canalnet.tv/2021/10/twitter.jpg";
    }

    const data = {
      username: usuario,
      email: email,
      password: password,
      image: imageData,
      backgroundImage: backgrounData,
    };
    Api.register(data)
      .then(() => {
        setRegistrationSuccess(true);
      })
      .catch((error) => {
        ToastAndroid.show(error,ToastAndroid.LONG);
      });
  };

  const onBackPressed = () => {
    navigation.push({ pathname: "/Login" });
  };

  const resetForm = () => {
    setUsuario("");
    setEmail("");
    setPassword("");
    setImage("");
    setBackground("");
  };

  return (
    <SafeAreaView style={styles.register_root}>
      {registrationSuccess ? (
        <>
          <Image
            source={Logo}
            style={styles.register_logo}
            resizeMode="contain"
          />
          <Text style={styles.register_successText}>
            ¡Gracias por registrarte {usuario}!
          </Text>
          <TwitterButton
            text={"Volver"}
            onPress={() => {
              setRegistrationSuccess(false);
              resetForm();
              navigation.push({ pathname: "/Login" });
            }}
            containerWidth="70%"
            backgroundColor="#FFFF"
          />
        </>
      ) : (
        <>
          <Image
            source={Logo}
            style={styles.register_logo}
            resizeMode="contain"
          />
          <Text style={styles.register_headerText}>Crea tu cuenta</Text>

          <TwitterInput
            value={usuario}
            setValue={setUsuario}
            placeholder="Usuario"
            containerWidth="75%"
          />

          <TwitterInput
            value={email}
            setValue={setEmail}
            placeholder="E-mail"
            containerWidth="75%"
          />

          <TwitterInput
            value={password}
            setValue={setPassword}
            placeholder="Password"
            containerWidth="75%"
            secureEntry={true}
          />

          <TwitterInput
            value={image}
            setValue={setImage}
            placeholder="Image"
            containerWidth="75%"
          />

          <TwitterInput
            value={background}
            setValue={setBackground}
            placeholder="Background"
            containerWidth="75%"
          />

          <TwitterButton
            text={"Registrarse"}
            onPress={onRegisterPressed}
            containerWidth="70%"
            backgroundColor="#FFFF"
          />
          <Text style={styles.text}>o</Text>
          <TwitterButton
            text={"Atras"}
            onPress={onBackPressed}
            containerWidth="70%"
            backgroundColor="#FFFF"
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Register;
