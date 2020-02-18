const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const manyBlogs = [{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, 
{ _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, 
{ _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, 
{ _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, 
{ _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, 
{ _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

beforeEach(async () => {
    await Blog.deleteMany({})
      
      let blogObject = new Blog(manyBlogs[0])
      manyBlogs.map(r => new Blog(r)
        .save()
    )
  })

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('returns right amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(6)
})

test('a valid blog is created', async () => {
    const newBlog = {
        title: "Mimmit koodaa",
        author: "Mimmit",
        url: "https://mimmitkoodaa.ohjelmistoebusiness.fi/blogi/",
        likes: "8"

    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(manyBlogs.length + 1)
    expect(titles).toContain('Mimmit koodaa')
})
/*
test('identification is named id', async () => {
    const response = await api.get('/api/notes')
    const ids = response.body.map(r => r.id)
    expect(ids).toContain(id)
})

test('posting a blog works', async () => {
    const response = await api.post('/api/notes')

    .expect(200)

})*/

afterAll(() => {
    mongoose.connection.close()
})