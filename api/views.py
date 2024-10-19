from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.models import Vacancy, Employer, Employee, VacancyResponses
from api.s3 import generate_key, upload_bytes
from api.serializers import VacancySerializer, EmployerSerializer, \
    EmployeeSerializer, VacancyResponsesSerializer


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
    



@csrf_exempt
def upload_cv(request):
    cv = request.FILES['cv']

    cv_key = generate_key('Employeer', "cv", cv.name.replace(' ', '_'))
    cv_url = upload_bytes(cv, cv_key)

    return JsonResponse({'cv_url': cv_url})





# cv = request.FILES['cv']

# cv_key = generate_key('', "original", cv.name)
# cv_url = upload_bytes(cv, cv_key)

# request_data = request.data
# data = {
#     **request_data,
#     'cv_url': cv_url
# }

# serializer = EmployeeSerializer(data=data)