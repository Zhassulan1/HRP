from django.urls import path

from api import views


urlpatterns = [
    path('employer', views.EmployerList.as_view()),
    path('employer/<int:id>', views.EmployerDetail.as_view()),
    path('employee', views.EmployeeList.as_view()),
    path('employee/<int:id>', views.EmployeeDetail.as_view()),
]