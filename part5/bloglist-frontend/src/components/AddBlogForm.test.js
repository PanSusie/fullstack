import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'


describe('<AddBlogForm />', function() {

  // const blog = {
  //   author: 'blogtester',
  //   title: 'components testing is done',
  //   url: 'http://test',
  //   likes: 0,
  //   user: {
  //     username: 'parapp'
  //   }
  // }

  const createBlog = jest.fn()

  const component = render(
    <AddBlogForm blogObject={createBlog}/>
  )

  const title = component.container.querySelector('.title')
  const author = component.container.querySelector('.author')
  const url = component.container.querySelector('.url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].content).toBe('testing')
})
