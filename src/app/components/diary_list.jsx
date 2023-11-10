"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';
import Link from 'next/link';

function DiaryList() {
  const [entriesData, setEntriesData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: diary_entries, error } = await supabase
          .from('diary_entries')
          .select('*')

        if (error) {
          throw error;
        }
        setEntriesData(diary_entries)
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {entriesData ?
          entriesData.map((entry) => (
            <li key={entry.id} className="flex justify-between gap-x-6 w-screen max-w-7xl px-24 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{new Date(entry.date).toLocaleDateString()}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-transform:capitalize">{`${entry.weather} - ${entry.description}`}</p>
                </div>
              </div>
              <div>
                <Link
                  href={`${entry.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded"
                >
                  View
                </Link>
              </div>
            </li>
          ))
          :
          ''
        }
      </ul>
    </>
  )
}

export default DiaryList
