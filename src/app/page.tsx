'use client';
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import MobileNavigation from './components/mobile-navigation';
import { Search } from 'lucide-react';
import VacancyCard from './components/vacancy-card';
import { getData } from './api/getData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [vacancies, setVacancies] = useState<any[]>([]); // Задаем тип данных как массив и начальное значение
  const [filteredVacancies, setFilteredVacancies] = useState<any[]>([]); // Для фильтрованных вакансий

  useEffect(() => {
    WebApp.ready(); // Инициализация Mini App в Telegram
    getAllVacancy();
  }, []);

  const getAllVacancy = async () => {
    const response = await getData('vacancy');
    const vacancyList = response.results || [];
    setVacancies(vacancyList);
    setFilteredVacancies(vacancyList); // Изначально показываем все вакансии
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Фильтрация вакансий на основе запроса
    const filtered = vacancies.filter((vacancy) => {
      return (
        vacancy.title.toLowerCase().includes(query) ||
        vacancy.address.toLowerCase().includes(query) ||
        vacancy.city.toLowerCase().includes(query)
      );
    });

    setFilteredVacancies(filtered); // Обновляем список фильтрованных вакансий
  };

  const handleSendMessage = () => {
    console.log('Send message clicked');
  };

  return (
    <div className="p-3 pb-16">
      <div className="flex gap-5">
        <form className="relative w-full max-w-md">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Должность, ключевые слова"
            className="w-full py-2 pl-10 pr-4 text-white bg-[#1b1b1b] border rounded-[8px] focus:outline-none border-blue-500 focus:border-blue-500"
            aria-label="Search"
          />
          <div
            className="absolute inset-y-0 left-0 flex items-center pl-3"
            aria-label="Submit search"
          >
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </form>
      </div>

      <h2 className="text-white text-3xl font-semibold mt-5 mb-5">
        Вакансии для вас
      </h2>

      {filteredVacancies.length > 0 ? (
        filteredVacancies.map((el) => (
          <VacancyCard
            key={el.id}
            id={el.id}
            title={el.title}
            company={el.address}
            description={el.description}
            location={el.city}
            experience={el.experience}
            salary_min={el.salary_min}
            salary_max={el.salary_max}
            onSendMessage={handleSendMessage}
          />
        ))
      ) : (
        <p className="text-white">Нет доступных вакансий</p>
      )}

      <MobileNavigation />
    </div>
  );
}
