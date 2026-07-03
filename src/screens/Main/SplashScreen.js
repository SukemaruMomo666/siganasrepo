import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../theme/Theme';

export default function SplashScreen({ navigation }) {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(12)).current;
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(textTranslate, { toValue: 0, duration: 400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      ]),
      Animated.timing(barWidth, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.splashContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryGreen} />
      <View style={styles.splashCenter}>
        <Animated.View
          style={[
            styles.splashLogoWrap,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
        >
          <MaterialCommunityIcons name="fruit-pineapple" size={64} color={COLORS.primaryYellow} />
        </Animated.View>

        <Animated.View style={{ opacity: textOpacity, transform: [{ translateY: textTranslate }] }}>
          <Text style={styles.splashTitle}>SiGanas</Text>
          <Text style={styles.splashSubtitle}>Sistem Grading Nanas Subang</Text>
        </Animated.View>
      </View>

      <View style={styles.splashFooter}>
        <View style={styles.splashProgressTrack}>
          <Animated.View
            style={[
              styles.splashProgressFill,
              {
                width: barWidth.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
              },
            ]}
          />
        </View>
        <Text style={styles.splashFooterText}>Menyiapkan aplikasi untuk Anda...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: "space-between"
  },
  splashCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  splashLogoWrap: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },
  splashTitle: {
    fontSize: 40,
    fontWeight: "900",
    color: COLORS.white,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  splashSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    marginTop: 6,
  },
  splashFooter: {
    alignItems: "center",
    paddingBottom: 50,
    paddingHorizontal: 60
  },
  splashProgressTrack: {
    width: "100%",
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginBottom: 14,
  },
  splashProgressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: COLORS.primaryYellow
  },
  splashFooterText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)"
  },
});
