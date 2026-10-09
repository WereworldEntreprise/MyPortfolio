

import { useState, type ChangeEvent, type FormEvent } from 'react'

export interface ContactFormData {
  name: string
  email: string
  message: string
  website: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

/** Statut de soumission du formulaire */
export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

/** État initial du formulaire */
const INITIAL_DATA: ContactFormData = { name: '', email: '', message: '', website: '' }

/** Regex simple de validation d'email */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Hook contrôleur du formulaire de contact.
 */
export const useContactController = () => {
  const [data, setData] = useState<ContactFormData>(INITIAL_DATA)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<SubmissionStatus>('idle')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  
  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {}

    // Nom obligatoire
    if (data.name.trim() === '') {
      newErrors.name = 'required'
    }

    // Email obligatoire + format valide
    if (data.email.trim() === '') {
      newErrors.email = 'required'
    } else if (!EMAIL_REGEX.test(data.email)) {
      newErrors.email = 'invalid'
    }

    // Message obligatoire
    if (data.message.trim() === '') {
      newErrors.message = 'required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    // Validation préalable
    if (!validate()) return

    try {
      setStatus('submitting')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Contact request failed')
      setStatus('success')
      setData(INITIAL_DATA)
    } catch {
      setStatus('error')
    }
  }

  return {
    /** Données du formulaire */
    data,
    /** Erreurs de validation */
    errors,
    /** Statut de soumission */
    status,
    /** Gestionnaire de changement de champ */
    handleChange,
    /** Gestionnaire de soumission */
    handleSubmit,
  } as const
}
