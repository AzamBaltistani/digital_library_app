from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile, Author
from .serializers import RegisterSerializer, UserRoleUpdateSerializer, AuthorSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        author_profile = None
        if user.profile.role == "author":
            author_obj = getattr(user, "author_profile", None)
            if author_obj:
                author_profile = AuthorSerializer(author_obj).data

        return Response({
            "username": user.username,
            "email": user.email,
            "role": user.profile.role,
            "author_profile": author_profile
        })

class UpdateUserRoleView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserRoleUpdateSerializer
    permission_classes = [permissions.IsAdminUser]  # only admin can change role

class BecomeAuthorView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        
        if user.profile.role == "author":
            return Response({"detail": "You are already an author."}, status=status.HTTP_400_BAD_REQUEST)

        # This ensures no duplicate author profiles
        author_profile, created = Author.objects.get_or_create(user=user)

        # Update fields if sent
        author_profile.bio = request.data.get("bio", author_profile.bio)
        author_profile.website = request.data.get("website", author_profile.website)
        author_profile.save()

        # Also update UserProfile role
        user.profile.role = "author"
        user.profile.save()

        return Response({
            "message": "You are now an author!",
            "created": created,
            "author_id": author_profile.id,
            "bio": author_profile.bio,
            "website": author_profile.website,
            "role": user.profile.role
        }, status=status.HTTP_200_OK)

class ToggleRoleView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_profile = request.user.profile

        if user_profile.role == "author":
            user_profile.role = "user"   # still keeps Author model data!
        elif user_profile.role == "user" and hasattr(request.user, "author_profile"):
            user_profile.role = "author"
        else:
            return Response(
                {"error": "You must become an author first before switching to author role."},
                status=400
            )

        user_profile.save()
        return Response({"message": f"Role switched to {user_profile.role}"})
    