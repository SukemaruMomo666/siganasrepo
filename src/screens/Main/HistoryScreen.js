import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADE_INFO } from '../../theme/Theme';
import { TopBar, EmptyState } from '../../components/SharedComponents';

export default function HistoryScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [selectedHistory, setSelectedHistory] = useState(null);

  const historyData = [
    { id: "#A201", date: "12 Mei 2026", time: "14:30", total: "50 Buah", status: "TERSINKRON", grade: "A", collectorName: "Budi Santoso" },
    { id: "#A202", date: "13 Mei 2026", time: "09:15", total: "75 Buah", status: "PENDING", grade: "B", collectorName: "Ahmad Riyadi" },
    { id: "#A203", date: "14 Mei 2026", time: "16:45", total: "30 Buah", status: "TERSINKRON", grade: "C", collectorName: "Siti Aminah" },
  ];

  const filters = ["Semua", "TERSINKRON", "PENDING"];

  const filteredData = useMemo(() => {
    return historyData.filter((item) => {
      const matchFilter = filter === "Semua" || item.status === filter;
      const matchSearch = item.id.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [search, filter]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onMenuPress={() => {}} />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.pageHeading}>Riwayat Panen</Text>

        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color={COLORS.textGray} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari nomor batch (contoh: A201)"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredData.length === 0 ? (
          <EmptyState icon="file-tray-outline" title="Tidak ada data" subtitle="Coba kata kunci atau filter lain." />
        ) : (
          filteredData.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.historyCard, { borderLeftColor: GRADE_INFO[item.grade].color }]} onPress={() => setSelectedHistory(item)}>
              <View style={{ flex: 1 }}>
                <Text style={styles.historyId}>Batch {item.id}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyTotal}>{item.total}</Text>
                <View style={styles.historyDestRow}>
                  <Ionicons name={GRADE_INFO[item.grade].tujuanIcon} size={12} color={GRADE_INFO[item.grade].color} />
                  <Text style={[styles.historyDestText, { color: GRADE_INFO[item.grade].color }]}>
                    {GRADE_INFO[item.grade].tujuan}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.badgeStatus,
                  { backgroundColor: item.status === "TERSINKRON" ? COLORS.primaryGreen : COLORS.textGray },
                ]}
              >
                <Text style={styles.badgeStatusText}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal visible={!!selectedHistory} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setSelectedHistory(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {selectedHistory && (
                  <>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Detail Batch {selectedHistory.id}</Text>
                      <TouchableOpacity onPress={() => setSelectedHistory(null)}>
                        <Ionicons name="close" size={24} color={COLORS.textGray} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                      <Text style={styles.modalLabel}>Nama Pengepul</Text>
                      <Text style={styles.modalValue}>{selectedHistory.collectorName}</Text>

                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1}}>
                          <Text style={styles.modalLabel}>Tanggal Panen</Text>
                          <Text style={styles.modalValue}>{selectedHistory.date}</Text>
                        </View>
                        <View style={{flex: 1}}>
                          <Text style={styles.modalLabel}>Waktu</Text>
                          <Text style={styles.modalValue}>{selectedHistory.time}</Text>
                        </View>
                      </View>
                      
                      <Text style={styles.modalLabel}>Status Sinkronisasi</Text>
                      <Text style={[styles.modalValue, { color: selectedHistory.status === "TERSINKRON" ? COLORS.primaryGreen : COLORS.textDark }]}>{selectedHistory.status}</Text>
                      
                      <Text style={styles.modalLabel}>Mayoritas Grade</Text>
                      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
                        <View style={[styles.badgeStatus, { backgroundColor: GRADE_INFO[selectedHistory.grade].color, marginRight: 8 }]}>
                           <Text style={styles.badgeStatusText}>Grade {selectedHistory.grade}</Text>
                        </View>
                        <Text style={styles.historyDestText}>{GRADE_INFO[selectedHistory.grade].tujuan}</Text>
                      </View>

                      <Text style={styles.modalLabel}>Total Keseluruhan</Text>
                      <Text style={[styles.modalValue, {fontSize: 18, fontWeight: '900'}]}>{selectedHistory.total}</Text>
                    </View>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight
  },
  pageHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 20
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 20
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10
  },
  filterChipActive: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textGray
  },
  filterChipTextActive: {
    color: COLORS.white
  },
  historyCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 5,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
    justifyContent: "space-between"
  },
  historyId: {
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.textDark,
    marginBottom: 2
  },
  historyDate: {
    fontSize: 12,
    color: COLORS.textGray,
    marginBottom: 8
  },
  historyTotal: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 4
  },
  historyDestRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  historyDestText: {
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 4,
    letterSpacing: 0.5
  },
  badgeStatus: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12
  },
  badgeStatusText: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.white,
    letterSpacing: 0.5
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: '100%',
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark
  },
  modalBody: {
    
  },
  modalLabel: {
    fontSize: 12,
    color: COLORS.textGray,
    marginBottom: 4,
    fontWeight: '600'
  },
  modalValue: {
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: '700',
    marginBottom: 16
  }
});
