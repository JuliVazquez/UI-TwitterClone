package org.models.DTO

class UserDTO(
    val id: String,
    val username: String,
    val email: String,
    val image: String,
    val backgroundImage: String,
    val followers: List<SimpleUserDTO>,
    val following: List<SimpleUserDTO>,
    val tweets: List<SimpleTweetDTO>
)

