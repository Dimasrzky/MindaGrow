import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Halaman Tidak Ditemukan</h2>
        <p className="mt-6 text-base text-gray-600">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <div className="mt-10">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}