import { ChevronDown, LucideIcon } from "lucide-react";
import { NextApiRequest, NextApiResponse } from "next";

export interface FAQ {
  title: string;
  icon: LucideIcon;
  text: string;
}

const faqsData: FAQ[] = [
  { title: 'First', icon: ChevronDown, text: 'lorem ipsum dolor sit amet consecuteur adipiscing elit' },
  { title: 'Second', icon: ChevronDown, text: 'lorem ipsum dolor sit amet consecuteur adipiscing elit' },
  { title: 'Third', icon: ChevronDown, text: 'lorem ipsum dolor sit amet consecuteur adipiscing elit' },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      res.status(200).json(faqsData)
    } catch (error) {
      res.status(500).json({ message: 'Failed fetching FAQs' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}