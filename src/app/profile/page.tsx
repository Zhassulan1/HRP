'use client'

import WebApp from "@twa-dev/sdk";
import { Button } from "@/components/ui/button";
import MobileNavigation from "../components/mobile-navigation";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { getData } from "../api/getData";

export default function ProfilePage() {
    
    const [hasResume, setHasResume] = useState(false); // Статус наличия резюме

    async function checkEmployeeByUsername(username: string) {
        try {
            const response = await getData('employee');
          
            // Проверяем, есть ли работник с данным никнеймом
            
            const employeeExists = response.some((employee: { tg_username: string; }) => employee.tg_username === username);
      
            return employeeExists;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    useEffect(() => {
        WebApp.ready(); // Инициализация WebApp
    
        // Получаем данные о пользователе из initDataUnsafe
        const user = WebApp.initDataUnsafe?.user;
        if (user) {

            // Проверяем наличие резюме пользователя
            checkEmployeeByUsername(user.username || "").then((exists) => {
                setHasResume(exists); // Устанавливаем наличие резюме
            });
        }
    }, []);

    const router = useRouter();
    const createResume = () => {
        router.push('/createResume');
    };

    return (
        <div className="p-5">

            <div className="bg-[#1b1b1b] rounded-[8px] p-4 flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" className="w-12" ><path d="M 25 2.0078125 C 12.309296 2.0078125 2.0000002 12.317108 2 25.007812 C 2 37.112262 11.38131 47.043195 23.259766 47.935547 C 23.283185 47.93745 23.306613 47.939576 23.330078 47.941406 C 23.882405 47.981205 24.437631 48.007812 25 48.007812 C 25.562369 48.007812 26.117595 47.981205 26.669922 47.941406 C 26.693387 47.939576 26.716815 47.93745 26.740234 47.935547 C 38.61869 47.043195 48 37.112262 48 25.007812 C 48 12.317108 37.690704 2.0078125 25 2.0078125 z M 25 4.0078125 C 36.609824 4.0078125 46 13.397988 46 25.007812 C 46 30.739515 43.704813 35.924072 39.990234 39.710938 C 38.401074 38.55372 36.437194 37.863387 34.677734 37.246094 C 32.593734 36.516094 30.622172 35.824094 30.076172 34.621094 C 29.990172 33.594094 29.997859 32.792094 30.005859 31.871094 L 30.007812 31.480469 C 30.895813 30.635469 32.012531 28.852078 32.394531 27.205078 C 33.054531 26.853078 33.861516 26.009281 34.103516 23.988281 C 34.224516 22.985281 33.939062 22.2085 33.539062 21.6875 C 34.079062 19.8325 35.153484 15.136469 33.271484 12.105469 C 32.475484 10.824469 31.274313 10.016266 29.695312 9.6972656 C 28.808312 8.5992656 27.134484 8 24.896484 8 C 21.495484 8.063 19.002234 9.1047031 17.490234 11.095703 C 15.707234 13.445703 15.370328 16.996297 16.486328 21.654297 C 16.073328 22.175297 15.775438 22.963328 15.898438 23.986328 C 16.141438 26.007328 16.945469 26.851125 17.605469 27.203125 C 17.987469 28.852125 19.103188 30.635469 19.992188 31.480469 L 19.994141 31.861328 C 20.002141 32.786328 20.009828 33.590094 19.923828 34.621094 C 19.375828 35.827094 17.394781 36.526625 15.300781 37.265625 C 13.551886 37.88319 11.599631 38.574586 10.013672 39.716797 C 6.2962191 35.929504 4 30.742023 4 25.007812 C 4.0000002 13.397989 13.390176 4.0078125 25 4.0078125 z"/></svg>

                <div className="flex flex-col gap-0 ">
                    <p className="text-xs text-[#b0b0b0]">Профиль</p>
                    <p className="text-base text-slate-300">Олжас Ахметов</p>
                </div>
            </div>

            {!hasResume ? (
                <div className="m-auto flex items-center flex-col mt-[40px]">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" className="w-24 h-24 fill-[#1b1b1b]">
                        <path d="M 30.398438 2 L 7 2 L 7 48 L 43 48 L 43 14.601563 Z M 15 28 L 31 28 L 31 30 L 15 30 Z M 35 36 L 15 36 L 15 34 L 35 34 Z M 35 24 L 15 24 L 15 22 L 35 22 Z M 30 15 L 30 4.398438 L 40.601563 15 Z"/>
                    </svg>
                    <h3 className="text-[#bbbbbb] font-bold text-[20px] mt-5">У вас пока нет резюме</h3>

                    <Button onClick={createResume} className="w-full mt-20 font-semibold bg-[#2b7efe] hover:bg-[#1a6efd] transition-all duration-300 ease-in-out transform hover:scale-98 active:scale-95" size="lg">
                        Создать резюме
                    </Button>
                </div>
            ) : (
                <div className="text-white">У ВАС ЕСТЬ РЕЗЮМЕ</div> // Если резюме есть, ничего не показываем
            )}

            <MobileNavigation/>
        </div>
    );
}
