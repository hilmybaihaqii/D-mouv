// File: app/(tabs)/index.tsx

import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/Colors';

// --- DATA DUMMY (Nanti ini datang dari backend) ---
const devices = [
  { id: '1', name: 'LED', icon: 'bulb-outline', status: 'On' },
  { id: '2', name: 'AC', icon: 'snow-outline', status: 'Off' },
  { id: '3', name: 'Fan', icon: 'sync-circle-outline', status: 'On' },
  { id: '4', name: 'TV', icon: 'tv-outline', status: 'Off' },
];

// --- KOMPONEN KECIL & REUSABLE ---

// Komponen untuk Header
const DashboardHeader = () => (
  <View style={styles.headerContainer}>
    <Image source={require('../../assets/images/logo.png')} style={styles.headerLogo} />
    <View style={styles.headerIcons}>
      <Link href="/notifications" asChild>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={26} color={COLORS.primary} />
        </TouchableOpacity>
      </Link>
      <Link href="/profile" asChild>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <Ionicons name="person-circle-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

// Komponen untuk Kartu Utama (Hero Card)
const HeroCard = () => (
  <View style={styles.heroCard}>
    <View style={styles.heroTextContainer}>
      <Text style={styles.heroTitle}>Smart Motion Detection</Text>
      <Text style={styles.heroSubtitle}>Sense Beyond Limits</Text>
      <Text style={styles.heroWelcome}>Welcome,</Text>
      <TouchableOpacity style={styles.heroButton}>
        <Text style={styles.heroButtonText}>View Motion</Text>
      </TouchableOpacity>
      <Text style={styles.heroTagline}>#LightsUpWhenLifeMoves</Text>
    </View>
    <Image source={require('../../assets/images/light.png')} style={styles.heroImage} />
  </View>
);

// Komponen untuk satu item perangkat
const DeviceCard = ({ item }: { item: typeof devices[0] }) => (
  <TouchableOpacity style={styles.deviceCard}>
    <View style={styles.deviceIconContainer}>
      <Ionicons name={item.icon as any} size={32} color={COLORS.primary} />
    </View>
    <Text style={styles.deviceName}>{item.name}</Text>
    <View style={styles.deviceStatus}>
      <Text style={styles.deviceStatusText}>{item.status}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color={COLORS.primary} />
    </View>
  </TouchableOpacity>
);


// --- LAYAR UTAMA DASHBOARD ---
export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DashboardHeader />
        <View style={styles.container}>
          <HeroCard />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Devices</Text>
            <FlatList
              data={devices}
              renderItem={({ item }) => <DeviceCard item={item} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20 }}
            />
          </View>

          {/* Anda bisa menambahkan section lain di sini */}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// --- STYLESHEET ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Hero Card Styles
  heroCard: {
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    margin: 20,
    padding: 20,
    flexDirection: 'row',
    overflow: 'hidden', // Penting agar gambar tidak keluar dari sudut
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 4,
  },
  heroWelcome: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: 16,
  },
  heroButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 8,
    alignSelf: 'flex-start', // Membuat tombol tidak meregang
  },
  heroButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  heroTagline: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 16,
  },
  heroImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    right: 10,
    bottom: 10,
    opacity: 0.8,
  },
  // Section Styles
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 20,
    marginBottom: 15,
  },
  // Device Card Styles
  deviceCard: {
    backgroundColor: '#F3F3E0', // Warna highlight
    borderRadius: 15,
    padding: 15,
    width: 130,
    marginRight: 15,
  },
  deviceIconContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  deviceStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  deviceStatusText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
