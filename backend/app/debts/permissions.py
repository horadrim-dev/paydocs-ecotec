from rest_framework import permissions
from .cities_params import CITIES_PARAMS

# class IsOwnerOfObject(permissions.BasePermission):
#     """Allows to edit object only for his owner"""

#     def has_object_permission(self, request, view, obj):
#         return obj == request.user


# class IsStaff(permissions.BasePermission):
#     """
#     Allow to Staff
#     """

#     def has_permission(self, request, view):
#         return request.user.is_staff

class IsCityParamDefined(permissions.BasePermission):
    """
    Allow only for request that have valid query param "gorod" 
    """
    message = 'Gorod was not provided or incorrect.'

    def has_permission(self, request, view):
        city = request.query_params.get("gorod", None)

        if city and city in CITIES_PARAMS.keys():
            return True

        return False

