'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Send } from 'lucide-react'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  text: string
  ts: number
}

export default function ChatPanel() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: "Hi! Ask me about your spending, bills, or cashflow.",
      ts: Date.now(),
    },
  ])
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length])

  const canSend = useMemo(() => input.trim().length > 0, [input])

  function addMessage(role: ChatMessage['role'], text: string) {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role, text, ts: Date.now() },
    ])
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault()
    if (!canSend) return
    const text = input.trim()
    setInput('')
    addMessage('user', text)

    // Mock assistant response for now
    const responseText = mockRespond(text)
    await new Promise((r) => setTimeout(r, 450))
    addMessage('assistant', responseText)
  }

  if (!mounted) return null
  return (
    <div className="flex h-[75vh] flex-col rounded-2xl border border-gray-200/70 bg-white/80 shadow-sm ring-1 ring-black/[0.02] dark:border-gray-800/60 dark:bg-gray-900/70">
      <div className="flex items-center justify-between border-b border-gray-200/70 px-4 py-3 text-sm font-medium text-gray-700 dark:border-gray-800/60 dark:text-gray-200">
        Chat
      </div>
      <div ref={listRef} className="flex-1 space-y-3 overflow-auto px-4 py-3">
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} text={m.text} />
        ))}
      </div>
      <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-gray-200/70 px-3 py-2 dark:border-gray-800/60">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about bills, merchants, or transactions..."
          className="flex-1 rounded-xl border border-gray-300/70 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-gray-700/60 dark:bg-gray-900/70 dark:focus:ring-gray-800"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!canSend}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300/70 bg-gray-50 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}

function MessageBubble({ role, text }: { role: 'user' | 'assistant'; text: string }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`${
          isUser
            ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
            : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
        } max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm`}
      >
        {text}
      </div>
    </div>
  )
}

function mockRespond(q: string) {
  const lower = q.toLowerCase()
  if (lower.includes('bills')) return 'You have 2 bills due in the next 7 days. Rent $1,800 on 8/13 and Internet $60 on 8/16.'
  if (lower.includes('safe') || lower.includes('spend')) return 'Your safe-to-spend for the next week is about $1,243.56.'
  if (lower.includes('cashflow')) return 'Month-to-date cashflow: income $5,200, expenses $3,185.33, net $2,014.67.'
  if (lower.includes('merchant')) return 'Top merchants in the last 90 days: Amazon $425, Whole Foods $233, Uber $129.'
  if (lower.includes('credit')) return 'Credit utilization is 27.4% across your cards.'
  if (lower.includes('transactions')) return 'Showing the latest 20 transactions in the table to the right.'
  return "Got it. I'll surface relevant cards and details as you browse."
}


