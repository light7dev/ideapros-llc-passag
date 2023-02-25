import stripe
import json
import datetime
from django.utils.dateparse import parse_datetime
import mimetypes
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
# from home.models import StorageAllowed
from .serializers import EventSerializer, IntroSerializer, CategorySerializer, UpdateEventSerializer, SubCategorySerializer
from events.models import Event, EventImages, EventVideo, EventAddMoreText, Introduction, Category, SubCategory
from django_celery_beat.models import PeriodicTask, ClockedSchedule


# def calculate_media_size(event_media):
#     media_size = 0
#     if event_media is None or '' in event_media:
#         return media_size
#     for x in event_media:
#         file_size = x.size
#         media_size += file_size
#     return media_size


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        queryset = Event.objects.filter(user=self.request.user).order_by('-id')
        return queryset

    def create(self, request, *args, **kwargs):
        self.request.data._mutable = True
        videos = self.request.data.pop('videos', [])
        images = self.request.data.pop('images', [])
        texts = self.request.data.pop('text')
        self.request.data._mutable = False
        # media_size_bytes = 0
        # storage_allowed = StorageAllowed.objects.filter(user=self.request.user).first()
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # if storage_allowed:
            #     media_size_bytes += calculate_media_size(images)
            #     media_size_bytes += calculate_media_size(videos)
            #     media_size_mb = media_size_bytes / (1024 * 1024)
            #     available = storage_allowed.available_storage
            #     new_memory_size = available - media_size_mb
            #     if new_memory_size <= 0:
            #         return Response({
            #             'low_storage': 'You have {} MB available in Free Subscription with storage limit of 1 GB. Upgrade your plan and enjoy unlimitited storage.'.format(available)}, status=status.HTTP_400_BAD_REQUEST)
            #     storage_allowed.available_storage = round(new_memory_size, 2)
            #     storage_allowed.save()
            serializer.save()
            new_event = serializer.instance
            if images:
                for image in images:
                    if not image:
                        continue
                    EventImages.objects.create(event=new_event, image=image)
            if videos:
                for video in videos:
                    if not video:
                        continue
                    type = mimetypes.guess_all_extensions(video.content_type)[0]
                    video.name = f"{video.name}{type}"
                    EventVideo.objects.create(event=new_event, video=video)
            if texts:
                for text in texts:
                    EventAddMoreText.objects.create(event=new_event, text=text)
            new_event.save()
            serializer = self.get_serializer(new_event)
            datetime_str = f'{serializer.data["date"]} {serializer.data["time"]}'
            ret = parse_datetime(datetime_str)
            utc_date_time = ret. \
                replace(tzinfo=datetime.timezone.utc)
            clocked = ClockedSchedule.objects.create(clocked_time=utc_date_time)
            category = Category.objects.get(id=serializer.data["event_type"])
            newdict = {'sender_name': request.user.name, 'type': category.name}
            newdict.update(serializer.data)
            json_data = json.dumps(newdict)
            PeriodicTask.objects.create(name=f'{serializer.data["id"]}',
                                        clocked=clocked,
                                        one_off=True,
                                        kwargs=json_data,
                                        task='events.tasks.send_event',
                                        start_time=datetime.datetime.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None, **kwargs):
        self.request.data._mutable = True
        videos = self.request.data.pop('videos', None)
        images = self.request.data.pop('images', None)
        texts = self.request.data.pop('text', None)
        self.request.data._mutable = False
        # media_size_bytes = 0
        # storage_allowed = StorageAllowed.objects.filter(user=self.request.user).first()
        serializer = UpdateEventSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # if storage_allowed:
            #     media_size_bytes += calculate_media_size(images)
            #     media_size_bytes += calculate_media_size(videos)
            #     media_size_mb = media_size_bytes / (1024 * 1024)
            #     available = storage_allowed.available_storage
            #     new_memory_size = available - media_size_mb
            #     if new_memory_size <= 0:
            #         return Response({
            #             'low_storage': 'You have {} MB available in Free Subscription with storage limit of 1 GB. Upgrade your plan and enjoy unlimitited storage.'.format(available)}, status=status.HTTP_400_BAD_REQUEST)
            #     storage_allowed.available_storage = round(new_memory_size, 2)
            #     storage_allowed.save()
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
            datetime_str = f'{serializer.data["date"]} {serializer.data["time"]}'
            ret = parse_datetime(datetime_str)
            utc_date_time = ret. \
                replace(tzinfo=datetime.timezone.utc)
            clocked = ClockedSchedule.objects.create(clocked_time=utc_date_time)
            periodic_task = PeriodicTask.objects.filter(name=f'unique_id - {serializer.data["id"]}')
            periodic_task.update(clocked=clocked)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class IntroViewSet(ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get']
    serializer_class = IntroSerializer

    def get_queryset(self):
        queryset = Introduction.objects.all()
        return queryset


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Category.objects.all().order_by('sort')
        return queryset

    @action(methods=["GET"], detail=False)
    def has_subscription(self, request):
        subscription = False
        try:
            user_subscriptions = stripe.Subscription.list(customer=self.request.user.stripe_customer_id, limit=3,
                                                          status='active')
            subscription_info = user_subscriptions.get('data')
            if subscription_info:
                subscription = True
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        return Response({"has_subscription": subscription}, status=status.HTTP_200_OK)


class SubCategoryView(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
