import { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchbarProps {
  placeholder?: string
  onSearch?: (query: string) => void // Делаем onSearch необязательным
  disabled?: boolean
}

export default function Searchbar({ placeholder = 'Должность, ключевые слова', onSearch, disabled = false }: SearchbarProps = { onSearch: () => {} }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query) // Вызываем onSearch, если она передана
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 pl-10 pr-4 text-white bg-[#1b1b1b] border rounded-[8px] focus:outline-none border-blue-500 focus:border-blue-500"
        aria-label="Search"
        disabled={disabled}
      />
      <button
        type="submit"
        className="absolute inset-y-0 left-0 flex items-center pl-3"
        aria-label="Submit search"
      >
        <Search className="w-5 h-5 text-gray-400" />
      </button> 
    </form>
  )
}
