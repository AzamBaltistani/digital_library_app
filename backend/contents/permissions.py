from rest_framework import permissions

class IsAuthorOrAdmin(permissions.BasePermission):
    """
    Custom permission: Only users with role 'author' or 'admin' can create/update/delete content.
    """
    def has_permission(self, request, view):
        # Must be authenticated
        if not request.user or not request.user.is_authenticated:
            return False

        # Check role
        role = getattr(request.user.profile, "role", None)
        return role in ["author", "admin"]

    def has_object_permission(self, request, view, obj):
        # Admin can do everything
        if request.user.profile.role == "admin":
            return True

        # Author can only modify their own objects
        if request.user.profile.role == "author":
            return obj.author.user == request.user

        return False
