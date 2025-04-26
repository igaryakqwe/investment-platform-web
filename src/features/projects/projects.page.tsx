"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "./components/project-card"
import { CreateProjectModal } from "./components/create-project-modal"
import { Plus, Sparkles } from 'lucide-react'

// Приклад даних проєктів
const projectsData = [
  {
    id: "1",
    name: "Відновлення електростанції",
    description: "Проєкт з відновлення електростанції у Харківській області для забезпечення енергією місцевих громад.",
    category: "Енергетика",
    address: "Харківська область, м. Ізюм",
    mainImage: "/placeholder.svg?height=300&width=400",
    progress: 65,
    roi: "15-20% річних",
    product: {
      name: "Трансформатори",
      amount: 15
    }
  },
  {
    id: "2",
    name: "Відбудова водоочисної станції",
    description: "Відновлення водоочисної станції для забезпечення чистою водою населення Миколаївської області.",
    category: "Інфраструктура",
    address: "Миколаївська область, м. Баштанка",
    mainImage: "/placeholder.svg?height=300&width=400",
    progress: 40,
    roi: "12-18% річних",
    product: {
      name: "Фільтри та насоси",
      amount: 8
    }
  },
  {
    id: "3",
    name: "Модернізація хлібозаводу",
    description: "Модернізація хлібозаводу для забезпечення хлібобулочними виробами населення Київської області.",
    category: "Харчова промисловість",
    address: "Київська область, м. Бровари",
    mainImage: "/placeholder.svg?height=300&width=400",
    progress: 80,
    roi: "20-25% річних",
    product: {
      name: "Печі та тістомісильні машини",
      amount: 5
    }
  },
  {
    id: "4",
    name: "Відновлення школи",
    description: "Відбудова та модернізація школи, пошкодженої внаслідок бойових дій.",
    category: "Освіта",
    address: "Чернігівська область, м. Чернігів",
    mainImage: "/placeholder.svg?height=300&width=400",
    progress: 30,
    roi: "10-15% річних",
    product: {
      name: "Меблі та комп'ютерне обладнання",
      amount: 50
    }
  },
  {
    id: "5",
    name: "Реконструкція лікарні",
    description: "Реконструкція та оснащення лікарні сучасним медичним обладнанням.",
    category: "Медицина",
    address: "Сумська область, м. Суми",
    mainImage: "/placeholder.svg?height=300&width=400",
    progress: 55,
    roi: "15-20% річних",
    product: {
      name: "Медичне обладнання",
      amount: 12
    }
  },
  {
    id: "6",
    name: "Відновлення мосту",
    description: "Відбудова зруйнованого мосту, що з'єднує два населені пункти.",
    category: "Інфраструктура",
    address: "Запорізька область, м. Запоріжжя",
    mainImage: "/placeholder.svg?height=300&width=400",
    progress: 25,
    roi: "10-15% річних",
    product: {
      name: "Будівельні матеріали та техніка",
      amount: 20
    }
  }
]

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <div className="container px-4 md:px-6 py-8 md:py-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="space-y-3 mb-4 md:mb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Проєкти відбудови</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Проєкти, які шукають <span className="text-primary">інвесторів</span>
          </h1>
          <p className="text-muted-foreground md:text-lg max-w-[700px]">
            Ознайомтеся з проєктами, які потребують обладнання для відбудови та розвитку.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="lg"
          className="gap-2 rounded-full"
        >
          <Plus className="h-5 w-5" />
          Створити проєкт
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default ProjectsPage;