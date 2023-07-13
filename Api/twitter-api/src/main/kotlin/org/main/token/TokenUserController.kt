package org.main.token

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.http.UnauthorizedResponse
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import org.unq.User

class TokenUserController{
    private val algorithm: Algorithm = Algorithm.HMAC256("secret")

    private val generator: JWTGenerator<User> = JWTGenerator<User> { user: User, alg: Algorithm? ->
        val token: JWTCreator.Builder = JWT.create()
            .withClaim("id", user.id)
        token.sign(alg)
    }

    private val verifier: JWTVerifier = JWT.require(algorithm).build()
    private val provider: JWTProvider<User> = JWTProvider(algorithm, generator, verifier)

    fun createToken(user: User): String = provider.generateToken(user)

    fun validateTokenUser(token: String) : String {
        try{
            val decodedJWT = provider.validateToken(token).orElseThrow{ UnauthorizedResponse("Token invalido.") }
            return decodedJWT.getClaim("id").asString()
        }
        catch (e: Exception){
            throw UnauthorizedResponse(e.message ?: "Error en request.")
        }
    }
}