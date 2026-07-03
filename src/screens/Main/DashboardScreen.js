import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADE_INFO, FARM_LOCATION, getSapaan } from '../../theme/Theme';
import { TopBar, Card, SectionHeader } from '../../components/SharedComponents';
import { useSession } from '../../store/SessionContext';

export default function DashboardScreen({ navigation }) {
  const { startSession, currentUser } = useSession();

  const handleStartGrading = () => {
    startSession(currentUser?.username || "Petani", 0);
    navigation.navigate("Scanner");
  };

  const activityData = [
    { id: "1", label: "Batch #A204 dipindai", detail: "12 buah - Grade A", time: "10 menit lalu", grade: "A" },
    { id: "2", label: "Batch #A203 tersinkron", detail: "30 buah - Campuran", time: "1 jam lalu", grade: "B" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <TopBar onMenuPress={() => Alert.alert("Menu", "Menu navigasi tambahan akan tersedia di sini.")} />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.greetingText}>{getSapaan()}, Pak Budi 👋</Text>
        <Text style={styles.greetingSub}>Berikut ringkasan aktivitas panen nanas Anda hari ini.</Text>

        {/* Tombol Utama - dibuat besar agar mudah ditekan petani */}
        <TouchableOpacity style={styles.cardMulaiGrading} onPress={handleStartGrading} activeOpacity={0.85}>
          <View style={styles.cardMulaiIconWrap}>
            <Ionicons name="scan" size={30} color={COLORS.textDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardMulaiTitle}>Mulai Grading Sekarang</Text>
            <Text style={styles.cardMulaiSub}>Ketuk untuk memulai sesi panen</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textDark} />
        </TouchableOpacity>

        {/* Info Statistik */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>SCAN HARI INI</Text>
            <Text style={styles.statValue}>150</Text>
            <Text style={styles.statUnit}>buah</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>BERAT TOTAL</Text>
            <Text style={styles.statValue}>210</Text>
            <Text style={styles.statUnit}>kg</Text>
          </View>
        </View>

        <Card style={{ marginBottom: 25 }}>
          <View style={styles.statusRow}>
            <View style={styles.statusBadge}>
              <View style={styles.dotActive} />
              <Text style={styles.statStatus}>Perangkat Terhubung</Text>
            </View>
            <Text style={styles.syncText}>Sinkron terakhir: 5 menit lalu</Text>
          </View>
          <View style={styles.dashLocRow}>
            <Ionicons name="location-outline" size={13} color={COLORS.textGray} />
            <Text style={styles.dashLocText}>  Kebun aktif: {FARM_LOCATION.kebun}</Text>
          </View>
        </Card>

        {/* Aktivitas Terakhir */}
        <SectionHeader title="AKTIVITAS TERAKHIR" actionLabel="Lihat Semua" onAction={() => navigation.navigate("Riwayat")} />
        {activityData.map((item) => (
          <Card key={item.id} style={styles.activityRow}>
            <View style={[styles.activityDot, { backgroundColor: GRADE_INFO[item.grade].color }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.activityLabel}>{item.label}</Text>
              <Text style={styles.activityDetail}>{item.detail}</Text>
            </View>
            <Text style={styles.activityTime}>{item.time}</Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 4
  },
  greetingSub: {
    fontSize: 13,
    color: COLORS.textGray,
    marginBottom: 20
  },
  cardMulaiGrading: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryYellow,
    padding: 22,
    borderRadius: 16,
    marginBottom: 25,
    elevation: 4,
    shadowColor: COLORS.primaryYellow,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  cardMulaiIconWrap: {
    backgroundColor: "rgba(255,255,255,0.4)",
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardMulaiTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 4
  },
  cardMulaiSub: {
    fontSize: 13,
    color: COLORS.textDark,
    opacity: 0.8
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
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center"
  },
  statStatus: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.primaryGreen,
    marginLeft: 6
  },
  syncText: {
    fontSize: 11,
    color: COLORS.textGray
  },
  dashLocRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  dashLocText: {
    fontSize: 11,
    color: COLORS.textGray
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primaryGreen
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 10
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12
  },
  activityLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 2
  },
  activityDetail: {
    fontSize: 12,
    color: COLORS.textGray
  },
  activityTime: {
    fontSize: 11,
    color: COLORS.textGray
  }
});
