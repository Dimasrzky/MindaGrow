import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Halaman Tidak Ditemukan</h2>
        <p className="mt-6 text-base text-gray-600 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <div className="mt-10">
          <Link href="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Kembali ke Beranda
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/dashboard/student" className="text-sm text-indigo-600 hover:text-indigo-800">
            Pergi ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}