from rest_framework import serializers
from events.models import Event, EventImages, EventVideo, EventAddMoreText, Introduction, Category, SubCategory


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'


class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImages
        fields = ("image",)


class EventVideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventVideo
        fields = ("video",)


class EventTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventAddMoreText
        fields = ("text",)


class EventSerializer(serializers.ModelSerializer):
    event_video = EventVideosSerializer(many=True, required=False)
    event_images = EventImageSerializer(many=True, required=False)
    event_text = EventTextSerializer(many=True, required=False)
    journal_part = serializers.CharField(required=False)
    event_name = serializers.CharField(source='event_type.type', required=False)
    collaborator_email = serializers.EmailField(required=False)
    title = serializers.CharField(required=False)
    dedicate_to_name = serializers.CharField(required=False)

    class Meta:
        model = Event
        fields = '__all__'


class UpdateEventSerializer(serializers.ModelSerializer):
    event_video = EventVideosSerializer(many=True, required=False)
    event_images = EventImageSerializer(many=True, required=False)
    event_text = EventTextSerializer(many=True, required=False)
    journal_part = serializers.CharField(required=False)
    event_name = serializers.CharField(source='event_type.type', required=False)
    collaborator_email = serializers.EmailField(required=False)
    title = serializers.CharField(required=False)
    dedicate_to_name = serializers.CharField(required=False)
    dedicate_to_email = serializers.EmailField(required=False)
    date = serializers.DateField(required=False)
    time = serializers.TimeField(required=False)
    user = serializers.IntegerField(required=False)

    class Meta:
        model = Event
        fields = '__all__'


class IntroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Introduction
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
