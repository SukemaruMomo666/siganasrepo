import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../theme/Theme';
import { PrimaryButton } from '../../components/SharedComponents';
import { useSession } from '../../store/SessionContext';

export default function LoginScreen({ navigation }) {
  const { login } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isUserFocused, setUserFocused] = useState(false);
  const [isPassFocused, setPassFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Data belum lengkap", "Mohon isi nama pengguna dan kata sandi terlebih dahulu.");
      return;
    }
    setLoading(true);
    // Simulasi proses masuk agar terasa nyata untuk pengguna
    setTimeout(() => {
      setLoading(false);
      login(username);
      navigation.replace("MainTabs");
    }, 700);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.white }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginInnerContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.iconBackground}>
                <MaterialCommunityIcons name="fruit-pineapple" size={50} color={COLORS.primaryYellow} />
              </View>
              <Text style={styles.title}>SiGanas</Text>
              <Text style={styles.subtitle}>Sistem Grading Nanas Subang</Text>
              <Text style={styles.subtitleSmall}>Bantu petani menentukan mutu buah dengan cepat & akurat</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>Nama Pengguna</Text>
              <View style={[styles.inputWrapper, isUserFocused && styles.inputWrapperFocused]}>
                <Ionicons name="person-outline" size={20} color={isUserFocused ? COLORS.primaryGreen : COLORS.textGray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Contoh: budi_petani"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  onFocus={() => setUserFocused(true)}
                  onBlur={() => setUserFocused(false)}
                />
              </View>

              <Text style={styles.inputLabel}>Kata Sandi</Text>
              <View style={[styles.inputWrapper, isPassFocused && styles.inputWrapperFocused]}>
                <Ionicons name="lock-closed-outline" size={20} color={isPassFocused ? COLORS.primaryGreen : COLORS.textGray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Ionicons name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.textGray} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotPasswordText}>Lupa Kata Sandi?</Text>
              </TouchableOpacity>

              <PrimaryButton title="MASUK" onPress={handleLogin} loading={loading} />

              <View style={styles.helpRow}>
                <Ionicons name="information-circle-outline" size={16} color={COLORS.textGray} />
                <Text style={styles.helpText}>  Butuh bantuan? Hubungi petugas lapangan koperasi.</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginInnerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 35
  },
  iconBackground: {
    backgroundColor: "rgba(10, 92, 54, 0.05)",
    padding: 20,
    borderRadius: 50,
    marginBottom: 15
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: COLORS.primaryGreen,
    letterSpacing: 0.5
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textGray,
    marginTop: 5
  },
  subtitleSmall: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: 20
  },
  formContainer: {
    width: "100%"
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primaryGreen,
    marginBottom: 8,
    marginLeft: 4
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 60,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primaryGreen
  },
  inputIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
    height: "100%"
  },
  eyeIcon: {
    padding: 10
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 30
  },
  forgotPasswordText: {
    color: COLORS.primaryGreen,
    fontSize: 14,
    fontWeight: "700"
  },
  helpRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18
  },
  helpText: {
    fontSize: 12,
    color: COLORS.textGray
  }
});
