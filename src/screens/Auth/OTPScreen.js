import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/Theme';
import { PrimaryButton, TopBar } from '../../components/SharedComponents';

export default function OTPScreen({ navigation, route }) {
  const { email } = route?.params || { email: "email_anda@gmail.com" };
  const [otp, setOtp] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (otp.length < 4) {
      Alert.alert("OTP Tidak Valid", "Mohon masukkan kode OTP yang benar.");
      return;
    }
    
    setLoading(true);
    // Simulasi verifikasi OTP
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("ResetPassword", { email });
    }, 1000);
  };

  const handleResend = () => {
    Alert.alert("Kirim Ulang OTP", "Kode OTP baru telah dikirimkan ke email Anda.");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.white }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <TopBar onBackPress={() => navigation.goBack()} title="" />
      
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.iconBackground}>
              <Ionicons name="chatbubbles-outline" size={40} color={COLORS.primaryGreen} />
            </View>
            <Text style={styles.title}>Verifikasi OTP</Text>
            <Text style={styles.subtitle}>
              Kami telah mengirimkan kode OTP ke email Google Anda: {"\n"}
              <Text style={{fontWeight: 'bold', color: COLORS.textDark}}>{email}</Text>
            </Text>

            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>Kode OTP</Text>
              <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
                <Ionicons name="keypad-outline" size={20} color={isFocused ? COLORS.primaryGreen : COLORS.textGray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan 4-6 digit kode"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
                  maxLength={6}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </View>

              <PrimaryButton title="Verifikasi Kode" onPress={handleVerify} loading={loading} />
              
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Belum menerima kode?</Text>
                <TouchableOpacity onPress={handleResend}>
                  <Text style={styles.resendAction}> Kirim Ulang</Text>
                </TouchableOpacity>
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
    fontSize: 18,
    letterSpacing: 2,
    color: COLORS.textDark,
    height: "100%"
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
  },
  resendText: {
    fontSize: 14,
    color: COLORS.textGray
  },
  resendAction: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryGreen
  }
});
