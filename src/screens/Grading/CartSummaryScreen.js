import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADE_INFO } from '../../theme/Theme';
import { TopBar, Card, LocationCard, GradeLegend, PrimaryButton, TextLinkButton, OutlineButton } from '../../components/SharedComponents';
import { useSession } from '../../store/SessionContext';
import QRCode from 'react-native-qrcode-svg';

export default function CartSummaryScreen({ navigation, route }) {
  const { session, endSession, addNewBox } = useSession();
  
  const scannedItems = session?.scannedItems || [];
  
  const batch = ["A", "B", "C", "D"].map(grade => ({
    grade,
    count: scannedItems.filter(i => i.grade === grade).length
  }));

  const totalBuah = scannedItems.length;
  const totalBerat = scannedItems.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
  const totalNilai = scannedItems.reduce((sum, item) => sum + ((parseFloat(item.weight) || 0) * GRADE_INFO[item.grade].price), 0);

  const handlePrint = () => {
    Alert.alert("Cetak Label", "Semua label QR akan dicetak.");
  };

  const handleSelesai = () => {
    Alert.alert("Akhiri Sesi Grading?", "Apakah Anda yakin ingin menyelesaikan sesi ini? Data akan disimpan dan ringkasan akhir akan ditampilkan.", [
      { text: "Batal", style: "cancel" },
      { text: "Selesai", onPress: () => {
          endSession();
          navigation.navigate("GradingSummary"); // Asumsi ada screen ini yang sudah di-register
      }}
    ]);
  };

  const handleAddBox = (grade) => {
    addNewBox(grade);
    Alert.alert("Sukses", `Box baru untuk Grade ${grade} berhasil ditambahkan.`);
  };

  if (!session?.isActive) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Ionicons name="basket-outline" size={60} color={COLORS.textGray} />
        <Text style={{ marginTop: 20, fontSize: 16, color: COLORS.textGray }}>Tidak ada sesi aktif.</Text>
        <PrimaryButton title="Kembali ke Beranda" onPress={() => navigation.navigate("MainTabs")} style={{ marginTop: 20 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={[styles.pageHeading, { textAlign: "center", marginBottom: 6 }]}>Ringkasan Keranjang</Text>
        <Text style={[styles.greetingSub, { textAlign: "center", marginBottom: 25 }]}>
          Sesi {session.collectorName} - {totalBuah} buah terpindai
        </Text>

        <Card style={{ marginBottom: 20 }}>
          <Text style={styles.cardTitleSmall}>Distribusi Grade</Text>
          {batch.map((b) => {
            const pct = totalBuah === 0 ? 0 : Math.round((b.count / totalBuah) * 100);
            const info = GRADE_INFO[b.grade];
            return (
              <View key={b.grade} style={styles.gradeBarRow}>
                <View style={styles.gradeBarLabelRow}>
                  <Text style={styles.gradeBarLabel}>Grade {b.grade}</Text>
                  <View style={styles.gradeBarTagWrap}>
                    <Ionicons name={info.tujuanIcon} size={12} color={info.color} />
                    <Text style={[styles.gradeBarTag, { color: info.color }]}>{info.tujuan}</Text>
                  </View>
                </View>
                <View style={styles.gradeBarTrack}>
                  <View style={[styles.gradeBarFill, { width: `${pct}%`, backgroundColor: info.color }]} />
                </View>
                <Text style={styles.gradeBarCount}>{b.count} buah ({pct}%)</Text>
              </View>
            );
          })}
        </Card>

        <GradeLegend />

        <View style={styles.cartStats}>
          <View style={styles.cartStatItem}>
            <Ionicons name="basket-outline" size={22} color={COLORS.primaryGreen} />
            <Text style={styles.cartStatText}>Total Buah: {totalBuah} Butir</Text>
          </View>
          <View style={styles.cartStatItem}>
            <Ionicons name="scale-outline" size={22} color={COLORS.primaryGreen} />
            <Text style={styles.cartStatText}>Estimasi Berat: {totalBerat.toFixed(1)} Kg</Text>
          </View>
          <View style={styles.cartStatItem}>
            <Ionicons name="cash-outline" size={22} color={COLORS.primaryGreen} />
            <Text style={styles.cartStatText}>Estimasi Nilai: Rp {Math.round(totalNilai).toLocaleString("id-ID")}</Text>
          </View>
        </View>

        <LocationCard />

        <View style={styles.capacityManager}>
           <Text style={styles.cardTitleSmall}>Tambah Box Baru</Text>
           <Text style={{fontSize: 11, color: COLORS.textGray, marginBottom: 10}}>Bila box fisik di lapangan sudah terisi penuh, tambahkan box baru.</Text>
           <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {['A', 'B', 'C', 'D'].map(grade => (
                 <TouchableOpacity key={grade} style={styles.addBoxBtn} onPress={() => handleAddBox(grade)}>
                    <Text style={styles.addBoxBtnText}>+ Box {grade}</Text>
                 </TouchableOpacity>
              ))}
           </View>
        </View>

        <Text style={[styles.cardTitleSmall, { marginTop: 10, marginLeft: 4 }]}>Status Box & Label QR</Text>
        {session.boxes.map((box) => {
          const info = GRADE_INFO[box.grade];
          const isFull = box.isClosed;
          const boxWeight = box.items.reduce((s, i) => s + (parseFloat(i.weight) || 0), 0);
          const qrData = JSON.stringify({ id: box.id, grade: box.grade, items: box.items.length });

          return (
            <View key={box.id} style={[styles.boxCard, isFull && { borderColor: 'red', borderWidth: 1.5 }]}>
              <View style={styles.boxHeader}>
                <View style={[styles.gradeBadge, { backgroundColor: info.color }]}>
                  <Text style={styles.gradeBadgeText}>{box.grade}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.boxTitle}>{box.id}</Text>
                  <Text style={[styles.boxSubtitle, { color: info.color }]}>{info.tujuan}</Text>
                </View>
                <View style={[styles.capacityBadge, isFull ? {backgroundColor: COLORS.error || '#E53935'} : {backgroundColor: COLORS.primaryGreen}]}>
                   <Text style={styles.capacityText}>{isFull ? `Penuh (${box.items.length})` : `${box.items.length} Buah`}</Text>
                </View>
              </View>

              <View style={styles.qrContainer}>
                <View style={[styles.qrIconWrapper, { borderColor: info.color, padding: 4 }]}>
                  {box.items.length > 0 ? (
                    <QRCode value={qrData} size={48} color={info.color} backgroundColor="transparent" />
                  ) : (
                    <Ionicons name="qr-code-outline" size={32} color={COLORS.textGray} />
                  )}
                </View>
                <View style={styles.qrTextContainer}>
                  {isFull && <Text style={{color: 'red', fontSize: 11, fontWeight: 'bold', marginBottom: 2}}>BOX PENUH!</Text>}
                  <Text style={styles.qrTitle}>QR Label {box.id}</Text>
                  <Text style={styles.qrDescription}>
                    Berisi kode box, Grade {box.grade}, {box.items.length} buah ({boxWeight.toFixed(1)} kg).
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        <View style={styles.bottomActions}>
          <PrimaryButton 
            title={`CETAK SEMUA LABEL QR (${session.boxes.filter(b => b.items.length > 0).length})`} 
            icon="print-outline" 
            style={{ marginBottom: 12, marginTop: 10 }} 
            onPress={handlePrint} 
            disabled={totalBuah === 0}
          />
          
          <View style={styles.actionButtonsRow}>
            <OutlineButton 
              title="Pindai Lagi" 
              icon="scan-outline" 
              style={{ flex: 1, marginRight: 6 }} 
              onPress={() => navigation.navigate("Scanner")} 
            />
            
            <PrimaryButton 
              title="Selesai Sesi" 
              icon="checkmark-circle-outline" 
              style={{ flex: 1, marginLeft: 6 }} 
              onPress={handleSelesai} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgLight },
  pageHeading: { fontSize: 22, fontWeight: "bold", color: COLORS.textDark },
  greetingSub: { fontSize: 13, color: COLORS.textGray },
  cardTitleSmall: { fontSize: 14, fontWeight: "800", color: COLORS.textDark, marginBottom: 12 },
  gradeBarRow: { marginBottom: 14 },
  gradeBarLabelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  gradeBarLabel: { fontSize: 14, fontWeight: "bold", color: COLORS.textDark },
  gradeBarTagWrap: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.bgLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  gradeBarTag: { fontSize: 9, fontWeight: "bold", marginLeft: 4 },
  gradeBarTrack: { height: 8, backgroundColor: COLORS.border, borderRadius: 4, overflow: "hidden", marginBottom: 4 },
  gradeBarFill: { height: "100%", borderRadius: 4 },
  gradeBarCount: { fontSize: 11, color: COLORS.textGray, textAlign: "right" },
  cartStats: { backgroundColor: COLORS.white, padding: 18, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, marginBottom: 18 },
  cartStatItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  cartStatText: { fontSize: 14, fontWeight: "700", color: COLORS.textDark, marginLeft: 10 },
  capacityManager: { backgroundColor: COLORS.white, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, marginBottom: 20 },
  addBoxBtn: { backgroundColor: COLORS.bgLight, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginRight: 8, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  addBoxBtnText: { fontSize: 12, fontWeight: '600', color: COLORS.textDark },
  boxCard: { backgroundColor: COLORS.white, borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  boxHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  gradeBadge: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  gradeBadgeText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  boxTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 2 },
  boxSubtitle: { fontSize: 11, fontWeight: '700' },
  capacityBadge: { backgroundColor: COLORS.primaryGreen, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  capacityText: { color: COLORS.white, fontSize: 12, fontWeight: 'bold' },
  qrContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bgLight, padding: 12, borderRadius: 12 },
  qrIconWrapper: { width: 60, height: 60, borderWidth: 1.5, borderRadius: 10, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  qrTextContainer: { flex: 1 },
  qrTitle: { fontSize: 13, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 4 },
  qrDescription: { fontSize: 11, color: COLORS.textGray, lineHeight: 16 },
  bottomActions: { marginTop: 10 },
  actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-between' }
});
