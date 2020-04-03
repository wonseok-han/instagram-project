from django.contrib import admin
from .models import Post, Comment, Tag
from django.utils.safestring import mark_safe

# Register your models here.
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["photo_tag", "caption"]
    list_display_links = ["caption"]

    def photo_tag(self, post):
        # return post.photo.url

        # mark_safe() : 개발자에 의해 이 문자열은 안전하다라는 의미.
        # 남발하지 않고 제한적으로 써야됨.
        return mark_safe(f"<img src={post.photo.url} style='width: 100px;' />")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass
