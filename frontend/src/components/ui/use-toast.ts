"use client"

import { useState, useEffect, ReactNode } from "react"

import { ToastActionElement, type ToastProps } from "@/components/ui/toast"

const TOAST_TIMEOUT = 5000

type ToasterToast = ToastProps & {
  id: string
  title?: ReactNode
  description?: ReactNode
  action?: ToastActionElement
}

const useToast = () => {
  const [toasts, setToasts] = useState<ToasterToast[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.open !== false))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const toast = ({ ...props }: Omit<ToasterToast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, open: true, ...props }

    setToasts((toasts) => [...toasts, newToast])

    setTimeout(() => {
      setToasts((toasts) =>
        toasts.map((t) => (t.id === id ? { ...t, open: false } : t))
      )
    }, TOAST_TIMEOUT)

    return {
      id,
      dismiss: () =>
        setToasts((toasts) =>
          toasts.map((t) => (t.id === id ? { ...t, open: false } : t))
        ),
      update: (props: ToasterToast) =>
        setToasts((toasts) =>
          toasts.map((t) => (t.id === id ? { ...t, ...props } : t))
        ),
    }
  }

  return {
    toast,
    toasts,
    dismissToast: (toastId: string) => {
      setToasts((toasts) =>
        toasts.map((t) => (t.id === toastId ? { ...t, open: false } : t))
      )
    },
  }
}

export { useToast }
export type { ToasterToast }