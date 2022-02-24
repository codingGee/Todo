from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    
    # class Meta:
    #     verbose_plural = 'todo'
        
    def __str__(self):
        return self.title 
