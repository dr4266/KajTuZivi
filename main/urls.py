from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from main import views

router = routers.DefaultRouter()
router.register(r'uporabniki', views.UporabnikViewSet, base_name='uporabnik')
router.register(r'ogrozenosti', views.OgrozenostViewSet, base_name='ogrozenost')
router.register(r'kvadranti', views.KvadrantViewSet, base_name='kvadranti')
router.register(r'popisi', views.PopisViewSet, base_name='popisi')

urlpatterns = [
    url(r'^', include(router.urls)),
]
