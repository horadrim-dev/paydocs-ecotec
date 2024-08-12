from django.contrib import admin
from .models import *

@admin.register(DebtorProkopyevsk)
class DebtorProkopyevskAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtorArtyshta)
class DebtorArtyshtaAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtorKrasnobrod)
class DebtorKrasnobrodAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtorDubrovo)
class DebtorDubrovoAdmin(admin.ModelAdmin):
    pass


@admin.register(DebtProkopyevsk)
class DebtProkopyevskAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtArtyshta)
class DebtArtyshtaAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtKrasnobrod)
class DebtKrasnobrodAdmin(admin.ModelAdmin):
    pass

@admin.register(DebtDubrovo)
class DebtDubrovoAdmin(admin.ModelAdmin):
    pass
