import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, GRADE_INFO, FARM_LOCATION } from '../../theme/Theme';
import { useSession } from '../../store/SessionContext';
import QRCode from 'react-native-qrcode-svg';

export default function GradingSummaryScreen({ navigation }) {
  const { session, endSession } = useSession();

  const scannedItems = session?.scannedItems || [];
  const totalBuah = session.scannedItems?.length || 0;
  const totalBerat = session.scannedItems?.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0) || 0;
  const totalNilai = session.scannedItems?.reduce((sum, item) => sum + ((parseFloat(item.weight) || 0) * (GRADE_INFO[item.grade]?.price || 0)), 0) || 0;
  const boxes = session?.boxes?.filter(b => b.items.length > 0) || [];

  const handleFinish = () => {
    endSession();
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#125b42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SiGanas</Text>
        <View style={styles.userProfile}>
          <Text style={styles.userProfileText}>{session?.collectorName?.charAt(0) || 'U'}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Ringkasan Sesi Grading</Text>
          <Text style={styles.pageSubtitle}>{totalBuah} buah terpindai - dibagi ke {boxes.length} box</Text>
          <Text style={{fontSize: 12, color: COLORS.textGray, marginTop: 4}}>Pengepul: {session?.collectorName} | Waktu Mulai: {session?.startTime}</Text>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <MaterialCommunityIcons name="basket-outline" size={20} color="#125b42" style={styles.summaryIcon} />
            <Text style={styles.summaryLabel}>Total Buah:</Text>
            <Text style={styles.summaryValue}>{totalBuah} Butir</Text>
          </View>
          <View style={styles.summaryRow}>
            <MaterialCommunityIcons name="scale" size={20} color="#125b42" style={styles.summaryIcon} />
            <Text style={styles.summaryLabel}>Estimasi Berat:</Text>
            <Text style={styles.summaryValue}>{totalBerat.toFixed(1)} Kg</Text>
          </View>
          <View style={styles.summaryRow}>
            <MaterialCommunityIcons name="cash" size={20} color="#125b42" style={styles.summaryIcon} />
            <Text style={styles.summaryLabel}>Estimasi Nilai:</Text>
            <Text style={styles.summaryValue}>Rp {Math.round(totalNilai).toLocaleString('id-ID')}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>LABEL QR PER BOX</Text>

        {boxes.map(box => {
          const info = GRADE_INFO[box.grade];
          const boxWeight = box.items.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
          const boxNilai = box.items.reduce((s, i) => s + ((i.weight || 1.4) * info.price), 0);
          const qrData = JSON.stringify({ id: box.id, grade: box.grade, items: box.items.length, weight: boxWeight.toFixed(1) });

          return (
            <View key={box.id} style={styles.boxCard}>
              <View style={styles.boxHeader}>
                <View style={[styles.gradeBadge, { backgroundColor: info.color }]}>
                  <Text style={styles.gradeBadgeText}>{box.grade}</Text>
                </View>
                <View>
                  <Text style={styles.boxTitle}>{box.id}</Text>
                  <Text style={[styles.boxSubtitle, { color: info.color }]}>Grade {box.grade} - {info.tujuan.toUpperCase()}</Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{box.items.length}</Text>
                  <Text style={styles.statLabel}>Buah</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{boxWeight.toFixed(1)}</Text>
                  <Text style={styles.statLabel}>Kg</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>Rp {Math.round(boxNilai).toLocaleString('id-ID')}</Text>
                  <Text style={styles.statLabel}>Est. Nilai</Text>
                </View>
              </View>

              <View style={styles.qrContainer}>
                <View style={[styles.qrIconWrapper, { borderColor: info.color, padding: 4 }]}>
                  <QRCode value={qrData} size={48} color={info.color} backgroundColor="transparent" />
                </View>
                <View style={styles.qrTextContainer}>
                  <Text style={styles.qrTitle}>QR Label {box.id}</Text>
                  <Text style={styles.qrDescription}>
                    Berisi kode box, Grade {box.grade}, {box.items.length} buah ({boxWeight.toFixed(1)} kg), tujuan {info.tujuan.toLowerCase()}, dan lokasi kebun {FARM_LOCATION.kebun}.
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        {/* Location Card */}
        <View style={[styles.boxCard, { marginBottom: 40 }]}>
          <View style={styles.locationHeader}>
            <Ionicons name="location" size={20} color="#125b42" style={{ marginRight: 8 }} />
            <Text style={styles.locationTitle}>Lokasi Panen (Asal Buah)</Text>
          </View>
          <Text style={styles.locationName}>{FARM_LOCATION.kebun}</Text>
          <Text style={styles.locationAddress}>
            {FARM_LOCATION.alamat}
          </Text>
        </View>

      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.printButton}>
          <Ionicons name="print-outline" size={20} color="#125b42" />
          <Text style={styles.printButtonText}>Cetak Semua Label QR ({boxes.length})</Text>
        </TouchableOpacity>
        
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>Tutup & Simpan Riwayat Sesi</Text>
            <Ionicons name="checkmark-circle" size={18} color="#fff" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#125b42' },
  userProfile: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#125b42', alignItems: 'center', justifyContent: 'center' },
  userProfileText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  titleSection: { alignItems: 'center', marginBottom: 20, marginTop: 10 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50', marginBottom: 4 },
  pageSubtitle: { fontSize: 14, color: '#7F8C8D' },
  summaryCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  summaryIcon: { marginRight: 12 },
  summaryLabel: { fontSize: 16, color: '#34495E', fontWeight: '500', marginRight: 6 },
  summaryValue: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#7F8C8D', letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
  boxCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  boxHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  gradeBadge: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  gradeBadgeText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  boxTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 2 },
  boxSubtitle: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', backgroundColor: '#F8F9FA', borderRadius: 12, paddingVertical: 12, marginBottom: 16 },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 2 },
  statLabel: { fontSize: 12, color: '#7F8C8D' },
  qrContainer: { flexDirection: 'row', alignItems: 'center' },
  qrIconWrapper: { width: 70, height: 70, borderWidth: 2, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  qrTextContainer: { flex: 1 },
  qrTitle: { fontSize: 14, fontWeight: 'bold', color: '#2C3E50', marginBottom: 4 },
  qrDescription: { fontSize: 12, color: '#7F8C8D', lineHeight: 18 },
  locationHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  locationTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  locationName: { fontSize: 16, fontWeight: '700', color: '#2C3E50', marginBottom: 6 },
  locationAddress: { fontSize: 14, color: '#7F8C8D', lineHeight: 20 },
  bottomActions: { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  printButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8F5E9', paddingVertical: 14, borderRadius: 12, marginBottom: 12 },
  printButtonText: { color: '#125b42', fontWeight: 'bold', fontSize: 15, marginLeft: 8 },
  actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  finishButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#125b42', paddingVertical: 14, borderRadius: 12, marginLeft: 6 },
  finishButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});
