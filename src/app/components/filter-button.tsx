import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

interface FilterOption {
  id: string
  label: string
}

const categories: FilterOption[] = [
  { id: 'electronics', label: 'Electronics' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'books', label: 'Books' },
  { id: 'home', label: 'Home & Garden' },
]

const brands: FilterOption[] = [
  { id: 'apple', label: 'Apple' },
  { id: 'samsung', label: 'Samsung' },
  { id: 'sony', label: 'Sony' },
  { id: 'lg', label: 'LG' },
]

export default function FilterButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [priceRange, setPriceRange] = useState([0, 1000])

  const toggleFilter = () => setIsOpen(!isOpen)

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleApplyFilters = () => {
    console.log('Applied Filters:', { selectedCategories, selectedBrand, priceRange })
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleFilter}
        aria-label="Open filters"
        className="bg-[#303030] min-w-10 min-h-full text-white border-[#303030] rounded-xl hover:bg-[#303030]"
      >
        <Filter className="h-4 w-4 text-white" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 bg-black z-50 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Фильтры</h2>
                <Button variant="ghost" size="icon" onClick={toggleFilter} aria-label="Close filters" className="text-white hover:bg-[#000]">
                  <X className="h-6 w-6 text-white" />
                </Button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Categories</h3>
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                        className="text-white"
                      />
                      <Label htmlFor={category.id} className="text-white">{category.label}</Label>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Brand</h3>
                  <RadioGroup value={selectedBrand} onValueChange={setSelectedBrand}>
                    {brands.map(brand => (
                      <div key={brand.id} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={brand.id} id={brand.id} className="text-white" />
                        <Label htmlFor={brand.id} className="text-white">{brand.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Price Range</h3>
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2 text-white"
                  />
                  <div className="flex justify-between text-sm text-white">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button onClick={handleApplyFilters} className="w-full bg-white text-black">
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
