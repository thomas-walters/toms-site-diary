import React from 'react'
import { useBuilder } from '../../contexts/builderContext'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function BuilderList() {
  const builder = useBuilder()
  const [builderList, setBuilderList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: buildersList, error } = await supabase
          .from('builders')
          .select('*')
        if (error) {
          throw error;
        }
        console.log(buildersList)
        setBuilderList(buildersList)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  const handleClick = (builderId) => {
    builder.setBuilderId(builderId)
  }

  return (
    <>
      <p>{JSON.stringify(builder)}</p>
      {
        builderList &&
        builderList.map((builder) => {
          return (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
              onClick={() => handleClick(builder.id)}
            >
              {builder.name}
            </button>
          )
        })
      }
    </>
  )
}
