from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from home.models import StorageAllowed
from events.api.v1.serializers import EventSerializer, UpdateEventSerializer
from events.models import Event, EventImages, EventVideo, EventAddMoreText


def calculate_media_size(event_media):
    media_size = 0
    if event_media is None or '' in event_media:
        return media_size
    for x in event_media:
        file_size = x.size
        media_size += file_size
    return media_size


class V2EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        queryset = Event.objects.filter(user=self.request.user).order_by('-id')
        return queryset

    def create(self, request, *args, **kwargs):
        self.request.data._mutable = True
        videos = self.request.data.pop('videos')
        images = self.request.data.pop('images')
        texts = self.request.data.pop('text')
        self.request.data._mutable = False
        media_size_bytes = 0
        storage_allowed = StorageAllowed.objects.filter(user=self.request.user).first()
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            if storage_allowed:
                media_size_bytes += calculate_media_size(images)
                media_size_bytes += calculate_media_size(videos)
                media_size_mb = media_size_bytes / (1024 * 1024)
                available = storage_allowed.available_storage
                new_memory_size = available - media_size_mb
                if new_memory_size <= 0:
                    return Response({
                        'low_storage': 'You have {} MB available in Free Subscription with storage limit of 1 GB.'
                                       ' Upgrade your plan and enjoy unlimitited storage.'.format(available)},
                                    status=status.HTTP_400_BAD_REQUEST)
                storage_allowed.available_storage = round(new_memory_size, 2)
                storage_allowed.save()
            serializer.save()
            new_event = serializer.instance
            if images:
                for image in images:
                    EventImages.objects.create(event=new_event, image=image)
            if videos:
                for video in videos:
                    EventVideo.objects.create(event=new_event, video=video)
            if texts:
                for text in texts:
                    EventAddMoreText.objects.create(event=new_event, text=text)
            new_event.save()
            serializer = self.get_serializer(new_event)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None, **kwargs):
        self.request.data._mutable = True
        videos = self.request.data.pop('videos', None)
        images = self.request.data.pop('images', None)
        texts = self.request.data.pop('text', None)
        self.request.data._mutable = False
        media_size_bytes = 0
        storage_allowed = StorageAllowed.objects.filter(user=self.request.user).first()
        serializer = UpdateEventSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            if storage_allowed:
                media_size_bytes += calculate_media_size(images)
                media_size_bytes += calculate_media_size(videos)
                media_size_mb = media_size_bytes / (1024 * 1024)
                available = storage_allowed.available_storage
                new_memory_size = available - media_size_mb
                if new_memory_size <= 0:
                    return Response({
                        'low_storage': 'You have {} MB available in Free Subscription with storage limit of 1 GB. '
                                       'Upgrade your plan and enjoy unlimitited storage.'.format(available)},
                                    status=status.HTTP_400_BAD_REQUEST)
                storage_allowed.available_storage = round(new_memory_size, 2)
                storage_allowed.save()
            instance = Event.objects.get(id=pk)
            updated_event = serializer.update(instance, serializer.validated_data)
            if images:
                EventImages.objects.filter(event=instance).delete()
                for image in images:
                    EventImages.objects.create(event=updated_event, image=image)
            if videos:
                EventVideo.objects.filter(event=instance).delete()
                for video in videos:
                    EventVideo.objects.create(event=updated_event, video=video)
            if texts:
                EventAddMoreText.objects.filter(event=instance).delete()
                for text in texts:
                    EventAddMoreText.objects.create(event=updated_event, text=text)
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)