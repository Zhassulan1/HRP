import { MapPin, Briefcase, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface VacancyCardProps {
  id: string
  title: string
  company: string
  description: string
  location: string
  experience: string
  salary_min: string
  salary_max: string
  onSendMessage: () => void
}

export default function VacancyCard({
  id,
  title,
  company,
  description,
  location,
  experience,
  salary_min,
  salary_max,
  onSendMessage
}: VacancyCardProps) {
  return (
      <Link href={`/vacancy/${id}`}> 
        <Card className="w-full max-w-md mx-auto bg-[#1b1b1b] border-none mb-5">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
            <p className="text-muted-foreground">{company}</p>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 text-white">
              <span>{description}</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2 text-white" >
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <span>{experience} Year</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold text-lg">{salary_min} - {salary_max} tenge </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full font-semibold bg-[#2b7efe] hover:bg-[#1a6efd] transition-all duration-300 ease-in-out transform hover:scale-98 active:scale-95" size="lg" onClick={onSendMessage}>
              Откликнуться
            </Button>
          </CardFooter>
        </Card>
      </Link>
      
  )
}