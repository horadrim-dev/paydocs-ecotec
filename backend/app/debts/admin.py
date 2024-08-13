from django.contrib import admin
from .models import *

@admin.register(DebtorProkopyevsk)
class DebtorProkopyevskAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtorMyski)
class DebtorMyskiAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtorKrasnobrod)
class DebtorKrasnobrodAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtorKiselevsk)
class DebtorKiselevskAdmin(admin.ModelAdmin):
    pass


@admin.register(DebtProkopyevsk)
class DebtProkopyevskAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtMyski)
class DebtMyskiAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtKrasnobrod)
class DebtKrasnobrodAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtKiselevsk)
class DebtKiselevskAdmin(admin.ModelAdmin):
    pass
