"use client"

import { useEffect, useState } from "react"
import { FAQ } from "../api/faqs"

const FaqPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([])

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('/api/faqs')
        const data = await response.json()
        setFaqs(data)
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchFaqs()
  }, [])

  console.log(faqs)

  // TODO: Faq
  return (
    <div className="bg-black">
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3>{faq.title}</h3>
          <p>{faq.text}</p>
        </div>
      ))}
    </div>
  )
}

export default FaqPage