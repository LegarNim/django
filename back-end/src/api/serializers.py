from rest_framework import serializers, generics

from users.models import UserAuth
from .models import Lesson, Category, Comment, Assignment, Question, Choice, GradedAssignment
from django.shortcuts import get_object_or_404


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

# Lessons ----------------------------------------------------------------

class LessonSerializer(serializers.ModelSerializer):
    categories = serializers.SlugRelatedField(many=True,
                                              read_only=True,
                                              slug_field='title')

    teacher = serializers.SlugRelatedField(many=False,
                                           read_only=True,
                                           slug_field='username')

    class Meta:
        model = Lesson
        fields = ('__all__')        

    def create(self, request):
        data = request.data
        print(data)

        lesson = Lesson()

        teacher = get_object_or_404(UserAuth, username=data['teacher'])
        lesson.teacher = teacher
        lesson.title = data['title']
        lesson.body = data['body']
        lesson.save()
        for c in data['categories']:
            categories = get_object_or_404(Category, title=c)
            lesson.categories.add(categories)

        return lesson

    def get_comments(self, cid):
        queryset = Lesson.objects.get(id=cid).get_comments
        return queryset

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('__all__')

class CommentSerializer(serializers.ModelSerializer):

    user = serializers.SlugRelatedField(many=False,
                                           read_only=True,
                                           slug_field='username')

    class Meta:
        model = Comment
        fields = ('__all__')

    def create(self, request):
        data = request.data
        print(data)

        comment = Comment()

        user = get_object_or_404(UserAuth, username=data['user'])
        lesson = get_object_or_404(Lesson, id=data['lesson'])
        comment.user = user
        comment.content = data['content']
        comment.lesson = lesson
        comment.save()

        return comment

# Lessons ----------------------------------------------------------------

# Tests ------------------------------------------------------------------

class QuestionSerializer(serializers.ModelSerializer):
    choices = StringSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'choices', 'question', 'order')


class AssignmentSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    teacher = StringSerializer(many=False)

    class Meta:
        model = Assignment
        fields = ('__all__')

    def get_questions(self, obj):
        questions = QuestionSerializer(obj.questions.all(), many=True).data
        return questions

    def create(self, request):
        data = request.data

        assignment = Assignment()
        teacher = UserAuth.objects.get(username=data['teacher'])
        assignment.teacher = teacher
        assignment.title = data['title']
        assignment.save()

        order = 1
        for q in data['questions']:
            newQ = Question()
            newQ.question = q['title']
            newQ.order = order
            newQ.save()

            for c in q['choices']:
                newC = Choice()
                newC.title = c
                newC.save()
                newQ.choices.add(newC)

            newQ.answer = Choice.objects.filter(title='yes')
            newQ.assignment = assignment
            newQ.save()
            order += 1
        return assignment


class GradedAssignmentSerializer(serializers.ModelSerializer):
    student = StringSerializer(many=False)

    class Meta:
        model = GradedAssignment
        fields = ('__all__')

    def create(self, request):
        data = request.data
        print(data)

        assignment = Assignment.objects.get(id=data['asntId'])
        student = UserAuth.objects.get(username=data['username'])

        graded_asnt = GradedAssignment()
        graded_asnt.assignment = assignment
        graded_asnt.student = student

        questions = [q for q in assignment.questions.all()]
        answers = [data['answers'][a] for a in data['answers']]

        answered_correct_count = 0
        for i in range(len(questions)):
            if questions[i].answer.title == answers[i]:
                answered_correct_count += 1
            i += 1

        grade = answered_correct_count / len(questions) * 100
        graded_asnt.grade = grade
        graded_asnt.save()
        return graded_asnt


# Tests ------------------------------------------------------------------