"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';
import Link from 'next/link';

function DiaryList() {

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: diary_entries, error } = await supabase
          .from('diary_entries')
          .select('*')

        if (error) {
          throw error;
        }
        setData(diary_entries)
        console.log(diary_entries)
      } catch (error) {
        console.error('Error fetching data from Supabase:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {data ?
          data.map((entry) => (
            <li key={entry.id} className="flex justify-between gap-x-6 w-screen max-w-7xl px-24 py-5">
              <div className="flex min-w-0 gap-x-4">
                {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{entry.date}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{`${entry.weather}, ${entry.description}`}</p>
                </div>
              </div>
              <div>
                {/* <p className="text-sm leading-6 text-gray-900">{entry.description}</p> */}
                <Link
                  href={`${entry.id}`}
                  class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded"
                >
                  View
                </Link>

                {/* {person.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )} */}
              </div>
            </li>
          )) : ''}
      </ul>
    </>
  )
}

export default DiaryList