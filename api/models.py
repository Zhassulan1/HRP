from django.db import models

# Create your models here.
class Skill(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=300)
    level = models.IntegerField()


class Employer(models.Model):
    tg_id = models.IntegerField()
    tg_username = models.CharField(max_length=50)

    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    email = models.EmailField()
    phone = models.CharField(max_length=30)


class Vacancy(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    required_skills = models.ManyToManyField(Skill)

    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, null=True, default=None)

    salary_min = models.IntegerField()
    salary_max = models.IntegerField()

    experience = models.IntegerField()
    city = models.CharField(max_length=30)
    address = models.CharField(max_length=100)

    date_created = models.DateTimeField(auto_now_add=True)
    date_closed = models.DateTimeField(null=True, default=None)
    is_active = models.BooleanField(default=True)


class Employee(models.Model):
    tg_id = models.IntegerField()
    tg_username = models.CharField(max_length=50)

    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    
    skills = models.ManyToManyField(Skill)
    cv_url = models.CharField(max_length=300)
    expected_salary = models.IntegerField()
    city = models.CharField(max_length=30)


class VacancyResponses(models.Model):
    id = models.IntegerField(primary_key=True)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)