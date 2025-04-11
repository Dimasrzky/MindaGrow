'use client'

import { useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
})

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError('')
    
    try {
      // Simulasi login untuk demo
      // Pada implementasi nyata, ini akan memanggil API
      console.log('Login submitted:', values)
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect ke dashboard (sesuaikan berdasarkan role user)
      router.push('/dashboard/student')
    } catch (error: any) {
      setError(error.message || 'Terjadi kesalahan saat login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Selamat datang kembali</h1>
          <p className="text-sm text-muted-foreground">
            Masukkan email dan password Anda untuk melanjutkan
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="nama@contoh.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                          Lupa password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {error && (
                  <div className="text-sm text-destructive">{error}</div>
                )}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Memproses...' : 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground mt-4">
              Belum punya akun?{' '}
              <Link href="/auth/register" className="text-primary hover:underline">
                Daftar sekarang
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}