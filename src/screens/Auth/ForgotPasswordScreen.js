import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/Theme';
import { PrimaryButton, TopBar } from '../../components/SharedComponents';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Email tidak valid", "Mohon masukkan alamat email Google yang valid.");
      return;
    }
    
    setLoading(true);
    // Simulasi pengiriman OTP
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("OTP", { email });
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.white }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <TopBar onBackPress={() => navigation.goBack()} title="" />
      
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.iconBackground}>
              <Ionicons name="lock-closed-outline" size={40} color={COLORS.primaryGreen} />
            </View>
            <Text style={styles.title}>Lupa Kata Sandi?</Text>
            <Text style={styles.subtitle}>
              Jangan khawatir! Masukkan email akun Google Anda yang terdaftar, dan kami akan mengirimkan kode OTP untuk mereset kata sandi Anda.
            </Text>

            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>Email Google Anda</Text>
              <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
                <Ionicons name="mail-outline" size={20} color={isFocused ? COLORS.primaryGreen : COLORS.textGray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="contoh@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </View>

              <PrimaryButton title="Kirim Kode OTP" onPress={handleSendOTP} loading={loading} />
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
    marginBottom: 30,
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
  }
});
