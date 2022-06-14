from django.shortcuts import render
from django.template.response import TemplateResponse

def index(request, *args, **kwargs):
    return render(request, 'index.html')

def indexSPA(request, *args, **kwargs):
    context = {
        'uuid': kwargs.get('uuid')
    }
    print(context)
    return TemplateResponse(request, 'index.html', context)