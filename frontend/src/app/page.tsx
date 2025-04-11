import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    MindaGrow
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Platform pendidikan digital personalisasi yang memadukan gamifikasi dengan analisis perkembangan kognitif.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg">Mulai Sekarang</Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button size="lg" variant="outline">Login</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500">Ilustrasi Pembelajaran</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fitur Utama
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Pengalaman belajar yang optimal untuk setiap anak
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-950 rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Testimoni
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Apa kata pengguna MindaGrow
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex flex-col p-6 bg-white dark:bg-gray-950 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="mt-4 text-gray-500 dark:text-gray-400">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 MindaGrow. Hak Cipta Dilindungi.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Syarat & Ketentuan
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Data fitur
const features = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 8.5A2.5 2.5 0 0 1 14.5 11a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 1 19.5 16a2.5 2.5 0 0 0 2.5 2.5"></path><path d="M16.5 7a2.5 2.5 0 0 0-2.5-2.5A2.5 2.5 0 0 1 11.5 2A2.5 2.5 0 0 0 9 4.5"></path><path d="M4.5 16a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 1 9.5 21a2.5 2.5 0 0 0 2.5 2.5"></path><path d="M7.5 8a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 0 2.5 13 2.5 2.5 0 0 1 0 15.5"></path><path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path></svg>,
    title: "AI Personalisasi",
    description: "Sistem pembelajaran adaptif berbasis AI untuk menyesuaikan konten dengan kemampuan anak."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>,
    title: "Gamifikasi",
    description: "Pembelajaran berbasis game & level untuk meningkatkan motivasi dan keterlibatan anak."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M3 3v18h18"></path><path d="m18.7 8-5.1 5.2-2.8-2.7L7 14.3"></path></svg>,
    title: "Analisis Kemajuan",
    description: "Laporan perkembangan kognitif anak secara real-time dengan visualisasi data interaktif."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>,
    title: "Laporan Terperinci",
    description: "Orang tua dan guru mendapatkan wawasan berharga tentang perkembangan anak."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z"></path></svg>,
    title: "Chatbot AI",
    description: "Chatbot AI yang membantu anak mengetahui bakat dan memberikan rekomendasi aktivitas."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    title: "Dashboard Orang Tua & Guru",
    description: "Panel kontrol khusus untuk memantau perkembangan dan memberikan dukungan yang tepat."
  }
];

// Data testimonial
const testimonials = [
  {
    name: "Budi Santoso",
    role: "Orang Tua",
    quote: "MindaGrow telah membantu putra saya mengembangkan keterampilan matematika dengan cara yang menyenangkan. Dashboardnya sangat informatif!"
  },
  {
    name: "Siti Rahayu",
    role: "Guru SD",
    quote: "Sebagai guru, saya sangat terbantu dengan laporan detail tentang kemajuan setiap siswa. Memudahkan saya menyusun rencana pembelajaran."
  },
  {
    name: "Dimas Prakoso",
    role: "Orang Tua",
    quote: "Anak saya sangat menyukai game edukatif di MindaGrow. Dia belajar tanpa merasa sedang belajar. Hasilnya sungguh luar biasa!"
  }
];