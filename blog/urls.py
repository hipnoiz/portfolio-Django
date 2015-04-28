from django.conf.urls import url
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="blog/index.html")),
    url(r'^works/', TemplateView.as_view(template_name="blog/works.html")),
    url(r'^contact/', TemplateView.as_view(template_name="blog/contact.html")),
    url(r'^blog/$', views.BlogView.as_view(), name='blog'),
    url(r'^blog/(?P<slug>[^\.]+)/$', views.PostView.as_view(), name='post')
]