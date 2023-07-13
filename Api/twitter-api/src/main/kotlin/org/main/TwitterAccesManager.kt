package org.main

import io.javalin.http.Context
import io.javalin.http.Handler
import io.javalin.http.UnauthorizedResponse
import io.javalin.security.AccessManager
import io.javalin.security.RouteRole
import org.main.token.TokenUserController
import org.models.DTO.ErrorDTO
import org.unq.TwitterSystem
import org.unq.User

class TwitterAccesManager(val twSystem: TwitterSystem) : AccessManager {

    private val tokenJWTController = TokenUserController()

    override fun manage(handler: Handler, ctx: Context, routeRoles: Set<RouteRole>) {
        try{
            val token = ctx.header("Authorization")
            when {
                token == null && routeRoles.contains(Roles.ANYONE) -> handler.handle(ctx)
                token == null -> ctx.status(400).json(ErrorDTO("Token no encontrado en el header."))
                routeRoles.contains(Roles.ANYONE) -> handler.handle(ctx)
                routeRoles.contains(Roles.USER) -> {
                    getUser(token)
                    handler.handle(ctx)
                }
            }
        }catch (ex: Exception){
            ctx.status(401).json(ErrorDTO(ex.message ?: "Error en request recibida."))
        }
    }

    fun getUser(token : String): User {
        try {
            val userId = tokenJWTController.validateTokenUser(token)
            return twSystem.getUser(userId)
        }catch (e: Exception){
            throw UnauthorizedResponse(e.message!!)
        }
    }

}