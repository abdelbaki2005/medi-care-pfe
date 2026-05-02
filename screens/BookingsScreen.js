import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, ChevronRight, Bell } from 'lucide-react-native';
import { appointmentApi } from '../services/api';
import { ActivityIndicator } from 'react-native';

export default function BookingsScreen({ route }) {
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const user = route.params?.user;

  React.useEffect(() => {
    if (user?.id) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await appointmentApi.getUserAppointments(user.id);
      setAppointments(response.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <TouchableOpacity style={styles.bellButton}>
          <Bell color="#1E293B" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Past</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#1552C1" style={{ marginTop: 40 }} />
        ) : appointments.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#64748B' }}>No bookings found.</Text>
        ) : (
          appointments.map((item) => (
            <TouchableOpacity key={item._id} style={styles.bookingCard}>
              <View style={styles.cardHeader}>
                <View style={styles.doctorInfo}>
                  <Image source={{ uri: item.doctor?.image || 'https://via.placeholder.com/150' }} style={styles.doctorImage} />
                  <View>
                    <Text style={styles.doctorName}>{item.doctor?.fullName}</Text>
                    <Text style={styles.doctorSub}>{item.doctor?.specialty}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, styles.upcomingBadge]}>
                  <Text style={[styles.statusText, styles.upcomingText]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.infoRow}>
                  <Calendar color="#64748B" size={16} />
                  <Text style={styles.infoText}>{new Date(item.date).toDateString()}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Clock color="#64748B" size={16} />
                  <Text style={styles.infoText}>{item.time}</Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Reschedule</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  bellButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    backgroundColor: 'white',
    paddingBottom: 16,
    gap: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  activeTab: {
    backgroundColor: '#1552C1',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabText: {
    color: 'white',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  doctorImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  doctorSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  upcomingBadge: {
    backgroundColor: '#EFF6FF',
  },
  completedBadge: {
    backgroundColor: '#ECFDF5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  upcomingText: {
    color: '#1552C1',
  },
  completedText: {
    color: '#059669',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#64748B',
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#1552C1',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
