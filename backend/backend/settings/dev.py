from .common import *

INSTALLED_APPS += [
    "debug_toolbar",
]

# 첫부분에 넣기 위한 로직
MIDDLEWARE = ["debug_toolbar.middleware.DebugToolbarMiddleware",] + MIDDLEWARE

INTERNAL_IPS = ["127.0.0.1"]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
]
