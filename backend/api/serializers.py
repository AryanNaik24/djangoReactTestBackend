from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        # noone can read what the passwword is.
        extra_kwargs = {"password": {"write_only": True}}

    # create a new version of user
    def create(self, validated_data):
        # ** splits keyword elements
        user = User.objects.create(**validated_data)
        password = validated_data.pop('password', None)
        user.is_active = True
        if password is not None:
            # Set password does the hash, so you don't need to call make_password
            user.set_password(password)
        user.save()

        return user


class NoteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
