import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/Theme';
import { PrimaryButton, TextLinkButton } from '../../components/SharedComponents';
import { useSession } from '../../store/SessionContext';

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [torchOn, setTorchOn] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { session, incrementScanCount } = useSession();

  if (!permission) return <View style={{ flex: 1, backgroundColor: "#000" }} />;

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", padding: 30 }]}>
        <Ionicons name="camera-outline" size={56} color={COLORS.primaryGreen} style={{ alignSelf: "center", marginBottom: 20 }} />
        <Text style={{ textAlign: "center", marginBottom: 8, fontSize: 18, fontWeight: "700", color: COLORS.textDark }}>
          Akses Kamera Diperlukan
        </Text>
        <Text style={{ textAlign: "center", marginBottom: 25, fontSize: 15, color: COLORS.textGray }}>
          SiGanas membutuhkan kamera untuk memindai dan menilai mutu buah nanas secara otomatis.
        </Text>
        <PrimaryButton title="Beri Izin Kamera" onPress={requestPermission} icon="camera" />
        <TextLinkButton title="Kembali" onPress={() => navigation.goBack()} color={COLORS.textGray} />
      </SafeAreaView>
    );
  }

  const handleCapture = () => {
    if (session?.targetAmount > 0 && session.scanCount >= session.targetAmount) {
      Alert.alert(
        "Sesi Selesai",
        `Target jumlah buah (${session.targetAmount}) sudah terpenuhi!`,
        [{ text: "Ke Keranjang", onPress: () => navigation.navigate("CartSummary") }]
      );
      return;
    }

    setIsScanning(true);
    // Simulasi proses analisis AI (di produksi: panggil model/endpoint grading)
    setTimeout(() => {
      setIsScanning(false);
      incrementScanCount();
      
      const grades = ["A", "B", "C", "D"];
      const randomGrade = grades[Math.floor(Math.random() * grades.length)];
      
      navigation.navigate("Result", {
        grade: randomGrade,
        confidence: Math.floor(Math.random() * (99 - 80 + 1) + 80),
        diameter: parseFloat((Math.random() * (15 - 9) + 9).toFixed(1)),
        height: parseFloat((Math.random() * (22 - 12) + 12).toFixed(1)),
        weight: parseFloat((Math.random() * (2.5 - 0.8) + 0.8).toFixed(1)),
        notes: ["Warna kulit " + (Math.random() > 0.5 ? "merata" : "kurang merata"), "Kondisi fisik buah " + (randomGrade === 'A' || randomGrade === 'B' ? "baik" : "cukup baik")],
      });
    }, 1600);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" />
      <CameraView style={StyleSheet.absoluteFillObject} facing="back" enableTorch={torchOn} />
      
      <SafeAreaView style={styles.camHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.camIconBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="close" size={22} color={COLORS.white} />
          <Text style={styles.camTextBtn}>KEMBALI</Text>
        </TouchableOpacity>
        <Text style={styles.camTextCenter}>Arahkan Kamera ke Buah</Text>
        <TouchableOpacity onPress={() => setTorchOn(!torchOn)} style={styles.camIconBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name={torchOn ? "flash" : "flash-outline"} size={22} color={torchOn ? COLORS.primaryYellow : COLORS.white} />
          <Text style={styles.camTextBtn}>{torchOn ? "MATIKAN" : "FLASH"}</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {session?.isActive && (
        <View style={styles.sessionBanner}>
          <Text style={styles.sessionBannerText}>
            Pengepul: {session.collectorName}
          </Text>
          <View style={styles.scanCountBadge}>
            <Text style={styles.scanCountText}>
              Difoto: {session.scanCount} {session.targetAmount > 0 ? `/ ${session.targetAmount}` : ''}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.camFocusFrame}>
        <View style={[styles.camCorner, styles.cornerTL]} />
        <View style={[styles.camCorner, styles.cornerTR]} />
        <View style={[styles.camCorner, styles.cornerBL]} />
        <View style={[styles.camCorner, styles.cornerBR]} />
      </View>
      <Text style={styles.camGuideText}>Posisikan 1 buah nanas pas di tengah kotak kuning</Text>

      {showTips && (
        <View style={styles.tipsPanel}>
          <Text style={styles.tipsTitle}>Tips Foto yang Baik & Benar</Text>
          <Text style={styles.tipsItem}>1. Posisikan seluruh buah masuk ke dalam kotak kuning</Text>
          <Text style={styles.tipsItem}>2. Jaga jarak HP ke nanas sekitar ± 30 cm</Text>
          <Text style={styles.tipsItem}>3. Hindari membelakangi cahaya (backlight)</Text>
          <Text style={styles.tipsItem}>4. Tahan HP tetap stabil saat tombol dipindai</Text>
        </View>
      )}

      <View style={styles.camFooter}>
        <TouchableOpacity onPress={() => setShowTips(!showTips)} style={styles.tipsToggle}>
          <Ionicons name="bulb-outline" size={16} color={COLORS.primaryYellow} />
          <Text style={styles.tipsToggleText}>{showTips ? "Sembunyikan Tips" : "Lihat Tips Pemindaian"}</Text>
        </TouchableOpacity>
        <Text style={styles.camVersion}>SIGANAS AI ENGINE V1.0</Text>
        <PrimaryButton
          title={
            (session?.targetAmount > 0 && session?.scanCount >= session?.targetAmount) 
              ? "Target Tercapai" 
              : isScanning ? "Menganalisis..." : "Pindai & Nilai Buah"
          }
          icon={(session?.targetAmount > 0 && session?.scanCount >= session?.targetAmount) ? "checkmark-circle" : (isScanning ? undefined : "scan-circle-outline")}
          onPress={handleCapture}
          loading={isScanning}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight
  },
  camHeader: {
    position: "absolute",
    width: "100%",
    top: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20
  },
  camIconBtn: {
    alignItems: "center",
    width: 60
  },
  camTextBtn: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 4
  },
  camTextCenter: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700"
  },
  sessionBanner: {
    position: "absolute",
    top: 80,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 9,
    alignItems: 'center'
  },
  sessionBannerText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4
  },
  scanCountBadge: {
    backgroundColor: COLORS.primaryYellow,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  scanCountText: {
    color: COLORS.textDark,
    fontSize: 12,
    fontWeight: "900"
  },
  camFocusFrame: {
    position: "absolute",
    top: "30%",
    left: "15%",
    right: "15%",
    bottom: "35%",
    borderWidth: 0,
  },
  camCorner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: COLORS.primaryYellow,
    borderWidth: 4,
  },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  camGuideText: {
    position: "absolute",
    top: "24%",
    width: "100%",
    textAlign: "center",
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4
  },
  tipsPanel: {
    position: "absolute",
    bottom: 170,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.85)",
    padding: 18,
    borderRadius: 14,
    zIndex: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  tipsTitle: {
    color: COLORS.primaryYellow,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8
  },
  tipsItem: {
    color: COLORS.white,
    fontSize: 12,
    marginBottom: 4
  },
  camFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
    padding: 20,
    paddingBottom: 35,
    alignItems: "center"
  },
  tipsToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  tipsToggleText: {
    color: COLORS.primaryYellow,
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6
  },
  camVersion: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 15,
    letterSpacing: 1
  }
});
