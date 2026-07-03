import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/Theme';
import { PrimaryButton, TopBar } from '../../components/SharedComponents';

export default function ResetPasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPassVisible, setPassVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [isPassFocused, setPassFocused] = useState(false);
  const [isConfirmFocused, setConfirmFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    if (!password || !confirmPassword) {
      Alert.alert("Data Tidak Lengkap", "Mohon lengkapi semua kolom kata sandi.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Kata Sandi Tidak Cocok", "Kata sandi baru dan konfirmasi tidak sama.");
      return;
    }
    
    setLoading(true);
    // Simulasi penyimpanan password baru
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Berhasil", 
        "Kata sandi Anda telah berhasil direset. Silakan masuk menggunakan kata sandi baru.",
        [{ text: "Kembali ke Login", onPress: () => navigation.navigate("Login") }]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.white }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <TopBar onBackPress={() => navigation.goBack()} title="" />
      
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.iconBackground}>
              <Ionicons name="shield-checkmark-outline" size={40} color={COLORS.primaryGreen} />
            </View>
            <Text style={styles.title}>Buat Kata Sandi Baru</Text>
            <Text style={styles.subtitle}>
              Kata sandi baru Anda harus berbeda dari kata sandi sebelumnya.
            </Text>

            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>Kata Sandi Baru</Text>
              <View style={[styles.inputWrapper, isPassFocused && styles.inputWrapperFocused]}>
                <Ionicons name="lock-closed-outline" size={20} color={isPassFocused ? COLORS.primaryGreen : COLORS.textGray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan kata sandi baru"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPassVisible}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                />
                <TouchableOpacity onPress={() => setPassVisible(!isPassVisible)} style={styles.eyeIcon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Ionicons name={isPassVisible ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.textGray} />
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Konfirmasi Kata Sandi Baru</Text>
              <View style={[styles.inputWrapper, isConfirmFocused && styles.inputWrapperFocused]}>
                <Ionicons name="lock-closed-outline" size={20} color={isConfirmFocused ? COLORS.primaryGreen : COLORS.textGray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ketik ulang kata sandi"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!isConfirmVisible}
                  onFocus={() => setConfirmFocused(true)}
                  onBlur={() => setConfirmFocused(false)}
                />
                <TouchableOpacity onPress={() => setConfirmVisible(!isConfirmVisible)} style={styles.eyeIcon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Ionicons name={isConfirmVisible ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.textGray} />
                </TouchableOpacity>
              </View>

              <PrimaryButton title="Simpan & Masuk" onPress={handleReset} loading={loading} style={{marginTop: 10}} />
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
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20
  },
  iconBackground: {
    backgroundColor: "rgba(10, 92, 54, 0.08)",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.textDark,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textGray,
    lineHeight: 22,
    marginBottom: 40
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
  }
});
