import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADE_INFO } from '../../theme/Theme';
import { TopBar, Card, DestinationBadge, LocationCard, PrimaryButton, OutlineButton, TextLinkButton } from '../../components/SharedComponents';
import { useSession } from '../../store/SessionContext';
import QRCode from 'react-native-qrcode-svg';

export default function ResultScreen({ navigation, route }) {
  const result = route?.params ?? {
    grade: "A",
    confidence: 94,
    diameter: 12.4,
    height: 18.2,
    weight: 1.4,
    notes: ["Warna kulit merata", "Tidak ada tanda cacat"],
  };
  const info = GRADE_INFO[result.grade];
  const estimatedTotal = Math.round(info.price * result.weight);
  
  const { session, addScannedItem, assignToBox } = useSession();
  
  // Generate unique ID just for display here (persisted on save)
  const uniqueId = React.useMemo(() => "PN-" + Date.now().toString(36).toUpperCase(), []);
  const qrData = JSON.stringify({ id: uniqueId, grade: result.grade, weight: result.weight });

  const handleSave = (destination = 'cart') => {
    if (!session?.isActive) {
      navigation.navigate("CartSummary");
      return;
    }

    const itemToSave = { ...result, id: uniqueId, timestamp: new Date().toISOString() };
    addScannedItem(itemToSave);

    const activeBox = session.boxes.find(b => b.grade === result.grade && !b.isClosed);
    
    if (activeBox) {
      assignToBox(itemToSave, activeBox.id);
      
      if (destination === 'scan') {
         navigation.navigate("Scanner");
      } else {
         navigation.navigate("CartSummary");
      }
    } else {
      Alert.alert("Error", "Box aktif tidak ditemukan.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.pageHeading}>Hasil Analisis</Text>

        <View style={[styles.gradeHighlightBox, { backgroundColor: info.color }]}>
          <Ionicons name="checkmark-circle" size={32} color={COLORS.white} style={{ marginBottom: 6 }} />
          <Text style={styles.gradeHighlightText}>GRADE {result.grade}</Text>
          <Text style={styles.gradeHighlightSub}>{info.label}</Text>
          <View style={styles.confidencePill}>
            <Text style={styles.confidencePillText}>Tingkat keyakinan AI: {result.confidence}%</Text>
          </View>
        </View>

        <DestinationBadge grade={result.grade} />

        <LocationCard />

        <Card style={{ marginBottom: 18 }}>
          <Text style={styles.cardTitleSmall}>Detail Fisik Buah</Text>
          <View style={styles.detailRow}>
            <DetailItem label="Diameter" value={`${result.diameter} cm`} icon="resize-outline" />
            <DetailItem label="Tinggi" value={`${result.height} cm`} icon="swap-vertical-outline" />
            <DetailItem label="Berat Est." value={`${result.weight} kg`} icon="scale-outline" />
          </View>
        </Card>

        <Card style={{ marginBottom: 18 }}>
          <Text style={styles.cardTitleSmall}>Catatan Kualitas</Text>
          {result.notes.map((note, idx) => (
            <View key={idx} style={styles.noteRow}>
              <Ionicons name="ellipse" size={6} color={COLORS.primaryGreen} style={{ marginTop: 7, marginRight: 8 }} />
              <Text style={styles.noteText}>{note}</Text>
            </View>
          ))}
          <Text style={[styles.noteText, { marginTop: 6, color: COLORS.textGray, fontStyle: "italic" }]}>{info.desc}</Text>
        </Card>

        <Card style={{ marginBottom: 22 }}>
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.labelSub}>HARGA ACUAN / KG</Text>
              <Text style={styles.priceValue}>Rp {info.price.toLocaleString("id-ID")}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.labelSub}>ESTIMASI NILAI</Text>
              <Text style={[styles.priceValue, { color: COLORS.primaryGreen }]}>Rp {estimatedTotal.toLocaleString("id-ID")}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.qrDisplayBox}>
          <QRCode 
            value={qrData}
            size={120}
            color={COLORS.primaryGreen}
            backgroundColor={COLORS.white}
          />
          <Text style={styles.qrReadyText}>QR UNIK: {uniqueId}</Text>
          <Text style={styles.qrSubText}>Berisi data grade, berat, & tujuan ({info.tujuan.toLowerCase()})</Text>
        </View>

        <PrimaryButton
          title="SIMPAN & PINDAI LAGI"
          icon="scan-outline"
          style={{ marginBottom: 12 }}
          onPress={() => handleSave('scan')}
        />
        <OutlineButton 
          title="SIMPAN & KE KERANJANG" 
          icon="basket-outline" 
          style={{ marginBottom: 10 }} 
          onPress={() => handleSave('cart')} 
        />
        <TextLinkButton
          title="Grade tidak sesuai? Koreksi manual"
          color={COLORS.textGray}
          onPress={() => Alert.alert("Koreksi Manual", "Fitur koreksi manual oleh petugas lapangan akan segera hadir.")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailItem({ label, value, icon }) {
  return (
    <View style={styles.detailItem}>
      <Ionicons name={icon} size={20} color={COLORS.primaryGreen} />
      <Text style={styles.detailValue}>{value}</Text>
      <Text style={styles.detailLabel}>{label}</Text>
    </View>
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
  gradeHighlightBox: {
    alignItems: "center",
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  gradeHighlightText: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.white,
    letterSpacing: 1
  },
  gradeHighlightSub: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
    marginBottom: 14
  },
  confidencePill: {
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  confidencePillText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.white
  },
  cardTitleSmall: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  detailItem: {
    alignItems: "center",
    flex: 1
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.textDark,
    marginTop: 8,
    marginBottom: 2
  },
  detailLabel: {
    fontSize: 11,
    color: COLORS.textGray,
    fontWeight: "600"
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  labelSub: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.textGray,
    letterSpacing: 0.5,
    marginBottom: 4
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.textDark
  },
  qrDisplayBox: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 25,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primaryGreen,
    borderStyle: "dashed",
    marginBottom: 25
  },
  qrReadyText: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.primaryGreen,
    marginTop: 12,
    marginBottom: 4,
    letterSpacing: 0.5
  },
  qrSubText: {
    fontSize: 12,
    color: COLORS.textGray,
    textAlign: "center"
  }
});
