import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Lock, Activity, Upload, ChevronDown, ArrowRight } from 'lucide-react-native';
import { authApi } from '../services/api';
import { ActivityIndicator, Image as RNImage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function RegisterScreen({ navigation }) {
  const [role, setRole] = useState('patient');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCertificate(result.assets[0]);
    }
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) return alert('Please fill in required fields');
    if (role === 'doctor' && !certificate) return alert('Please upload your certificate');

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      if (role === 'doctor') {
        formData.append('specialty', specialty);
        formData.append('certificate', {
          uri: certificate.uri,
          name: 'certificate.jpg',
          type: 'image/jpeg',
        });
      }

      const response = await authApi.register(formData);
      navigation.navigate('Main', { user: response.data.user });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed';
      console.log('Registration Error Details:', err.config ? `URL: ${err.config.url}` : '', err.message);
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Activity color="#1552C1" size={32} />
            </View>
            <Text style={styles.logoText}>MediCare</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your digital healthcare journey today.</Text>

            {/* Role Switcher */}
            <View style={styles.roleSwitcher}>
              <TouchableOpacity
                style={[styles.roleButton, role === 'patient' && styles.roleButtonActive]}
                onPress={() => setRole('patient')}
              >
                <Text style={[styles.roleButtonText, role === 'patient' && styles.roleButtonTextActive]}>Patient</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleButton, role === 'doctor' && styles.roleButtonActive]}
                onPress={() => setRole('doctor')}
              >
                <Text style={[styles.roleButtonText, role === 'doctor' && styles.roleButtonTextActive]}>Doctor</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <User color="#94A3B8" size={20} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor={'gray'}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail color="#94A3B8" size={20} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="john@example.com"
                  placeholderTextColor={'gray'}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Lock color="#94A3B8" size={20} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={'gray'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Doctor Specific Fields */}
            {role === 'doctor' && (
              <>
                <View style={styles.divider} />
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: '#64748B' }]}>Specialty & Verification (Doctor Only)</Text>
                  <View style={styles.inputWrapper}>
                    <Activity color="#94A3B8" size={20} style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Select Specialty"
                      placeholderTextColor={'gray'}
                      value={specialty}
                      onChangeText={setSpecialty}
                    />
                    <ChevronDown color="#94A3B8" size={20} />
                  </View>
                </View>

                <TouchableOpacity style={styles.uploadCard} onPress={pickImage}>
                  {certificate ? (
                    <RNImage source={{ uri: certificate.uri }} style={{ width: '100%', height: 100, borderRadius: 12 }} />
                  ) : (
                    <>
                      <Upload color="#94A3B8" size={24} />
                      <Text style={styles.uploadTitle}>Upload Medical License / Certificate</Text>
                      <Text style={styles.uploadDesc}>PDF, PNG or JPG (Max 5MB)</Text>
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Create Account</Text>
                  <ArrowRight color="white" size={20} />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logoIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 32,
  },
  roleSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  roleButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  roleButtonTextActive: {
    color: '#1552C1',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  uploadCard: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginTop: 12,
  },
  uploadDesc: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1552C1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#64748B',
    fontSize: 14,
  },
  linkText: {
    color: '#1552C1',
    fontSize: 14,
    fontWeight: '700',
  },
});
