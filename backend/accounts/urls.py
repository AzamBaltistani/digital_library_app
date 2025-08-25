from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, ProfileView, UpdateUserRoleView, BecomeAuthorView, ToggleRoleView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/profile/', ProfileView.as_view(), name='profile'),
    path('users/<int:pk>/role/', UpdateUserRoleView.as_view(), name='update_user_role'),
    path('users/become-author/', BecomeAuthorView.as_view(), name='become_author'),
    path("users/toggle-role/", ToggleRoleView.as_view(), name="toggle-role"),
]
