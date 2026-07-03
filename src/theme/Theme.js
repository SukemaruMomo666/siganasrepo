export const COLORS = {
  primaryGreen: "#0A5C36",
  primaryYellow: "#FFC107",
  bgLight: "#F7FAFC",
  textDark: "#2D3748",
  textGray: "#718096",
  white: "#FFFFFF",
  border: "#EDF2F7",
  gradeA: "#0A5C36", // Hijau Tua - Grade A (Terbaik)
  gradeB: "#00B5D8", // Biru Muda/Cyan - Grade B
  gradeC: "#FFC107", // Kuning - Grade C
  gradeD: "#E53E3E", // Merah - Grade D (Reject)
  overlay: "rgba(0,0,0,0.55)",
};

export const GRADE_INFO = {
  A: {
    color: COLORS.gradeA,
    price: 3500,
    label: "Grade A - Premium",
    desc: "Ukuran besar, warna merata, tanpa cacat. Layak ekspor.",
    tujuan: "LAYAK EKSPOR",
    tujuanIcon: "airplane-outline",
    tujuanDesc: "Memenuhi standar mutu untuk dikirim ke buyer luar negeri. QR akan dipindai oleh pihak eksportir/bea cukai saat penerimaan barang.",
  },
  B: {
    color: COLORS.gradeB,
    price: 3000,
    label: "Grade B - Standar",
    desc: "Ukuran sedang, sedikit variasi warna. Layak pasar modern.",
    tujuan: "SUPERMARKET / RITEL MODERN",
    tujuanIcon: "storefront-outline",
    tujuanDesc: "Memenuhi standar mutu untuk dipasok ke supermarket dan toko ritel modern dalam negeri.",
  },
  C: {
    color: COLORS.gradeC,
    price: 2200,
    label: "Grade C - Ekonomis",
    desc: "Ukuran kecil atau warna belum merata.",
    tujuan: "JUAL PASAR TRADISIONAL",
    tujuanIcon: "basket-outline",
    tujuanDesc: "Cocok dijual di pasar tradisional/lokal atau untuk kebutuhan olahan rumahan.",
  },
  D: {
    color: COLORS.gradeD,
    price: 0,
    label: "Grade D - Reject",
    desc: "Ada cacat/busuk. Tidak disarankan untuk dijual segar.",
    tujuan: "REJECT - TIDAK DIJUAL SEGAR",
    tujuanIcon: "close-circle-outline",
    tujuanDesc: "Tidak layak jual segar. Hanya disarankan untuk olahan (keripik/selai) atau dipisahkan dari batch layak jual.",
  },
};

export const FARM_LOCATION = {
  kebun: "Kebun Nanas Blok C - Cijambe",
  desa: "Desa Cijambe",
  kecamatan: "Kecamatan Cijambe",
  kabupaten: "Kabupaten Subang",
  provinsi: "Jawa Barat, Indonesia",
  ketinggian: "550 mdpl",
  koordinat: "-6.6512, 107.7891",
  kelompokTani: "Koperasi Tani Subang Makmur",
};

export function getSapaan() {
  const jam = new Date().getHours();
  if (jam < 11) return "Selamat pagi";
  if (jam < 15) return "Selamat siang";
  if (jam < 18) return "Selamat sore";
  return "Selamat malam";
}
