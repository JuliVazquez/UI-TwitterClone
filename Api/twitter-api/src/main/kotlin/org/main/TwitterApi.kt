package org.main
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import org.main.controllers.TweetController
import org.main.controllers.UserController
import org.unq.initTwitterSystem
import io.javalin.security.RouteRole
import org.main.token.TokenUserController

enum class Roles : RouteRole {
    ANYONE, USER
}

fun main(args: Array<String>) {

    val twitterSystem = initTwitterSystem()
    val userController = UserController(twitterSystem)
    val tweetController = TweetController(twitterSystem)

    val app = Javalin.create {
        it.accessManager(TwitterAccesManager(twitterSystem))
        it.plugins.enableCors { cors -> cors.add { it.anyHost() } }
    }.start(7000)


    app.before {
        it.header("Access-Control-Expose-Headers", "*")
        it.header("Access-Control-Expose-Headers", "Authorization")
    }

    app.routes {
        path("login"){
            post(userController::userLogin,(Roles.ANYONE))
        }
        path("register"){
            post(userController::userRegister,(Roles.ANYONE))
        }
        path("user"){
            get(userController::getUser,(Roles.USER))
            path("usersToFollow"){
                get(userController::getUsersToFollow,(Roles.USER))
            }
            path("followingTweets"){
                get(userController::getFollowingTweets,(Roles.USER))
            }
            path("{id}"){
                get(userController::getUserById,(Roles.USER))
                path("follow"){
                    put(userController::toggleFollow,(Roles.USER))
                }
            }

        }
        path("search"){
            get(tweetController::searchTweets,(Roles.USER))
        }
        path("trendingTopics"){
            get(tweetController::getTrendingTopics,(Roles.USER))
        }
        path("tweet"){
            post(tweetController::createTweet,(Roles.USER))
            path("{id}"){
               get(tweetController::getTweetById,(Roles.USER))
                path("like"){
                    put(tweetController::toggleLike,(Roles.USER))
                }
                path("retweet"){
                    post(tweetController::retweet,(Roles.USER))
                }
                path("reply"){
                    post( tweetController::reply,(Roles.USER))
                }
            }
        }

    }
}

