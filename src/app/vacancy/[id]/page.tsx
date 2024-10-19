'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import VacancyCard from '../../components/vacancy-card';
import { getData } from '@/app/api/getData';
import MobileNavigation from '@/app/components/mobile-navigation';

// Определим тип для вакансии
interface Vacancy {
  id: string;
  title: string;
  address: string; // Используем address вместо company
  description: string;
  city: string;
  experience: string;
  salary_min: string;
  salary_max: string;
}

export default function VacancyPage() {
  const { id } = useParams();
  
  const [vacancies, setVacancies] = useState<Vacancy[]>([]); // Хранит список вакансий
  const [vacancy, setVacancy] = useState<Vacancy | null>(null); // Текущая вакансия
  
  // Получаем все вакансии
  useEffect(() => {
    const getAllVacancy = async () => {
      const response = await getData('vacancy');
      
      if (response && response.results) {
        
        setVacancies(response.results); // Устанавливаем вакансии
      }
    };
    
    getAllVacancy();
  }, []);

  // Найдем вакансию по id
  useEffect(() => {
    if (id && vacancies.length > 0) {
  
      const foundVacancy = vacancies.find((vacancy) => vacancy.id == id);
  
      if (foundVacancy) {
        console.log("Найдена вакансия:", foundVacancy);
        
        const transformedVacancy: Vacancy = {
          id: foundVacancy.id,
          title: foundVacancy.title,
          address: foundVacancy.address || 'Адрес не указан',
          description: foundVacancy.description || 'Описание вакансии отсутствует',
          city: foundVacancy.city,
          experience: foundVacancy.experience,
          salary_min: foundVacancy.salary_min,
          salary_max: foundVacancy.salary_max
        };
        setVacancy(transformedVacancy);
      } else {
        console.log("Вакансия не найдена");
      }
    }
  }, [id, vacancies]);

  if (!vacancy) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <VacancyCard
        key={vacancy.id}
        id={vacancy.id}
        title={vacancy.title}
        company={vacancy.address} // Здесь вместо location передается address
        description={vacancy.description} // Добавлено описание
        location={vacancy.city} // city вместо location
        experience={vacancy.experience}
        salary_min={vacancy.salary_min} // минимальная зарплата
        salary_max={vacancy.salary_max} // максимальная зарплата
        onSendMessage={() => alert("Отклик!")}
      />
              <MobileNavigation/>
    </div>
  );
}
