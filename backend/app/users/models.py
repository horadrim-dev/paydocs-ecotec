from typing import Iterable
from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.contrib.auth.base_user import BaseUserManager

class AppUser(AbstractUser):
    pass
