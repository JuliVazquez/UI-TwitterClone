package org.models.DTO

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
class DraftUserDTO (
    val username: String?,
    val email: String?,
    val password: String?,
    val image: String?,
    val backgroundImage: String?
)