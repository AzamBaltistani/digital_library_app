from django.urls import path
from .views import ContentListView, ContentCreateView, ContentDetailView, explore_contents

urlpatterns = [
    path("contents/", ContentListView.as_view(), name="content_list"),
    path("contents/create/", ContentCreateView.as_view(), name="content_create"),
    path("contents/<int:pk>/", ContentDetailView.as_view(), name="content_detail"),

    # Explore endpoints
    path("contents/explore/", explore_contents, name="explore_all"),
    path("contents/explore/<str:content_type>/", explore_contents, name="explore_content_type"),
    path("contents/explore/<str:content_type>/<str:filter_type>/", explore_contents, name="explore_content_with_filter"),
]
