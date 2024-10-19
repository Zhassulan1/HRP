from rest_framework import serializers
from api.models import Vacancy, Employer, Employee, VacancyResponses, Skill


from rest_framework import serializers

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name', 'description', 'level']

class EmployeeSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = Employee
        fields = ['tg_id', 'tg_username', 'name', 'surname', 'email', 'phone', 'skills', 'cv_url', 'expected_salary', 'city']

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
    class Meta:
        model = Vacancy
        fields = '__all__'


class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'



class VacancyResponsesSerializer(serializers.ModelSerializer):
        class Meta:
            model = VacancyResponses
            fields = '__all__'
