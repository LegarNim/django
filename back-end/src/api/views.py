from users.models import UserAuth
from rest_framework import viewsets
from rest_framework.generics import ListAPIView, CreateAPIView
from .serializers import (
    LessonSerializer, 
    CategorySerializer, 
    CommentSerializer, 
    AssignmentSerializer, 
    GradedAssignmentSerializer
)
from .models import Lesson, Category, Comment, Assignment, GradedAssignment
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.status import (HTTP_201_CREATED, HTTP_400_BAD_REQUEST)

# Lessons ----------------------------------------------------------------

class LessonViewSet(viewsets.ModelViewSet):

    queryset = Lesson.objects.all().order_by('-timestamp')
    serializer_class = LessonSerializer

    def create(self, request):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            lesson = serializer.create(request)
            if lesson:
                return Response(status=HTTP_201_CREATED)
        print(serializer.errors)
        return Response(status=HTTP_400_BAD_REQUEST)

class LessonViewSetList(viewsets.ModelViewSet):

    queryset = Lesson.objects.all().order_by('-timestamp')
    serializer_class = LessonSerializer

    def list(self, request):
        queryset = Lesson.objects.filter(teacher=request.query_params.get('id', None))
        serializer = LessonSerializer(queryset, many=True)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-timestamp')
    serializer_class = CommentSerializer

    def create(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            comment = serializer.create(request)
            if comment:
                return Response(status=HTTP_201_CREATED)
        print(serializer.errors)
        return Response(status=HTTP_400_BAD_REQUEST)

    

class CommentViewSetList(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-timestamp')
    serializer_class = CommentSerializer

    def list(self, request):
        queryset = Comment.objects.filter(lesson=request.query_params.get('id', None))
        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data)

class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Lessons ----------------------------------------------------------------

# Tests ------------------------------------------------------------------

class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()

    def create(self, request):
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            assignment = serializer.create(request)
            if assignment:
                return Response(status=HTTP_201_CREATED)
        print(serializer.errors)
        return Response(status=HTTP_400_BAD_REQUEST)


class GradedAssignmentListView(ListAPIView):
    serializer_class = GradedAssignmentSerializer

    def get_queryset(self):
        queryset = GradedAssignment.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(student__username=username)
        return queryset


class GradedAssignmentCreateView(CreateAPIView):
    serializer_class = GradedAssignmentSerializer
    queryset = GradedAssignment.objects.all()

    def post(self, request):
        print(request.data)
        serializer = GradedAssignmentSerializer(data=request.data)
        serializer.is_valid()
        graded_assignment = serializer.create(request)
        if graded_assignment:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


# Tests ------------------------------------------------------------------