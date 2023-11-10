"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

function Entry({ params }) {
  const [entryData, setEntryData] = useState();
  const entry_id = params.entry_id

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: diary_entry, error } = await supabase
          .from('diary_entries')
          .select()
          .eq('id', entry_id)
        if (error) {
          throw error;
        }
        setEntryData(diary_entry[0])
      } catch (error) {
        console.error('Error fetching data from Supabase:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {entryData &&
        <>
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {entryData.date && new Date(entryData.date).toLocaleDateString()}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{`ID: ${entryData.id}`}</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Weather</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-transform:capitalize">{entryData.weather}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{entryData.description}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Images</dt>
                  {entryData.images?.length > 0 ?
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                        {entryData.images.map((imageUrl) => {
                          return (
                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                              <div className="flex w-0 flex-1 items-center">
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                  <Image
                                    src={imageUrl}
                                    quality={1}
                                    width={300}
                                    height={300}
                                    alt="Site Diary Image"
                                  />
                                </div>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <a href={imageUrl} target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">
                                  Open
                                </a>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </dd>
                    :
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">There are no images for this day.</dd>
                  }
                </div>
              </dl>
            </div>
          </div>
          <Link
            href="/"
            className="border-solid border-2 border-red-500 hover:bg-red-500 hover:text-white text-sm text-red-500 font-bold py-2 px-4 rounded"
          >
            Return
          </Link>
        </>
      }
    </>
  )
}

export default Entry
