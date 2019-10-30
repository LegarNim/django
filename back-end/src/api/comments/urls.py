# from django.urls import path
# from api.views import LessonViewSet, CommentViewSet

# urlpatterns = [
#     path('get/', LessonViewSet.as_view({'get': 'list'})),
#     path('', CommentViewSet.as_view()),
# ]
from rest_framework.routers import DefaultRouter
from api.views import  CommentViewSet

router = DefaultRouter()
router.register(r'', CommentViewSet, base_name='comments')
urlpatterns = router.urls