package org.main.controllers
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.javalin.http.UnauthorizedResponse
import io.javalin.http.bodyValidator
import io.javalin.validation.ValidationException
import org.main.TwitterAccesManager
import org.main.token.TokenUserController
import org.models.DTO.DraftUserDTO
import org.models.DTO.ErrorDTO
import org.models.DTO.UserDTO
import org.models.DTO.UserLoginDTO
import org.unq.DraftUser
import org.unq.Tweet
import org.unq.TwitterSystem
import org.unq.UserException


class UserController(private val twSystem: TwitterSystem) {

    private val tokenUserController = TokenUserController()
    private val entityMapper = EntityMapper(twSystem)
    private val accessManager = TwitterAccesManager(twSystem)

    fun userLogin(ctx: Context){
        try {
            val bodyLogin = ctx.bodyValidator<UserLoginDTO>()
                .check({ !it.username.isNullOrEmpty() }, "Nombre de usuario no puede estar vacio.")
                .check({ !it.password.isNullOrEmpty() }, "Contraseña no puede estar vacia.")
                .get()
            val user = twSystem.users.find { it.username == bodyLogin.username }
                ?: throw NotFoundResponse("No se encuentra usuario.")
            if (user.password != bodyLogin.password) {
                throw UnauthorizedResponse("Contraseña incorrecta.")
            } else {
                val token = tokenUserController.createToken(user)
                ctx.header("Authorization", token).json(token)
                ctx.json(findUserOnTwSystem(user.id))
            }
        } catch (ex: ValidationException) {
            handleValidationException(ctx, ex)
        } catch (ex: UnauthorizedResponse) {
            ctx.status(401).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        } catch(ex: NotFoundResponse){
            ctx.status(404).json(ErrorDTO(ex.message!!))
        }
    }

    fun userRegister(ctx: Context){
        try {
            val bodyUser = ctx.bodyValidator<DraftUserDTO>()
                                .check({ !it.username.isNullOrEmpty() }, "Nombre de usuario no puede estar vacio.")
                                .check({ !it.password.isNullOrEmpty() }, "Contraseña no puede estar vacia.")
                                .check({ !it.email.isNullOrEmpty()}, "Email no puede estar vacio.")
                                .get()
            val user = twSystem.addNewUser(
                DraftUser(
                    bodyUser.username!!,
                    bodyUser.email!!,
                    bodyUser.password!!,
                    bodyUser.image!!,
                    bodyUser.backgroundImage!!
                )
            )
            val token = tokenUserController.createToken(user)
            ctx.header("Authorization", token).json(token)
            ctx.json(findUserOnTwSystem(user.id))
        }catch (ex: ValidationException) {
            handleValidationException(ctx, ex)
        }catch(ex: Exception){
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun getUserById(ctx: Context) {
        try {
            val id = ctx.pathParam("id")
            val userDTO = findUserOnTwSystem(id)
            ctx.json(userDTO)
        }
        catch(ex: NotFoundResponse) {
            ctx.status(404).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun getUser(ctx: Context){
        try {
            val logUserId = decodeUserId(ctx)
            ctx.json(findUserOnTwSystem(logUserId))
        }
        catch(ex: NotFoundResponse) {
            ctx.status(404).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun getUsersToFollow(ctx: Context) {
        try {
            val logUserId = decodeUserId(ctx)
            val usersToFollow = twSystem.getUsersToFollow(logUserId)
            ctx.json(entityMapper.usersToDTO(usersToFollow))
        }
        catch(ex: Exception) {
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun toggleFollow(ctx: Context) {
        try {
            var idUserToggle = ctx.pathParam("id")
            val logUserId = decodeUserId(ctx)
            val user = twSystem.toggleFollow(logUserId,idUserToggle)
            val tweets = entityMapper.tweetsToDTO(tweetsBy(twSystem.tweets,user.id))
            ctx.json(entityMapper.userToDTO(user,tweets))
        }
        catch(ex: UserException){
            ctx.status(404).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
        catch(ex: Exception) {
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun getFollowingTweets(ctx: Context) {
        try {
            val logUserId = decodeUserId(ctx)
            val followingTweets = twSystem.getFollowingTweets(logUserId)
            ctx.json(entityMapper.tweetsToDTO(followingTweets))
        }
        catch(ex: Exception) {
            ctx.status(400).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    private fun findUserOnTwSystem(id: String): UserDTO {
        try {
            val user = twSystem.getUser(id)
            val tweets = entityMapper.tweetsToDTO(tweetsBy(twSystem.tweets,id))
            val userDTO = entityMapper.userToDTO(user,tweets)
            return userDTO
        }
        catch(ex: UserException) {
            throw NotFoundResponse("No existe un usuario con ese id")
        }
    }

    private fun tweetsBy(tweets: MutableList<Tweet>, idUser: String): List<Tweet> {
        return tweets.filter { it.user.id == idUser }
    }

    private fun decodeUserId(ctx: Context) : String {
        val token = ctx.header("Authorization")
        return accessManager.getUser(token!!).id
    }


    private fun handleValidationException(ctx: Context, ex: ValidationException) {
        val errorMessages = ex.errors.map { error -> error.toString()}.toList()
        val errorMessage = errorMessages.joinToString(", ") {
            it.substringAfter("message=").substringBefore(",")
        }
        if (errorMessage == "DESERIALIZATION_FAILED"){
            ctx.status(400).json(ErrorDTO("Error en request recibida."))
        }
        else {
            ctx.status(400).json(ErrorDTO(errorMessage))
        }
    }
}