"use client";
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { postData } from "../api/postData";
import { useRouter } from 'next/navigation'

const steps = ["Personal Info", "Skills", "Final Step"];

export default function ResumeSteps() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    tg_id: 0,
    tg_username: "",
    name: "",
    surname: "",
    email: "",
    phone: 0,
    skills: [
      { name: "", description: "", level: 0 },
    ],
    cv_url: "https://s3.bucket.com/my_cv",
    expected_salary: 0,
    city: "",
  });

  useEffect(() => {
    WebApp.ready(); // Инициализация WebApp

    // Получаем данные о пользователе из initDataUnsafe
    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      setFormData((prev) => ({
        ...prev,
        tg_id: user.id,
        tg_username: user.username || "",
      }));
    }
  }, []);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleInputChange = (field: string, value: string | number | object) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "expected_salary" ? Number(value) : value,  // Преобразуем только expected_salary в число
    }));
  };

  const handleSkillChange = (index: number, field: string, value: string) => {
    const updatedSkills = formData.skills.map((skill, i) =>
      i === index ? { ...skill, [field]: field === "level" ? Number(value) : value } : skill // Преобразуем только level в число
    );
    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  const handleAddSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: "", description: "", level: 0 }],
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);

    const response = await postData('employee', formData);

    console.log(response);

    
    router.push('/')
    

    // Здесь можно отправить объект на сервер
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-black text-white rounded-lg">
      <h1 className="text-3xl font-bold text-center">Create Your CV</h1>

      <div className="relative">
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex-1 text-xs text-center ${index <= currentStep ? "text-blue-500" : "text-gray-500"}`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-600 rounded-full">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 0 && <PersonalInfoStep formData={formData} handleInputChange={handleInputChange} />}
          {currentStep === 1 && (
            <SkillsStep
              skills={formData.skills}
              handleSkillChange={handleSkillChange}
              handleAddSkill={handleAddSkill}
            />
          )}
          {currentStep === 2 && (
            <FinalStep formData={formData} handleInputChange={handleInputChange} />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 0} variant="outline" className="text-black border-gray-500">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} className="bg-blue-500 text-white hover:bg-blue-600">
            Submit
          </Button>
        ) : (
          <Button onClick={nextStep} className="bg-blue-500 text-white hover:bg-blue-600">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function PersonalInfoStep({ formData, handleInputChange }: { formData: any, handleInputChange: (field: string, value: string) => void }) {
  return (
    <div className="space-y-4">
      <Label className="text-white">Name</Label>
      <Input
        placeholder="Anthony"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        className="bg-gray-800 text-white border-gray-600"
      />
      <Label className="text-white">Surname</Label>
      <Input
        placeholder="Howard"
        value={formData.surname}
        onChange={(e) => handleInputChange("surname", e.target.value)}
        className="bg-gray-800 text-white border-gray-600"
      />
      <Label className="text-white">Email</Label>
      <Input
        placeholder="mail@admin.com"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        className="bg-gray-800 text-white border-gray-600"
      />
      <Label className="text-white">Phone</Label>
      <Input
        placeholder="+7 777 777 77 77"
        value={formData.phone}
        onChange={(e) => handleInputChange("phone", e.target.value)}
        className="bg-gray-800 text-white border-gray-600"
      />
    </div>
  );
}

function SkillsStep({ skills, handleSkillChange, handleAddSkill }: { skills: any[], handleSkillChange: (index: number, field: string, value: string) => void, handleAddSkill: () => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Skills</h2>
      {skills.map((skill, index) => (
        <div key={index} className="space-y-2">
          <Label htmlFor={`skill-name-${index}`} className="text-white">Skill Name</Label>
          <Input
            id={`skill-name-${index}`}
            placeholder="e.g., speak"
            value={skill.name}
            onChange={(e) => handleSkillChange(index, "name", e.target.value)}
            className="bg-gray-800 text-white border-gray-600"
          />
          <Label htmlFor={`skill-desc-${index}`} className="text-white">Description</Label>
          <Textarea
            id={`skill-desc-${index}`}
            placeholder="e.g., speaking ability"
            value={skill.description}
            onChange={(e) => handleSkillChange(index, "description", e.target.value)}
            className="bg-gray-800 text-white border-gray-600"
          />
          <Label htmlFor={`skill-level-${index}`} className="text-white">Level</Label>
          <Input
            id={`skill-level-${index}`}
            placeholder="e.g., 3"
            value={Number(skill.level)}
            onChange={(e) => handleSkillChange(index, "level", e.target.value)}
            className="bg-gray-800 text-white border-gray-600"
          />
        </div>
      ))}
      <Button onClick={handleAddSkill} className="bg-blue-500 text-white">
        Add Skill
      </Button>
    </div>
  );
}

function FinalStep({ formData, handleInputChange }: { formData: any, handleInputChange: (field: string, value: string) => void }) {
  return (
    <div className="space-y-4">
      <Label className="text-white">Expected Salary</Label>
      <Input
        placeholder="300000"
        value={Number(formData.expected_salary) }
        onChange={(e) => handleInputChange("expected_salary", e.target.value)}
        className="bg-gray-800 text-white border-gray-600"
      />
      <Label className="text-white">City</Label>
      <Input
        placeholder="Almaty"
        value={formData.city}
        onChange={(e) => handleInputChange("city", e.target.value)}
        className="bg-gray-800 text-white border-gray-600"
      />
    </div>
  );
}