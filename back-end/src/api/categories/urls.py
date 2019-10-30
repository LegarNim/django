from rest_framework.routers import DefaultRouter
from api.views import  CategoryViewSet

router = DefaultRouter()
router.register(r'', CategoryViewSet, base_name='categories')
urlpatterns = router.urls