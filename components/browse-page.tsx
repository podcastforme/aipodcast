'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const categories = [
  "Sports", "Music", "ESL", "News", "Technology", "Science", "History", 
  "True Crime", "Comedy", "Business", "Politics", "Health & Wellness"
]

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Podcasts</h1>
      <Input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCategories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="h-24 text-lg font-semibold"
              onClick={() => console.log(`Browsing ${category} podcasts`)}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}