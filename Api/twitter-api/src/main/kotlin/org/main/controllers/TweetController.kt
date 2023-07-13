package org.main.controllers

import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.javalin.http.bodyValidator
import org.main.TwitterAccesManager
import org.main.token.TokenUserController
import org.models.DTO.*
import org.unq.DraftReTweet
import org.unq.DraftReplyTweet
import org.unq.DraftTweet
import org.unq.TwitterSystem
import java.time.LocalDateTime

class TweetController(val twSystem: TwitterSystem) {
    private val tokenUserController = TokenUserController()
    private val entityMapper = EntityMapper(twSystem)
    private val accessManager = TwitterAccesManager(twSystem)

    fun searchTweets(ctx: Context){
        try {
            val text = ctx.queryParam("text") ?:  throw Exception("No hay texto para filtrar tweets.")
            val tweets = twSystem.search(text)
            ctx.json(entityMapper.tweetsToDTO(tweets))
        }
        catch(ex: Exception) {
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun getTrendingTopics(ctx: Context) {
        try {
            val trendingTopics = twSystem.getTrendingTopics()
            ctx.json(entityMapper.tweetsToDTO(trendingTopics))
        }
        catch(ex: Exception) {
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun getTweetById(ctx: Context) {
        try {
            val id = ctx.pathParam("id")
            val tweetDTO = getTweetById(id)
            ctx.json(tweetDTO)
        }
        catch(ex: Exception) {
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    private fun getTweetById(id: String): SimpleTweetDTO {
        try {
            return entityMapper.tweetToDTO(twSystem.getTweet(id))
        }
        catch(ex: Exception) {
            throw NotFoundResponse("No existe el tweet")
        }
    }

    fun createTweet(ctx: Context) {
        try {
            val bodyTweet = ctx.bodyValidator<AddTweetDTO>().get()
            val logUserId = decodeUserId(ctx)
            val draftTweet = DraftTweet(logUserId, bodyTweet.content, bodyTweet.image)
            val tweet = twSystem.addNewTweet(draftTweet)
            ctx.json(entityMapper.tweetToDTO(tweet))
        }
        catch(ex: Exception) {
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun toggleLike(ctx: Context){
        try {
            val id = ctx.pathParam("id")
            val logUserId = decodeUserId(ctx)
            val tweetDTO = twSystem.getTweet(id)
            val tweetLiked = twSystem.toggleLike(tweetDTO.id,logUserId)
            ctx.json(entityMapper.tweetToDTO(tweetLiked))
        }
        catch(ex: Exception) {
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun retweet(ctx: Context){
        try {
            val id = ctx.pathParam("id")
            val bodyReTweet = ctx.bodyValidator<AddRetweetDTO>().get()
            val logUserId = decodeUserId(ctx)
            val tweet = twSystem.getTweet(id)
            val draftRT = DraftReTweet(logUserId,tweet.id,bodyReTweet.content, LocalDateTime.now())
            //cambios: esto devolvia el tweet original en realidad. Lo cambio para devolver el rt:
//            val retweet = twSystem.addReTweet(draftRT)
//            val retwDTO = entityMapper.tweetToDTO(retweet)
//            ctx.json(retwDTO)
            val tweetPlusRT = twSystem.addReTweet(draftRT)
            val retweetID = entityMapper.findLastRetweetBy(tweetPlusRT,logUserId)
            val retweet = entityMapper.tweetToDTO(twSystem.getTweet(retweetID))
            ctx.json(retweet)
        }
        catch(ex: Exception) {
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun reply(ctx: Context){
        try {
            val id = ctx.pathParam("id")
            val logUserId = decodeUserId(ctx)
            val bodyReply = ctx.bodyValidator<AddReplyTweetDTO>().get()
            val tweet = twSystem.getTweet(id)
            val draftRpT = DraftReplyTweet(logUserId,tweet.id,bodyReply.content,bodyReply.image,LocalDateTime.now())
            val reply = twSystem.replyTweet(draftRpT)
            val replyDTO = entityMapper.tweetToDTO(reply)
            ctx.json(replyDTO)
        }
        catch(ex: Exception) {
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    private fun decodeUserId(ctx: Context) : String {
        val token = ctx.header("Authorization")
        return accessManager.getUser(token!!).id
    }
}