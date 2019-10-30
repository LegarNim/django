from django.db import models
from users.models import UserAuth
from django.urls import reverse

# Lessons ----------------------------------------------------------------


class Category(models.Model):
    title = models.CharField(max_length=20)

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(UserAuth, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    lesson = models.ForeignKey('Lesson',
                               related_name='lessons',
                               on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class Lesson(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField()
    categories = models.ManyToManyField(Category)
    timestamp = models.DateTimeField(auto_now_add=True)
    teacher = models.ForeignKey(UserAuth, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    @property
    def get_comments(self):
        return Comment.objects.filter(lesson=self).all().order_by('-timestamp')

    @property
    def comment_count(self):
        return Comment.objects.filter(lesson=self).count()


# Lessons ----------------------------------------------------------------

# Tests ------------------------------------------------------------------


class Assignment(models.Model):
    title = models.CharField(max_length=50)
    teacher = models.ForeignKey(UserAuth, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class GradedAssignment(models.Model):
    student = models.ForeignKey(UserAuth, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment,
                                   on_delete=models.SET_NULL,
                                   blank=True,
                                   null=True)
    grade = models.FloatField()

    def __str__(self):
        return self.student.username


class Choice(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Question(models.Model):
    question = models.CharField(max_length=200)
    choices = models.ManyToManyField(Choice)
    answer = models.ForeignKey(Choice,
                               on_delete=models.CASCADE,
                               related_name='answer',
                               blank=True,
                               null=True)
    assignment = models.ForeignKey(Assignment,
                                   on_delete=models.CASCADE,
                                   related_name='questions',
                                   blank=True,
                                   null=True)
    order = models.SmallIntegerField()

    def __str__(self):
        return self.question


# Tests ------------------------------------------------------------------
