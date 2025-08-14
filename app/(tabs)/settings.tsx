// File: app/(tabs)/settings.tsx (Versi diperbarui)

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/Colors'; 
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const handleLogout = () => {
    // Logika untuk logout akan ditambahkan di sini
    console.log("Logout pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color={COLORS.textSecondary} />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.textSecondary} />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={'#c62828'} />
          <Text style={[styles.menuText, { color: '#c62828' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
    color: COLORS.text,
  },
  logoutButton: {
    marginTop: 20,
  }
});

export default SettingsScreen;