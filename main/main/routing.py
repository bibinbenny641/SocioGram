# import os
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.security.websocket import AllowedHostsOriginValidator
# from django.core.asgi import get_asgi_application
# from django.urls import path
# from channels.auth import AuthMiddlewareStack
# from chat.consumers import ChatConsumer

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main.settings")
# application=get_asgi_application()


# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),

#     # WebSocket chat handler
#     "websocket": AllowedHostsOriginValidator(
#         AuthMiddlewareStack(
#             URLRouter([
#                path('ws/chat/<str:room_name>/<int:user_id>/', ChatConsumer.as_asgi()),
#             ])
#         )
#     ),
# })