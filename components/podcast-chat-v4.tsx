'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  Home,
  Settings,
  HelpCircle,
  LogOut,
  Send,
  Volume2,
  VolumeX,
  Mic,
  Play,
  Pause,
  Keyboard,
  ChevronDown
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SourcePage from './source-page'
import BrowsePage from './browse-page'

export function PodcastChatV4() {
  const [messages, setMessages] = useState([
    { role: 'interviewer', content: "Welcome to our podcast on the future of AI. Today, we're joined by two experts in the field. Let's start with you, Dr. A. What do you think is the most exciting development in AI right now?" },
    { role: 'speaker_a', content: "Thank you for having me. I believe the most exciting development is the rapid progress in natural language processing. Large language models like GPT-3 and its successors are pushing the boundaries of what's possible in human-AI interaction." },
    { role: 'speaker_b', content: "While I agree that NLP is incredibly important, I think the most exciting developments are happening in the field of artificial general intelligence (AGI). We're seeing promising research that could lead to AI systems that can reason and learn across a wide range of tasks, much like humans do." },
    { role: 'interviewer', content: "That's an interesting perspective. Dr. A, what are your thoughts on AGI? Are we close to achieving it?" },
    { role: 'speaker_a', content: "I'm a bit more cautious about AGI. While the goal is certainly exciting, I think we're still quite far from achieving true AGI. The challenges in creating a system that can generalize knowledge and skills across domains are immense." },
  ])
  const [input, setInput] = useState('')
  const [isSoundOnly, setIsSoundOnly] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSpeaker, setActiveSpeaker] = useState('speaker_a')
  const [playbackSpeed, setPlaybackSpeed] = useState('1x')
  const [showInput, setShowInput] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const navigate = useCallback((page: string) => {
    setCurrentPage(page)
  }, [])

  const toggleSoundOnly = useCallback(() => {
    setIsSoundOnly(prev => !prev)
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input.trim() }])
      setInput('')
      // Simulate response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'interviewer', content: 'Thank you for your question. Let\'s see what our experts think about that.' }])
      }, 1000)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    // Here you would normally trigger audio playback
  }

  const getAvatarForRole = (role: string) => {
    switch (role) {
      case 'speaker_a':
        return { fallback: 'A', src: '/placeholder.svg?height=40&width=40' }
      case 'speaker_b':
        return { fallback: 'B', src: '/placeholder.svg?height=40&width=40' }
      case 'interviewer':
        return { fallback: 'I', src: '/placeholder.svg?height=40&width=40' }
      default:
        return { fallback: 'U', src: '/placeholder.svg?height=40&width=40' }
    }
  }

  const CustomIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-current">
      {children}
    </div>
  )

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between h-14 border-b px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col h-full">
              <h2 className="font-semibold text-lg mb-4">Menu</h2>
              <ul className="space-y-2 flex-grow">
                <li>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('home')}>
                    <Home className="mr-2 h-5 w-5" />
                    Home
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('source')}>
                    <Settings className="mr-2 h-5 w-5" />
                    Source
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('browse')}>
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Browse
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Button>
                </li>
              </ul>
              <Button variant="ghost" className="justify-start mt-auto">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">AI Future Podcast</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSoundOnly}
          aria-label={isSoundOnly ? "Switch to visual mode" : "Switch to sound-only mode"}
        >
          {isSoundOnly ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </header>

      {currentPage === 'home' ? (
        <>
          {!isSoundOnly ? (
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                  <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%]`}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={getAvatarForRole(message.role).src} alt={`Avatar for ${message.role}`} />
                      <AvatarFallback>{getAvatarForRole(message.role).fallback}</AvatarFallback>
                    </Avatar>
                    <div className={`px-4 py-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground ml-2' : 'bg-muted mr-2'}`}>
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-background">
              <div className="flex justify-center items-center space-x-8 mb-8">
                <div className={`${activeSpeaker === 'speaker_a' ? 'scale-150' : ''} transition-transform`}>
                  <div className="bg-muted p-6 rounded-full">
                    <span className="text-2xl font-semibold">A</span>
                  </div>
                </div>
                <div className={`${activeSpeaker === 'speaker_b' ? 'scale-150' : ''} transition-transform`}>
                  <div className="bg-muted p-6 rounded-full">
                    <span className="text-2xl font-semibold">B</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-16 h-16 mb-8"
              >
                <Mic className="h-8 w-8" />
                <span className="sr-only">Microphone</span>
              </Button>
            </div>
          )}

          {isSoundOnly && (
            <div className="p-4 border-t">
              <div className="flex justify-between items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {playbackSpeed} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setPlaybackSpeed('1x')}>1x</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPlaybackSpeed('1.2x')}>1.2x</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPlaybackSpeed('1.5x')}>1.5x</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPlaybackSpeed('2x')}>2x</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon">
                  <CustomIcon>
                    <span className="text-xs font-semibold">15</span>
                  </CustomIcon>
                  <span className="sr-only">Rewind 15 seconds</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <CustomIcon>
                    <span className="text-xs font-semibold">30</span>
                  </CustomIcon>
                  <span className="sr-only">Forward 30 seconds</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShowInput(!showInput)}>
                  <Keyboard className="h-5 w-5" />
                  <span className="sr-only">Toggle keyboard input</span>
                </Button>
              </div>
            </div>
          )}

          {(showInput || !isSoundOnly) && (
            <div className="p-4 border-t">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="flex-1"
                />
                {isInputFocused && (
                  <Button type="submit" size="icon" disabled={!input.trim()}>
                    <Send className="w-4 h-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                )}
              </form>
            </div>
          )}
        </>
      ) : currentPage === 'source' ? (
        <SourcePage onNavigate={navigate} />
      ) : currentPage === 'browse' ? (
        <BrowsePage onNavigate={navigate} />
      ) : null}
    </div>
  )
}