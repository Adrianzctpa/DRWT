from rest_framework import permissions

class AllowIsntAuthenticated(permissions.BasePermission):
    '''
    If user is not authenticated: permission granted.
    '''

    def has_permission(self, request, view):
        try:
            if not request.user.is_authenticated:
                return True
        except AttributeError:
            return False   
