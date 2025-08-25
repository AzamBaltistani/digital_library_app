from rest_framework import generics, permissions
from .models import Content
from .serializers import ContentSerializer
from .permissions import IsAuthorOrAdmin

class ContentListView(generics.ListAPIView):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    permission_classes = [permissions.AllowAny]

class ContentCreateView(generics.CreateAPIView):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrAdmin]

    def perform_create(self, serializer):
        author = self.request.user.author_profile
        serializer.save(author=author)

class ContentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrAdmin]

from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(["GET"])
def explore_contents(request, content_type=None, filter_type=None):
    queryset = Content.objects.all()
    
    if content_type == "books":
        queryset = queryset.filter(content_type="book")
    elif content_type == "articles":
        queryset = queryset.filter(content_type="article")
    elif content_type == "thesis":
        queryset = queryset.filter(content_type="thesis")
    
    if filter_type == "free":
        queryset = queryset.filter(is_free=True)
    elif filter_type == "free-to-borrow":
        queryset = queryset.filter(price_borrow=0)
    elif filter_type == "most-downloaded":
        queryset = queryset.order_by("-download_count")
    elif filter_type == "most-borrowed":
        queryset = queryset.order_by("-borrowed_count")

    serializer = ContentSerializer(queryset, many=True)
    return Response(serializer.data)
