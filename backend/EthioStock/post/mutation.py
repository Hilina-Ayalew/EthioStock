import graphene
from .models import Post
from businessowner.models import Businessowner
from businessowner.types import BusinessownerType
from graphene_file_upload.scalars import Upload
from post.types import PostType

#creating post
class CreatePost(graphene.Mutation):
    post = graphene.Field(PostType)
    success = graphene.Boolean()
    message = graphene.String()
    #while creating post should supply description, title, and image arguments(image is optional)
    class Arguments:
        description = graphene.String(required = True)
        title = graphene.String(required = True)
        image = Upload()

    #get user inputs and save to database
    def mutate(self, info, **kwargs):
        user = info.context.user
        if(user.is_anonymous):
            return CreatePost(
                success = False, 
                message = "Not Logged in !"
            )
        if(user.user_type == 'Investor'):
            return CreatePost(
                success = False, 
                message = "Only business owners can post !"
            )
        owner = Businessowner.objects.get(account_id = user.id)
        
        description = kwargs['description']
        title = kwargs['title']
        image = kwargs['image'] if "image" in kwargs else None
        # image = info.context.FILES

        post = Post(
            owner = owner,
            description = description,
            title = title,
            image = image,

        )
        post.save()

        # return the post created
        return CreatePost(
            post  = post, 
            success = True, 
            message = "Post Created Successfully"
        )

#update post
class UpdatePost(graphene.Mutation):
    post = graphene.Field(PostType)
    success = graphene.Boolean()
    message = graphene.String()
    class Arguments:
        postId= graphene.Int(required = True)
        image = Upload()
        description = graphene.String()
        title = graphene.String()

    def mutate(self, info, **kwargs):
        user = info.context.user
        if(user.is_anonymous):
            return UpdatePost(
                success = False, 
                message = "Not Logged in !"
            )
        if(user.user_type != 'Business'):
            return CreatePost(
                success = False, 
                message = "Only business owners can post !"
            )
        owner = Businessowner.objects.get(account_id = user.id)
        postId = kwargs['postId']
        post = Post.objects.get(id = postId)
        if(owner != post.owner):
            return CreatePost(
                success = False, 
                message = "Only owners can edit their post!"
            )
        post.description = kwargs['description'] if "description" in kwargs else post.description
        post.image = kwargs['image'] if "image" in kwargs else post.image
        post.title = kwargs['title'] if "title" in kwargs else post.title
        post.save()

        return UpdatePost(
            post = post,
            success = True,
            message = "Post Updated Successfully"
        )



#delete post
class DeletePost(graphene.Mutation):
    removeSuccess = graphene.Boolean()
    success = graphene.Boolean()
    message = graphene.String()

    class Arguments:
        postId = graphene.Int(required = True)
    def mutate(self, info, **kwargs):
        user = info.context.user
        if(user.is_anonymous):
            return UpdatePost(
                success = False, 
                message = "Not Logged in !"
            )
        postId = kwargs['postId']
        try:
            Post.objects.get(id = postId).delete()
        except:
            return DeletePost(
                success = False, 
                message = "Can not get post with id: "+str(postId)+ " ."
            )
 
        return DeletePost(
            success = True, 
            message = "Post removed successfully"
            )
        

#register mutations 
class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()
    delete_post = DeletePost.Field()
    update_post = UpdatePost.Field()