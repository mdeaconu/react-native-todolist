import React from "react";
import { Image, Text } from "react-native";
import { s } from "./Header.style";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <>
      <Image style={s.image} source={logo} resizeMode="contain" />
      <Text style={s.subtitle}>You probably have something to do</Text>
    </>
  );
};

export default Header; 
