from rest_framework.routers import DefaultRouter
from api.views import LessonViewSet

router = DefaultRouter()
router.register(r'', LessonViewSet, base_name='lessons')
urlpatterns = router.urls