'use client'

import { useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
})

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError('')
    setSuccess(false)
    
    try {
      // Simulasi pengiriman email reset password
      // Pada implementasi nyata, kirim request ke API
      console.log('Reset password request for:', values.email)
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSuccess(true)
    } catch (error: any) {
      setError(error.message || 'Terjadi kesalahan saat memproses permintaan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Masukkan email Anda untuk menerima link reset password
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {success ? (
              <div className="text-center space-y-4">
                <div className="bg-green-50 text-green-800 rounded-md p-4 dark:bg-green-900/30 dark:text-green-400">
                  <p>Link reset password telah dikirim ke email Anda.</p>
                  <p className="text-sm mt-2">Silakan periksa inbox Anda dan ikuti petunjuk yang diberikan.</p>
                </div>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link href="/auth/login">Kembali ke halaman login</Link>
                </Button>
              </div>
            ) : (
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
                  
                  {error && (
                    <div className="text-sm text-destructive">{error}</div>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground mt-4">
              <Link href="/auth/login" className="text-primary hover:underline">
                Kembali ke halaman login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}