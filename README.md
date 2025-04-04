# MindaGrow - Platform Pendidikan Anak Personalisasi

Platform pendidikan digital personalisasi yang memadukan gamifikasi dengan analisis perkembangan kognitif untuk menciptakan pengalaman belajar yang optimal bagi setiap anak.

## Fitur Utama

- **AI-Powered Personalized Learning** - Sistem pembelajaran adaptif berbasis AI untuk menyesuaikan konten dengan kemampuan anak
- **Gamifikasi & Tantangan Interaktif** - Pembelajaran berbasis game & level untuk meningkatkan motivasi anak
- **Pemantauan Perkembangan & Rekomendasi** - Laporan perkembangan kognitif anak secara real-time
- **Dashboard Orang Tua & Guru** - Statistik perkembangan anak secara visual dengan analisis AI

## Teknologi

### Frontend
- Next.js
- Tailwind CSS
- ShadCN UI
- Frame Motion
- React Query
- Zustand

### Backend
- NestJS
- PostgreSQL & MongoDB
- GraphQL (Apollo Server)
- Redis
- JWT & RBAC

### AI & Machine Learning
- TensorFlow.js
- LangChain
- OpenAI API / Claude API

## Instalasi

```bash
# Clone repository
git clone https://github.com/yourusername/mindagrow.git
cd mindagrow

# Setup proyek
npm run setup

# Jalankan services dengan Docker
npm run docker:up

# Jalankan aplikasi dalam mode development
npm run dev