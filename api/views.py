from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.models import Vacancy, Employer, Employee, VacancyResponse, Document
from api.s3 import generate_key, upload_bytes, upload_file
from api.serializers import VacancySerializer, EmployerSerializer, \
    EmployeeSerializer, VacancyResponseSerializer, DocumentSerializer
from io import BytesIO

import os
from dotenv import load_dotenv
load_dotenv()


class EmployerList(APIView):
    def get(self, request):
        employers = Employer.objects.all()
        serializer = EmployerSerializer(employers, many=True)
        print("Eployers:", serializer.data)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = EmployerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class EmployerDetail(APIView):
    def get_object(self, id):
        try:
            return Employer.objects.get(id=id)
        except Employer.DoesNotExist:
            return None

    def get(self, request, id):
        employer = self.get_object(id=id)
        serializer = EmployerSerializer(employer)
        print("Employer:", employer)
        return JsonResponse(serializer.data, safe=False)

    def put(self, request, id):
        employer = self.get_object(id=id)
        if employer is None:
            return Response({'error: employers are not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = EmployerSerializer(employer, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        employer = self.get_object(id=id)
        if employer is None:
            return Response({'error: employer is not found'}, status=status.HTTP_404_NOT_FOUND)
        
        employer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class EmployeeList(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        print("Eployers:", serializer.data)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeDetail(APIView):
    def get_object(self, id):
        try:
            return Employee.objects.get(id=id)
        except Employee.DoesNotExist:
            return None

    def get(self, request, id):
        employee = self.get_object(id=id)
        employee_serializer = EmployeeSerializer(employee)
        print("Employee:", employee)
        return JsonResponse(employee_serializer.data, safe=False)

    def put(self, request, id):
        employee = self.get_object(id=id)
        if employee is None:
            return Response({'error: employees are not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = EmployeeSerializer(employee, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        employee = self.get_object(id=id)
        if employee is None:
            return Response({'error: employee is not found'}, status=status.HTTP_404_NOT_FOUND)
        
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class VacancyList(APIView):
    def get(self, request):
        vacancies = Vacancy.objects.all()
        serializer = VacancySerializer(vacancies, many=True)
        print("Eployers:", serializer.data)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = VacancySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class VacancyDetail(APIView):
    def get_object(self, id):
        try:
            return Vacancy.objects.get(id=id)
        except Vacancy.DoesNotExist:
            return None

    def get(self, request, id):
        vacancy = self.get_object(id=id)
        serializer = VacancySerializer(vacancy)
        print("vacancy:", vacancy)
        return JsonResponse(serializer.data, safe=False)

    def put(self, request, id):
        vacancy = self.get_object(id=id)
        if vacancy is None:
            return Response({'error: vacancies are not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = VacancySerializer(vacancy, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        vacancy = self.get_object(id=id)
        if vacancy is None:
            return Response({'error: vacancy is not found'}, status=status.HTTP_404_NOT_FOUND)
        
        vacancy.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    



class VacancyResponseList(APIView):
    def get(self, request):
        vacancy_responses = VacancyResponse.objects.all()
        serializer = VacancyResponseSerializer(vacancy_responses, many=True)
        print("Eployers:", serializer.data)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = VacancyResponseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class VacancyResponseDetail(APIView):
    def get_object(self, id):
        try:
            return VacancyResponse.objects.get(id=id)
        except VacancyResponse.DoesNotExist:
            return None

    def get(self, request, id):
        vacancy_responses = self.get_object(id=id)
        serializer = VacancyResponseSerializer(vacancy_responses)
        print("VacancyResponse:", vacancy_responses)
        return JsonResponse(serializer.data, safe=False)

    def put(self, request, id):
        vacancy_responses = self.get_object(id=id)
        if vacancy_responses is None:
            return Response({'error: VacancyResponses are not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = VacancyResponseSerializer(vacancy_responses, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        vacancy_responses = self.get_object(id=id)
        if vacancy_responses is None:
            return Response({'error: VacancyResponse is not found'}, status=status.HTTP_404_NOT_FOUND)
        
        vacancy_responses.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





@csrf_exempt
def upload_cv(request):
    cv = request.FILES['cv']

    cv_key = generate_key('Employeer', "cv", cv.name.replace(' ', '_'))
    cv_url = upload_bytes(cv, cv_key)

    return JsonResponse({'cv_url': cv_url})


class UploadDocumentView(APIView):
     def post(self, request):
        if 'uf' not in request.FILES:
            return Response({"error": "Файл не был передан"}, status=status.HTTP_400_BAD_REQUEST)
        
        uf_file = request.FILES['uf']

        uf_file_bytes = BytesIO(uf_file.read())
        uf_file.seek(0)  

        login = os.getenv('LOGIN')
        apikey = os.getenv('API_KEY')
        type_delegate = 1
        
        nametxt = generate_key('Employeer', "uf", uf_file.name.replace(' ', '_'))
        uf_url = upload_bytes(uf_file, nametxt)

        document = Document.objects.create(
            nametxt=nametxt,
            owner_bin=request.data['owner_bin'],
            receiver_bin=request.data['receiver_bin'],
            receiver_mail=request.data.get('receiver_mail'),
            uf=uf_url  
        )
        
        data = {
            'login': login,
            'apikey': apikey,
            'nametxt': nametxt,
            'owner_bin': document.owner_bin,
            'receiver_bin': document.receiver_bin,
            'type_delegate': type_delegate,
            'receiver_mail': document.receiver_mail,
        }

        files = {'uf': ('filename', BytesIO(uf_file_bytes.getbuffer()))}
        response = requests.post('http://api.podpishi.kz/api.php', data=data, files=files)

        if response.status_code == 200:
            return Response({"message": "Документ успешно загружен в API"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Ошибка при отправке документа на API"}, status=response.status_code)
        






# cv = request.FILES['cv']

# cv_key = generate_key('', "original", cv.name)
# cv_url = upload_bytes(cv, cv_key)

# request_data = request.data
# data = {
#     **request_data,
#     'cv_url': cv_url
# }

# serializer = EmployeeSerializer(data=data)