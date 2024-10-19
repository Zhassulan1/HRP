from rest_framework import serializers
from api.models import Vacancy, Employer, Employee, VacancyResponse, Skill, Document


from rest_framework import serializers

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name', 'description', 'level']

class EmployeeSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = Employee
        read_only_fields = ['id']
        fields = [
            'id', 
            'tg_id', 
            'tg_username', 
            'name', 
            'surname', 
            'email', 
            'phone', 
            'skills', 
            'cv_url', 
            'expected_salary', 
            'city'
        ]

    def create(self, validated_data):
        skills_data = validated_data.pop('skills')
        employee = Employee.objects.create(**validated_data)
        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(**skill_data)
            employee.skills.add(skill)
        return employee

    def update(self, instance, validated_data):
        skills_data = validated_data.pop('skills')

        # Update employee fields
        instance.tg_id = validated_data.get('tg_id', instance.tg_id)
        instance.tg_username = validated_data.get('tg_username', instance.tg_username)
        instance.name = validated_data.get('name', instance.name)
        instance.surname = validated_data.get('surname', instance.surname)
        instance.email = validated_data.get('email', instance.email)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.cv_url = validated_data.get('cv_url', instance.cv_url)
        instance.expected_salary = validated_data.get('expected_salary', instance.expected_salary)
        instance.city = validated_data.get('city', instance.city)
        instance.save()

        # Update the related skills
        instance.skills.clear()  # Clear existing skills
        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(**skill_data)
            instance.skills.add(skill)

        return instance

class VacancySerializer(serializers.ModelSerializer):
    required_skills = SkillSerializer(many=True)

    class Meta:
        model = Vacancy
        read_only_fields = ['id']
        fields = [
            'id',
            'title', 
            'description', 
            'required_skills', 
            'employer', 
            'salary_min', 
            'salary_max', 
            'experience', 
            'city', 
            'address', 
            'date_created', 
            'date_closed', 
            'is_active'
        ]

    def create(self, validated_data):
        skills_data = validated_data.pop('required_skills')
        vacancy = Vacancy.objects.create(**validated_data)
        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(**skill_data)
            vacancy.required_skills.add(skill)
        return vacancy

    def update(self, instance, validated_data):
        skills_data = validated_data.pop('required_skills')

        # Update the fields of the Vacancy instance
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.salary_min = validated_data.get('salary_min', instance.salary_min)
        instance.salary_max = validated_data.get('salary_max', instance.salary_max)
        instance.experience = validated_data.get('experience', instance.experience)
        instance.city = validated_data.get('city', instance.city)
        instance.address = validated_data.get('address', instance.address)
        instance.date_closed = validated_data.get('date_closed', instance.date_closed)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()

        # Update the related required_skills
        instance.required_skills.clear()  # Clear existing skills
        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(**skill_data)
            instance.required_skills.add(skill)

        return instance


class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'



class VacancyResponseSerializer(serializers.ModelSerializer):
        class Meta:
            model = VacancyResponse
            fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['uf', 'owner_bin', 'receiver_bin', 'receiver_mail']
