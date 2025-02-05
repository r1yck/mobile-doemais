import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { signInWithGoogle } from "../../../services/authService";

export default function ButtonEnterGoogle() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.expoClientId,
    androidClientId: Constants.expoConfig?.extra?.androidClientId,
    iosClientId: Constants.expoConfig?.extra?.iosClientId,
  });

  const handleGoogleLogin = async () => {
    try {
      await promptAsync(); 
      if (response?.type === "success") {
        await signInWithGoogle(response); 
      }
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
        <Image style={styles.icon} source={require("../../../../assets/flat-color-icons_google.png")} />
        <Text>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
}
