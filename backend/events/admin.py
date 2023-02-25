from django.contrib import admin
from .models import *
# Register your models here.


class EventAdmin(admin.ModelAdmin):

    class Meta:
        model = Event
        fields = '__all__'


admin.site.register(Event, EventAdmin)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(EventVideo)
admin.site.register(EventImages)
admin.site.register(EventAddMoreText)
admin.site.register(Introduction)
