from django.db import models
from django.template.defaultfilters import slugify

from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    text = models.TextField()
    created_on = models.DateTimeField('date published')
    category = models.ForeignKey('blog.Category')


    def __unicode__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
        	self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)

    @models.permalink
    def get_absolute_url(self):
        return ('view_blog_post', (),
        	{
        		'slug' :self.slug,
        	})

class Category(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __unicode__(self):
        return self.title

    @models.permalink
    def get_absolute_url(self):
        return ('view_blog_category', (),
            {
                'slug' :self.slug,
            })


# class Comment(models.Model):
#     name = models.CharField(max_length=42)
#     email = models.EmailField(max_length=75)
#     text = models.TextField()
#     post = models.ForeignKey(Post)
#     created_on = models.DateTimeField(auto_now_add=True)\

#     def __unicode__(self):
#         return self.text
    

    
    	