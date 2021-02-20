var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
    const reducer = (sum, item) => {
      return sum + item
    }

    return likes.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const findBlog = blogs.find(blog => blog.likes === Math.max(...likes))
  const result = {
  title: findBlog.title,
  author: findBlog.author,
  likes: findBlog.likes
  }

    return result
}


const mostBlog = (blogs) => {
  const name = blogs.map(blog => blog.author)


  const myCounter = (inputWords) => {
    return inputWords.reduce((countWords, word) => {
      countWords[word] = ++countWords[word] || 1;
      return countWords;
    }, {});
  }

  const arr = Object.values(myCounter(name))
  const maxBlog = Math.max(...arr)
  const author = Object.keys(myCounter(name))[arr.indexOf(maxBlog)]

  return {
    author: author,
    blogs: maxBlog
  }
}



const mostLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const author = [...new Set(blogs.map(blog => blog.author))]
  const results = {}


  for (const j in author) {
    results[author[j]] = 0
    for (const i in blogs) {
      if (blogs[i].author === author[j]) {
        results[author[j]] += blogs[i].likes
      }
    }
  }

  const arr = Object.values(results)
  const maxBlog = Math.max(...arr)
  const authorName = Object.keys(results)[arr.indexOf(maxBlog)]

  return {
    author: authorName,
    likes: maxBlog
  }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlog, mostLikes
}
