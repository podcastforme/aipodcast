'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, Pencil } from "lucide-react"

interface PodcastItem {
  id: string
  title: string
  summary: string
  source: string
  episode: number
}

export default function SourcePage() {
  const [podcastItems, setPodcastItems] = useState<PodcastItem[]>([
    {
      id: '1',
      title: 'Money talk',
      summary: 'This is a money talk podcast, talks about how financial crises affect families',
      source: 'www.financial.com',
      episode: 4
    },
    {
      id: '2',
      title: 'Tech Trends',
      summary: 'Discussing the latest trends in technology and their impact on society',
      source: 'www.techtrends.com',
      episode: 7
    },
    {
      id: '3',
      title: 'Health Matters',
      summary: 'Expert advice on maintaining physical and mental well-being',
      source: 'www.healthmatters.org',
      episode: 2
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = (id: string) => {
    setPodcastItems(podcastItems.filter(item => item.id !== id))
  }

  const handleEdit = (id: string) => {
    // Placeholder for edit functionality
    console.log(`Edit item with id: ${id}`)
  }

  const filteredItems = podcastItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Podcast Sources</h1>
      <Input
        type="text"
        placeholder="Search podcasts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="h-[calc(100vh-200px)]">
        <ul className="space-y-4">
          {filteredItems.map((item) => (
            <li key={item.id} className="bg-card text-card-foreground rounded-lg p-4 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">Episode: {item.episode}</p>
                  <p className="mt-2">{item.summary}</p>
                  <a href={item.source} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mt-2 inline-block">
                    {item.source}
                  </a>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(item.id)}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}