'use client'

import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useRegisterToEventMutation } from '@/state/api'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import type { Register as RegisterType } from '@/app/types/Register'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  dateOfBirth: yup
    .date()
    .required('Date of birth is required')
    .typeError('Please enter a valid date'),
  heardFrom: yup
    .string()
    .oneOf(
      ['Social media', 'Friends', 'Found myself'],
      'Please select an option'
    )
    .required('This field is required'),
})

const Register = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const eventName = searchParams.get('eventName')

  const params = useParams()
  const eventId = Array.isArray(params.id) ? params.id[0] : params.id

  const [registerMember] = useRegisterToEventMutation()
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: RegisterType) => {
    if (!dateOfBirth) {
      toast.error('Please select a valid date.')
      return
    }
    try {
      const response = await registerMember({ ...data, dateOfBirth, eventId })

      if (response.data) {
        toast.success('Successfully registered!', {
          autoClose: 1500,
          onClose: () => router.push('/'),
        })
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.')
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg mx-auto">
        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          {eventName} registration
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col gap-4 justify-center bg-[#404040] p-8 rounded-lg shadow-lg"
        >
          {/* FULL NAME */}
          <div className="flex flex-col gap-3">
            <label>Full Name</label>
            <input
              type="text"
              {...register('fullName')}
              className="bg-[#5e5e5e] border border-[#8c8c8c] rounded p-2 text-white"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-3">
            <label>Email</label>
            <input
              type="email"
              {...register('email')}
              className="bg-[#5e5e5e] border border-[#8c8c8c] rounded p-2 text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* DATE OF BIRTH */}
          <div className="flex flex-col gap-3">
            <label>Date of birth</label>
            <DatePicker
              selected={dateOfBirth}
              onChange={(date) => {
                setDateOfBirth(date)
                setValue('dateOfBirth', date || new Date())
              }}
              className="bg-[#5e5e5e] border border-[#8c8c8c] rounded p-2 text-white w-full"
              placeholderText="Select a date"
              dateFormat="yyyy/MM/dd"
              showYearDropdown
              dropdownMode="select"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* HEARD FROM */}
          <div className="flex flex-col gap-3">
            <label>Where did you hear about this event?</label>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="Social media"
                  {...register('heardFrom')}
                  className="mr-2"
                />
                Social media
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="Friends"
                  {...register('heardFrom')}
                  className="mr-2"
                />
                Friends
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="Found myself"
                  {...register('heardFrom')}
                  className="mr-2"
                />
                Found myself
              </label>
            </div>
            {errors.heardFrom && (
              <p className="text-red-500 text-sm">{errors.heardFrom.message}</p>
            )}
          </div>

          {/* SUBMIT BTN */}
          <div>
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded w-full"
            >
              Register
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Register
