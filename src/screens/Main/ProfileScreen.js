import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/Theme';
import { TopBar, Card, SectionHeader, OutlineButton } from '../../components/SharedComponents';

export default function ProfileScreen({ navigation }) {
  const menuItems = [
    { icon: "person-circle-outline", label: "Pengaturan Akun" },
    { icon: "language-outline", label: "Bahasa Aplikasi" },
    { icon: "notifications-outline", label: "Notifikasi" },
    { icon: "help-circle-outline", label: "Bantuan & Panduan" },
    { icon: "information-circle-outline", label: "Tentang SiGanas" },
  ];

  const handleLogout = () => {
    Alert.alert("Keluar Akun", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      { text: "Keluar", style: "destructive", onPress: () => navigation.replace("Login") },
    ]);
  };

  const handleExitApp = () => {
    Alert.alert("Keluar Aplikasi", "Apakah Anda yakin ingin menutup aplikasi SiGanas?", [
      { text: "Batal", style: "cancel" },
      { text: "Tutup Aplikasi", style: "destructive", onPress: () => BackHandler.exitApp() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onMenuPress={() => {}} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Card style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>BP</Text>
          </View>
          <Text style={styles.profileName}>Pak Budi Prasetyo</Text>
          <Text style={styles.profileRole}>Petani - Koperasi Tani Subang Makmur</Text>
        </Card>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>PANEN BULAN INI</Text>
            <Text style={styles.statValue}>1.240</Text>
            <Text style={styles.statUnit}>buah</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>EST. PENDAPATAN</Text>
            <Text style={[styles.statValue, { fontSize: 22 }]}>Rp 4,3jt</Text>
          </View>
        </View>

        <SectionHeader title="PENGATURAN" />
        <Card>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuRow, idx !== menuItems.length - 1 && styles.menuRowBorder]}
              onPress={() => Alert.alert(item.label, "Fitur ini akan segera tersedia.")}
            >
              <Ionicons name={item.icon} size={22} color={COLORS.primaryGreen} style={{ marginRight: 14 }} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textGray} />
            </TouchableOpacity>
          ))}
        </Card>

        <OutlineButton
          title="Keluar Akun"
          icon="log-out-outline"
          style={{ marginTop: 25, borderColor: COLORS.gradeD }}
          onPress={handleLogout}
        />

        <OutlineButton
          title="Keluar Aplikasi"
          icon="close-circle-outline"
          style={{ marginTop: 15, borderColor: COLORS.gradeD }}
          onPress={handleExitApp}
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
  profileCard: {
    alignItems: "center",
    paddingVertical: 25,
    marginBottom: 20
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12
  },
  profileAvatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white
  },
  profileName: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 4
  },
  profileRole: {
    fontSize: 13,
    color: COLORS.textGray
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 14,
    marginHorizontal: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textGray,
    fontWeight: "700",
    marginBottom: 10
  },
  statValue: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.textDark
  },
  statUnit: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textDark
  }
});
