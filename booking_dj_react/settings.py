"""
Django settings for booking_dj_react project.

Generated by 'django-admin startproject' using Django 2.0.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '463hzk*onkb4h&+j@mof$wc(20t$$l17w#(v8-6ipzq7m=$a=j'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['bookingexpress.herokuapp.com', '127.0.0.1:8000']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'core.apps.CoreConfig'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

ROOT_URLCONF = 'booking_dj_react.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'build')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'booking_dj_react.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}

'''
curl -X POST -d "username=admin&password=adminum" http://127.0.0.1:8000/api-token-auth/
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTI3MTgwMzkzLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9.z4jGEgBE4bdCxlY9MRcEc0Vk9X-HH6V7dYwjw4tbFMs
curl -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTI3MTgwMzkzLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9.z4jGEgBE4bdCxlY9MRcEc0Vk9X-HH6V7dYwjw4tbFMs" http://127.0.0.1:8000/protected-url/

curl http://127.0.0.1:8000/booking/

'''

# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

# AUTH_PASSWORD_VALIDATORS = [
#   {
#     'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#   },
#   {
#     'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
#   },
#   {
#     'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
#   },
#   {
#     'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
#   },
# ]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static'),
]

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

CSRF_COOKIE_NAME = "csrftoken"

CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_WHITELIST = (
    'localhost:3000',
)