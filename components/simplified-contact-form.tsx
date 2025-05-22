"use client"

import type React from "react"
import { useState } from "react"

interface ContactFormValues {
  name: string
  email: string
  message: string
}

export function SimplifiedContactForm() {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    setFormErrors({ ...formErrors, [name]: "" }) // Clear error on change
  }

  const validateForm = (): boolean => {
    let isValid = true
    const newErrors: ContactFormValues = { name: "", email: "", message: "" }

    if (!formValues.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formValues.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Invalid email format"
      isValid = false
    }

    if (!formValues.message.trim()) {
      newErrors.message = "Message is required"
      isValid = false
    }

    setFormErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmissionResult(null) // Clear previous result

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmissionResult("Message sent successfully!")
        setFormValues({ name: "", email: "", message: "" }) // Clear form
      } else {
        setSubmissionResult(`Error: ${data.error || "Something went wrong"}`)
      }
    } catch (error: any) {
      setSubmissionResult(`Error: ${error.message || "Something went wrong"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-200">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
        {formErrors.name && <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
        {formErrors.email && <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formValues.message}
          onChange={handleChange}
          rows={6}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
        {formErrors.message && <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>

      {submissionResult && (
        <div
          className={`p-3 rounded-md ${
            submissionResult.startsWith("Error") ? "bg-red-900/50 text-red-200" : "bg-green-900/50 text-green-200"
          }`}
        >
          {submissionResult}
        </div>
      )}
    </form>
  )
}
