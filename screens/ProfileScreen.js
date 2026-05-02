import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Shield, CreditCard, Bell, Settings, LogOut, ChevronRight, Activity, Heart, Thermometer } from 'lucide-react-native';

export default function ProfileScreen({ navigation, route }) {
  const user = route.params?.user;
  
  const userData = {
    name: user?.fullName || 'Eleanor Shellstrop',
    id: user?.id ? `#MC-${user.id.slice(-5).toUpperCase()}` : '#MC-98231',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    stats: [
      { label: 'Heart Rate', value: '72 bpm', icon: Heart, color: '#3B82F6' },
      { label: 'Blood Pressure', value: '120/80', icon: Activity, color: '#EF4444' },
      { label: 'Temp.', value: '98.6 °F', icon: Thermometer, color: '#F59E0B' },
    ]
  };

  const menuItems = [
    { label: 'My Medical Records', icon: Shield, color: '#1552C1' },
    { label: 'Payments & Subscriptions', icon: CreditCard, color: '#10B981' },
    { label: 'Notifications', icon: Bell, color: '#F59E0B' },
    { label: 'Settings', icon: Settings, color: '#64748B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <Image source={{ uri: userData.image }} style={styles.profileImage} />
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userId}>Patient ID: {userData.id}</Text>
          
          <View style={styles.tagRow}>
            <View style={[styles.tag, { backgroundColor: '#EFF6FF' }]}>
              <Text style={[styles.tagText, { color: '#3B82F6' }]}>Type 2 Diabetes</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#FEF2F2' }]}>
              <Text style={[styles.tagText, { color: '#EF4444' }]}>Hypertension</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          {userData.stats.map((stat, index) => (
            <View key={index} style={styles.statBox}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <stat.icon color={stat.color} size={20} />
              </View>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '10' }]}>
                  <item.icon color={item.color} size={20} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <ChevronRight color="#94A3B8" size={20} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <LogOut color="#EF4444" size={20} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  userId: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 8,
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
});
