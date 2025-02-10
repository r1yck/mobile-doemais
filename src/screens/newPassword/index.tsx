import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Layout, Text, useTheme, Icon } from "@ui-kitten/components";
import React, { useState } from "react";
import { Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { RoutesParams } from "../../navigation/routesParams";
import { useNavigation } from "@react-navigation/native";
import ButtonGlobal from "../../components/buttons/buttonGlobal";
import styles from "./styles";
import InputIconLeftAndRight from "../../components/inputs/inputIconsLeftAndRight";

type NewPasswordParamsList = NativeStackNavigationProp<RoutesParams, "NewPassword">;

export default function NewPasswordScreen() {
  const navigation = useNavigation<NewPasswordParamsList>();
  const theme = useTheme();

  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState(""); // Adicionando controle para a nova senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Adicionando controle para a confirmação da senha

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(prevState => !prevState);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <Layout style={styles.container}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Icon
              name="arrow-back"
              fill={theme["black"]}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>

          {/* Logo */}
          <Layout style={styles.logo}>
            <Image
              source={require("../../../assets/logos/logo-media.png")}
            />
          </Layout>

          {/* Caixa de textos */}
          <Layout style={styles.box}>
            <Text category="h1" style={styles.title}>
              Cadastrar nova senha
            </Text>
            <Text category="h6" style={styles.text}>
              Digite sua nova senha
            </Text>
          </Layout>

          {/* Inputs */}
          <Layout style={styles.inputs}>
            <InputIconLeftAndRight
              label={<Text>Senha <Text style={{ color: "red" }}>*</Text></Text>}
              placeholder="Sua nova senha"
              iconLeft="lock"
              iconRight={isNewPasswordVisible ? "eye-off-outline" : "eye-outline"}
              secureTextEntry={!isNewPasswordVisible}
              onIconRightPress={toggleNewPasswordVisibility}
              value={newPassword} // Controlando o valor da senha
              onChangeText={setNewPassword} // Atualizando o estado da senha
            />
            <InputIconLeftAndRight
              label={<Text>Confirmar senha <Text style={{ color: "red" }}>*</Text></Text>}
              placeholder="Confirmar sua nova senha"
              iconLeft="lock"
              iconRight={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"}
              secureTextEntry={!isConfirmPasswordVisible}
              onIconRightPress={toggleConfirmPasswordVisibility}
              value={confirmPassword} // Controlando o valor da confirmação da senha
              onChangeText={setConfirmPassword} // Atualizando o estado da confirmação da senha
            />
          </Layout>

          {/* Botão */}
          <Layout style={styles.buttonContainer}>
            <ButtonGlobal
              title="Salvar"
              appeareances=""
              onPress={() => {
                // Lógica para verificar se as senhas coincidem
                if (newPassword === confirmPassword) {
                  navigation.navigate("Login"); // Navega para a tela de Login se as senhas coincidirem
                } else {
                  alert("As senhas não coincidem!"); // Mensagem de erro se as senhas não coincidirem
                }
              }}
            />
          </Layout>
        </Layout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}