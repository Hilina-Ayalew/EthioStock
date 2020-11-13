from django.db import models
from investor.models import Investor
from post.models import Post

class Reaction(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.DO_NOTHING

    )
    investor = models.ForeignKey(
        Investor,
        on_delete = models.DO_NOTHING
    )
    isLike = models.BooleanField()
    reactionTime = models.DateTimeField()