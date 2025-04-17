import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="w-full py-4 bg-white border-b border-gray-200">
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image src="/logo.svg" alt="MindaGrow Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold">MindaGrow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-indigo-600">
              Fitur
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-indigo-600">
              Testimoni
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-indigo-600">
              Harga
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-indigo-600">
              Kontak
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50">
              Login
            </Link>
            <Link href="/auth/register" className="hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
              Daftar
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
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Platform pendidikan digital personalisasi yang memadukan gamifikasi dengan analisis perkembangan kognitif.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register" className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-700">
                    Mulai Sekarang
                  </Link>
                  <Link href="/auth/login" className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950">
                    Login
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Ilustrasi Pembelajaran</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fitur Utama
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Pengalaman belajar yang optimal untuk setiap anak
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-600">
                    <path d="M12 8.5A2.5 2.5 0 0 1 14.5 11a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 1 19.5 16a2.5 2.5 0 0 0 2.5 2.5"></path>
                    <path d="M16.5 7a2.5 2.5 0 0 0-2.5-2.5A2.5 2.5 0 0 1 11.5 2A2.5 2.5 0 0 0 9 4.5"></path>
                    <path d="M4.5 16a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 1 9.5 21a2.5 2.5 0 0 0 2.5 2.5"></path>
                    <path d="M7.5 8a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 0 2.5 13 2.5 2.5 0 0 1 0 15.5"></path>
                    <path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">AI Personalisasi</h3>
                <p className="text-gray-500 text-center">
                  Sistem pembelajaran adaptif berbasis AI untuk menyesuaikan konten dengan kemampuan anak.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-600">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Gamifikasi</h3>
                <p className="text-gray-500 text-center">
                  Pembelajaran berbasis game & level untuk meningkatkan motivasi dan keterlibatan anak.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-600">
                    <path d="M3 3v18h18"></path>
                    <path d="m18.7 8-5.1 5.2-2.8-2.7L7 14.3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Analisis Kemajuan</h3>
                <p className="text-gray-500 text-center">
                  Laporan perkembangan kognitif anak secara real-time dengan visualisasi data interaktif.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-indigo-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Siap Untuk Memulai?
                </h2>
                <p className="max-w-[600px] text-indigo-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Daftar sekarang dan berikan anak Anda pengalaman belajar terbaik
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/register" className="inline-flex h-10 items-center justify-center rounded-md bg-white text-indigo-600 px-8 text-sm font-medium shadow transition-colors hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white">
                  Daftar Gratis
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} MindaGrow. Hak Cipta Dilindungi.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Syarat & Ketentuan
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}