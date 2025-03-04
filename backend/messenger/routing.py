from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/messenger/(?P<session_id>[0-9a-f-]+)/$", consumers.ChatConsumer.as_asgi()),
]