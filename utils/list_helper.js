const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    if (blogs.length === 0) {
        return 0
    } else {
        return blogs.reduce(reducer, 0)
    }
}

const favoriteBlog = blogs => {
    let mostLikes = 0
    let mostLiked = 0
    var i;
    for (i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > mostLikes) {
            mostLikes = blogs[i].likes
            mostLiked = blogs[i]
        }
    }
    if (blogs.length === 0) {
        return 'the list is empty'
    } else {
        return mostLiked
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}