import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Layout, Text, useTheme, Icon } from "@ui-kitten/components";
import React, { useState } from "react"; // Importação do useState
import { Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from "react-native";
import { RoutesParams } from "../../navigation/routesParams";
import { useNavigation } from "@react-navigation/native";
import ButtonGlobal from "../../components/buttons/buttonGlobal";
import styles from "./styles";
import InputGlobal from "../../components/inputs/inputGlobal";

type RecoverPasswordParamsList = NativeStackNavigationProp<RoutesParams, "RecoverPassword">;

export default function RecoverPasswordScreen() {
  const navigation = useNavigation<RecoverPasswordParamsList>();
  const theme = useTheme();

  // Estado para armazenar o valor do e-mail
  const [email, setEmail] = useState<string>("");

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
            <Image source={require("../../../assets/logos/logo-media.png")} />
          </Layout>

          {/* Caixa de textos */}
          <Layout style={styles.box}>
            <Text category="h1" style={styles.title}>
              Esqueci minha senha
            </Text>
            <Text category="h6" style={styles.text}>
              Insira seu e-mail cadastrado para iniciar o processo de recuperação de conta.
            </Text>
          </Layout>

          <Layout style={styles.inputs}>
            {/* Passando value e onChangeText para InputGlobal */}
            <InputGlobal
              label={<Text>Seu e-mail <Text style={{ color: "red" }}>*</Text></Text>}
              placeholder="ex.john@doe.com"
              iconName="person-outline"
              value={email} // Passando o valor atual do e-mail
              onChangeText={(text: string) => setEmail(text)} // Função para atualizar o e-mail
              keyboardType="email-address" // Definindo o teclado como e-mail
            />
          </Layout>

          {/* Botão */}
          <Layout style={styles.buttonContainer}>
            <ButtonGlobal
              title="Enviar link de recuperação"
              appeareances=""
              
              onPress={() => { Keyboard.dismiss(); navigation.navigate("NewPassword")}}
            />
          </Layout>
        </Layout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}