import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADE_INFO, FARM_LOCATION } from '../theme/Theme';

export function PrimaryButton({ title, onPress, icon, loading, disabled, style }) {
  return (
    <TouchableOpacity
      style={[styles.btnPrimary, (disabled || loading) && styles.btnDisabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.textDark} />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={20} color={COLORS.textDark} style={{ marginRight: 8 }} />}
          <Text style={styles.btnPrimaryText}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

export function OutlineButton({ title, onPress, icon, style }) {
  return (
    <TouchableOpacity style={[styles.btnOutline, style]} onPress={onPress} activeOpacity={0.8}>
      {icon && <Ionicons name={icon} size={20} color={COLORS.primaryGreen} style={{ marginRight: 8 }} />}
      <Text style={styles.btnOutlineText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function TextLinkButton({ title, onPress, color = COLORS.primaryGreen }) {
  return (
    <TouchableOpacity style={styles.btnTextOnly} onPress={onPress}>
      <Text style={[styles.btnTextOnlyText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel ? (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function EmptyState({ icon = "leaf-outline", title, subtitle }) {
  return (
    <View style={styles.emptyState}>
      <Ionicons name={icon} size={42} color={COLORS.textGray} />
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle ? <Text style={styles.emptySubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function TopBar({ title = "SiGanas", onMenuPress, onBackPress, initial = "U" }) {
  return (
    <View style={styles.topBar}>
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="arrow-back" size={26} color={COLORS.primaryGreen} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onMenuPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="menu" size={30} color={COLORS.primaryGreen} />
        </TouchableOpacity>
      )}
      <Text style={styles.topBarTitle}>{title}</Text>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
    </View>
  );
}

export function DestinationBadge({ grade, showDesc = true }) {
  const info = GRADE_INFO[grade];
  return (
    <View style={[styles.destCard, { borderLeftColor: info.color }]}>
      <View style={[styles.destIconWrap, { backgroundColor: info.color }]}>
        <Ionicons name={info.tujuanIcon} size={22} color={COLORS.white} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.destLabel}>TUJUAN DISTRIBUSI</Text>
        <Text style={[styles.destValue, { color: info.color }]}>{info.tujuan}</Text>
        {showDesc && <Text style={styles.destDesc}>{info.tujuanDesc}</Text>}
      </View>
    </View>
  );
}

export function LocationCard({ compact = false }) {
  return (
    <Card style={{ marginBottom: compact ? 0 : 18 }}>
      <View style={styles.locHeaderRow}>
        <Ionicons name="location" size={18} color={COLORS.primaryGreen} />
        <Text style={styles.cardTitleSmall}>  Lokasi Panen (Asal Buah)</Text>
      </View>
      <Text style={styles.locFarmName}>{FARM_LOCATION.kebun}</Text>
      <Text style={styles.locAddress}>
        {FARM_LOCATION.desa}, {FARM_LOCATION.kecamatan}
        {"\n"}
        {FARM_LOCATION.kabupaten}, {FARM_LOCATION.provinsi}
      </Text>
      <View style={styles.locMetaRow}>
        <View style={styles.locMetaItem}>
          <Ionicons name="triangle-outline" size={14} color={COLORS.textGray} />
          <Text style={styles.locMetaText}>{FARM_LOCATION.ketinggian}</Text>
        </View>
        <View style={styles.locMetaItem}>
          <Ionicons name="navigate-outline" size={14} color={COLORS.textGray} />
          <Text style={styles.locMetaText}>{FARM_LOCATION.koordinat}</Text>
        </View>
      </View>
      {!compact && (
        <Text style={styles.locFootnote}>
          Data lokasi ini ikut tersimpan dalam QR Code agar dapat dilacak oleh buyer, eksportir, atau supermarket.
        </Text>
      )}
    </Card>
  );
}

export function GradeLegend() {
  return (
    <Card>
      <Text style={styles.cardTitleSmall}>Panduan Grade & Tujuan Jual</Text>
      {Object.keys(GRADE_INFO).map((g) => {
        const info = GRADE_INFO[g];
        return (
          <View key={g} style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: info.color }]}>
              <Text style={styles.legendDotText}>{g}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.legendTitle}>{info.tujuan}</Text>
              <Text style={styles.legendDesc}>{info.tujuanDesc}</Text>
            </View>
          </View>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  // Buttons
  btnPrimary: {
    backgroundColor: COLORS.primaryYellow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 14,
    width: '100%',
    elevation: 2,
    shadowColor: COLORS.primaryYellow,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  btnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 14,
    width: '100%',
    borderWidth: 1.5,
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.white,
  },
  btnOutlineText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryGreen,
  },
  btnTextOnly: {
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
  },
  btnTextOnlyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardTitleSmall: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 12,
  },
  // TopBar
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primaryGreen,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  // Section Header
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textGray,
    letterSpacing: 1,
  },
  sectionAction: {
    fontSize: 13,
    color: COLORS.primaryGreen,
    fontWeight: 'bold',
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 6,
    textAlign: 'center',
  },
  // Destination Badge
  destCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 5,
    padding: 16,
    marginBottom: 18,
  },
  destIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  destLabel: {
    fontSize: 10,
    color: COLORS.textGray,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  destValue: {
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.3,
    marginBottom: 3,
  },
  destDesc: {
    fontSize: 12,
    color: COLORS.textGray,
    lineHeight: 17,
  },
  // Location Card
  locHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  locFarmName: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  locAddress: {
    fontSize: 13,
    color: COLORS.textGray,
    lineHeight: 19,
    marginBottom: 12,
  },
  locMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  locMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bgLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 6,
  },
  locMetaText: {
    fontSize: 11,
    color: COLORS.textDark,
    fontWeight: "700",
    marginLeft: 5,
  },
  locFootnote: {
    fontSize: 11,
    color: COLORS.textGray,
    marginTop: 10,
    fontStyle: "italic",
    lineHeight: 15,
  },
  // Grade Legend
  legendRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  legendDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  legendDotText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "900",
  },
  legendTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  legendDesc: {
    fontSize: 12,
    color: COLORS.textGray,
    lineHeight: 16,
  },
});
