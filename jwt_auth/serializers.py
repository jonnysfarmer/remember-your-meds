#pylint: disable = no-member, arguments-differ
from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.apps import apps
User = get_user_model()
# Post = apps.get_model('posts', 'Post')

# class PostSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Post
#         fields = ('id', 'content', 'image')


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    # posts = PostSerializer(many=True, required=False)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'does not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation', 'mobile')

class UserPutSerializer(serializers.ModelSerializer):

    # password = serializers.CharField(write_only=True, required=False)
    # password_confirmation = serializers.CharField(write_only=True, required=False)
    # # posts = PostSerializer(many=True, required=False)

    # def validate(self, data):

    #     password = data.pop('password')
    #     password_confirmation = data.pop('password_confirmation')

    #     if password != password_confirmation:
    #         raise ValidationError({'password_confirmation': 'does not match'})

    #     try:
    #         validations.validate_password(password=password)
    #     except ValidationError as err:
    #         raise serializers.ValidationError({'password': err.messages})

    #     data['password'] = make_password(password)
    #     return data

    class Meta:
        model = User
        fields = ('username', 'email', 'mobile' )
        extra_kwargs = {'username' : {'required': False}, 'email' : {'required': False}, 'mobile' : {'required': False}}
