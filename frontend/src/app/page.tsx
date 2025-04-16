import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="w-full py-4 bg-white border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image src="/logo.svg" alt="MindaGrow Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold">MindaGrow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Fitur
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimoni
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Harga
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Kontak
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link href="/auth/register" className="hidden md:inline-flex">
              <Button size="sm">Daftar</Button>
            </Link>
          </div>
        </div>
      </header>

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
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
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
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
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

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Siap Memulai?
                </h2>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Gabung sekarang dan berikan anak Anda pengalaman belajar terbaik
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/register">
                  <Button size="lg" variant="secondary">Daftar Gratis</Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative h-8 w-8">
                  <Image src="/logo.svg" alt="MindaGrow Logo" fill className="object-contain" />
                </div>
                <span className="text-xl font-bold">MindaGrow</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Platform pendidikan digital personalisasi untuk perkembangan kognitif anak.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Perusahaan</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                    Karir
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Bantuan</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                    Dukungan
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                    Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 MindaGrow. Hak Cipta Dilindungi.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                <span className="sr-only">Instagram</span>
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