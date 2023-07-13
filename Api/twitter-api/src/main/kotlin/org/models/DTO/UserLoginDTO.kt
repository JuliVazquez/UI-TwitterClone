package org.models.DTO
import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
class UserLoginDTO (
    val username: String?,
    val password: String?
)