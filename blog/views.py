from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.core.urlresolvers import reverse
from django.views import generic

from .models import Post, Category

class BlogView(generic.ListView):
    template_name = 'blog/blog.html'
    context_object_name = 'latest_post_list'

    def get_queryset(self):
        return Post.objects.order_by('-created_on')[:6]

class PostView(generic.DetailView):
    model = Post
    template_name = 'blog/post.html'