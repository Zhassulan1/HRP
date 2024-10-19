from django.urls import path

from api import views


urlpatterns = [
    path('employer', views.EmployerList.as_view()),
    path('employer/<int:id>', views.EmployerDetail.as_view()),
    path('employee', views.EmployeeList.as_view()),
    path('employee/<int:id>', views.EmployeeDetail.as_view()),

    path('vacancy', views.VacancyList.as_view()),
    path('vacancy/<int:id>', views.VacancyDetail.as_view()),

    path('vacancy_response', views.VacancyResponseList.as_view()),
    path('vacancy_response/<int:id>', views.VacancyResponseDetail.as_view()),

    path('upload_cv', views.upload_cv),
    path('upload_document', views.UploadDocumentView.as_view()),
]