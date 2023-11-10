import DiaryList from './components/diary_list'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex items-center justify-between flex-col">
      <div className="flex sm:flex-row flex-col justify-between gap-2 sm:w-screen sm:max-w-7xl sm:px-24 sm:mb-6">
        <h2 className="text-3xl font-bold text-gray-900 truncate sm:tracking-tight">
          Tom's <span class="text-blue-600">Site Diary</span>
        </h2>
        <div className="flex justify-center">
            <Link
              type="button"
              href="/add_entry"
              className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Add Entry
            </Link>
        </div>
      </div>
      <DiaryList />
    </div>
  )
}
