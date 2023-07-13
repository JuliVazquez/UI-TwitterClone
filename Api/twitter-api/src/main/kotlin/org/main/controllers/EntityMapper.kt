package org.main.controllers

import org.models.DTO.SimpleTweetDTO
import org.models.DTO.SimpleUserDTO
import org.models.DTO.TweetTypeDTO
import org.models.DTO.UserDTO
import org.unq.Tweet
import org.unq.TwitterSystem
import org.unq.User

class EntityMapper(val twSystem: TwitterSystem) {
    internal fun userToDTO(user: User, tweets: List<SimpleTweetDTO>): UserDTO {
        val following = usersToDTO(user.following)
        val followers = usersToDTO(user.followers)
        return  UserDTO(
            user.id,
            user.username,
            user.email,
            user.image,
            user.backgroundImage,
            followers,
            following,
            tweets
        )
    }

    internal fun usersToDTO(users: List<User>): List<SimpleUserDTO> {
        return users.map { user -> SimpleUserDTO(user.id, user.username, user.image ) }
    }

    internal fun getUserProfilePic(id: String): String{
        return twSystem.getUser(id).image
    }

    internal fun tweetsToDTO(tweets: List<Tweet>): List<SimpleTweetDTO> {
        return tweets.map { tweet -> SimpleTweetDTO(
            tweet.id,
            getStrType(tweet),
            getSimpleTweetDTOFrom(tweet),
            SimpleUserDTO(tweet.user.id,tweet.user.username, getUserProfilePic(tweet.user.id)),
            tweet.content,
            tweet.date.toString(),
            tweet.replies.size,
            tweet.reTweets.size,
            tweet.likes.map { user ->  SimpleUserDTO(user.id, user.username, user.image) },
            getListSimpleTweetDTO(tweet.reTweets),
            getListSimpleTweetDTO(tweet.replies),
        )
        }
    }

    private fun getSimpleTweetDTOFrom(tweet: Tweet): TweetTypeDTO {

        if(tweet.type.isNormalTweet()){      //caso base
            return TweetTypeDTO(null,tweet.type.image)
        }else{
            val tweetOrigen = tweet.type.tweet!!
            return TweetTypeDTO(
                tweetToDTO(tweetOrigen),
                tweet.type.image)
        }
    }

    internal fun tweetToDTO(tweet: Tweet): SimpleTweetDTO {
        return SimpleTweetDTO(
            tweet.id,
            getStrType(tweet),
            getSimpleTweetDTOFrom(tweet),
            SimpleUserDTO(tweet.user.id,tweet.user.username, getUserProfilePic(tweet.user.id)),
            tweet.content,
            tweet.date.toString(),
            tweet.replies.size,
            tweet.reTweets.size,
            tweet.likes.map { user ->  SimpleUserDTO(user.id, user.username, getUserProfilePic(tweet.user.id)) },
            getListSimpleTweetDTO(tweet.reTweets),
            getListSimpleTweetDTO(tweet.replies),
        )
    }

    private fun getListSimpleTweetDTO(reTweets: MutableList<Tweet>): List<SimpleTweetDTO> {
        return reTweets.map { tweet -> tweetToDTOWithoutRetweets(tweet) }
    }

    private fun tweetToDTOWithoutRetweets(tweet: Tweet): SimpleTweetDTO {
        return SimpleTweetDTO(
            tweet.id,
            getStrType(tweet),
            TweetTypeDTO(null,tweet.type.image),    //no hace falta la recursion en este caso
            SimpleUserDTO(tweet.user.id, tweet.user.username, getUserProfilePic(tweet.user.id)),
            tweet.content,
            tweet.date.toString(),
            tweet.replies.size,
            tweet.reTweets.size,
            tweet.likes.map { user ->  SimpleUserDTO(user.id, user.username, getUserProfilePic(tweet.user.id)) },
            getListSimpleTweetDTO(tweet.reTweets),
            getListSimpleTweetDTO(tweet.replies)
        )
    }

    private fun getStrType(tweet: Tweet): String {
       return when{
           tweet.type.isNormalTweet() -> "Normal"
           tweet.type.isReplayTweet() -> "Reply"
           tweet.type.isReTweet() -> "Retweet"
           else -> {"Desconocido"}
       }
    }

    fun findLastRetweetBy(tweet: Tweet, logUserId: String): String {
        //hay que aplicar filtros porque el TwitterSystem permite retwittear varias veces lo mismo :S
        val retweetsByUser = tweet.reTweets.filter{ tweet -> tweet.user.id == logUserId}
        val latestRetweet = retweetsByUser.maxByOrNull { it.date }
        return latestRetweet!!.id
    }
}