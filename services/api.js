// Mock API Service for Frontend-Only mode
const mockDelay = (data) => new Promise(resolve => setTimeout(() => resolve({ data }), 800));

export const authApi = {
  login: (data) => mockDelay({ 
    user: { id: '1', fullName: 'Test Doctor', email: data.email, role: 'doctor' },
    token: 'mock-token'
  }),
  register: (data) => mockDelay({ 
    user: { id: '2', fullName: 'New User', email: 'test@example.com', role: 'patient' },
    token: 'mock-token'
  }),
};

export const doctorApi = {
  getDoctors: () => mockDelay([
    { _id: '1', fullName: 'Dr. James Wilson', specialty: 'Cardiology', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400', rating: 4.9, reviews: 120 },
    { _id: '2', fullName: 'Dr. Sarah Chen', specialty: 'Pediatrics', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400', rating: 4.8, reviews: 85 }
  ]),
};

export const appointmentApi = {
  create: (data) => mockDelay({ ...data, _id: Math.random().toString() }),
  getUserAppointments: (userId) => mockDelay([
    { _id: '1', doctor: { fullName: 'Dr. James Wilson', specialty: 'Cardiology' }, date: new Date(), time: '10:30 AM', status: 'upcoming' }
  ]),
};

export const messageApi = {
  getHistory: (u1, u2) => mockDelay([
    { _id: '1', text: 'Hello, how can I help you?', sender: u2, createdAt: new Date() }
  ]),
  send: (data) => mockDelay({ ...data, _id: Math.random().toString(), createdAt: new Date() }),
};

export default {
  get: () => Promise.resolve({ data: [] }),
  post: () => Promise.resolve({ data: {} }),
};
