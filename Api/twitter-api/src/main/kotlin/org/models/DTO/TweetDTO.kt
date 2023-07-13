package org.models.DTO

class TweetDTO(
    val id: String,
    val strType : String,
    val type: TweetTypeDTO,
    val user: SimpleUserDTO,
    val content: String,
    val date: String,
    val repliesAmount: Int,
    val reTweetAmount: Int,
    val likes: List<SimpleUserDTO>,
    val retweets : List<SimpleTweetDTO>,
    val replys : List<SimpleTweetDTO>

)