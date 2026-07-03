import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/Theme';
import { TopBar, PrimaryButton, Card } from '../../components/SharedComponents';
import { useSession } from '../../store/SessionContext';

export default function StartSessionScreen({ navigation }) {
  const [targetAmount, setTargetAmount] = useState('');
  const [defaultCapacity, setDefaultCapacity] = useState('20');
  const { startSession, currentUser } = useSession();

  const handleStart = () => {
    const collectorName = currentUser?.username || "Petani";
    startSession(collectorName, targetAmount, parseInt(defaultCapacity) || 20);
    navigation.navigate("Scanner");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBackPress={() => navigation.goBack()} title="Mulai Sesi Panen" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.heading}>Informasi Sesi</Text>
          <Text style={styles.subtext}>Lengkapi data berikut untuk memulai sesi grading buah nanas.</Text>
          


          <View style={styles.inputGroup}>
            <Text style={styles.label}>Target Jumlah Buah (Opsional)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="list-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Cth: 100"
                value={targetAmount}
                onChangeText={setTargetAmount}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textGray}
              />
            </View>
            <Text style={styles.helperText}>Sesi akan memberi notifikasi bila mencapai target ini.</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kapasitas Default Box (Buah)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="cube-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Cth: 20"
                value={defaultCapacity}
                onChangeText={setDefaultCapacity}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textGray}
              />
            </View>
          </View>
        </Card>

        <PrimaryButton 
          title="Mulai Sesi & Pindai" 
          icon="scan-outline" 
          onPress={handleStart} 
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight
  },
  content: {
    padding: 20,
  },
  card: {
    padding: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 6
  },
  subtext: {
    fontSize: 13,
    color: COLORS.textGray,
    marginBottom: 24
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 8
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: COLORS.textDark,
  },
  helperText: {
    fontSize: 11,
    color: COLORS.textGray,
    marginTop: 6,
    marginLeft: 4
  }
});
