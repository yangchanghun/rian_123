from django.db import models

# Create your models here.

class PermissonNumber(models.Model):
    email = models.EmailField()
    number = models.IntegerField()