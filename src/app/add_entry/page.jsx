"use client"
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import { UploadButton } from '../utils/uploadthing'
import { useState } from 'react'

const weatherOptions = [
  "sunny",
  "raining",
  "cloudy"
]

function AddEntry() {
  const router = useRouter()

  const [uploadedFileUrls, setUploadedFileUrls] = useState()
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const handleSubmit = async (e) => {
    // Prevent page from refreshing on Submit click
    e.preventDefault()

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    const submitData = async () => {
      try {
        const { error } = await supabase
          .from('diary_entries')
          .insert({ date: formProps.date, description: formProps.description, weather: formProps.weather, images: uploadedFileUrls })
        if (error) {
          throw error;
        }
        alert('Saved!')
        // Redirect User to List screen after saving
        router.push('/')
      } catch (error) {
        console.error('Error fetching data from Supabase:', error.message);
      }
    };
    submitData();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-12">
              {/* date */}
              <div className="sm:col-span-3">
                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                  Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    className="block w-full rounded-md py-1 px-2 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* weather */}
              <div className="sm:col-span-3">
                <label htmlFor="weather" className="block text-sm font-medium leading-6 text-gray-900">
                  Weather
                </label>
                <div className="mt-2">
                  <select
                    id="weather"
                    name="weather"
                    required
                    className="capitalize block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {weatherOptions.map((weatherOption) => {
                      return (
                        <option>{weatherOption}</option>
                      )
                    })}
                  </select>
                </div>
              </div>

              {/* description */}
              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    required
                    className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the day.</p>
              </div>

              {/* images */}
              <div className="col-span-full">
                <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900">
                  Photos
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <UploadButton
                        multiple
                        endpoint="diaryImageUploader"
                        onUploadBegin={() => setSubmitDisabled(true)}
                        onClientUploadComplete={(res) => {
                          const fileUrls = res.map(file => file.url);
                          setUploadedFileUrls(fileUrls)
                          setSubmitDisabled(false)
                          alert("Upload Completed");
                        }}
                        onUploadError={(error) => {
                          alert(`ERROR! ${error.message}`);
                          setSubmitDisabled(false)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href="/"
            className="rounded-md border-2 border-red-500 px-3 py-2 text-sm font-semibold text-red-500 shadow-sm hover:bg-red-500 hover:text-white"
          >
            Return
          </Link>
          <button
            type="submit"
            disabled={submitDisabled}
            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none rounded-md border-2 border-green-600 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 hover:border-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default AddEntry
