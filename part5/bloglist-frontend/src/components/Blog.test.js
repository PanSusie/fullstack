import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    author: 'blogtester',
    title: 'components testing is done',
    url: 'http://test',
    likes: 0,
    user: {
      username: 'parapp'
    }
  }

  const user = {
    username: 'parapp'
  }

  beforeEach(() => {
    component = render (
      <Blog blog={blog} user={user}/>
    )
  })

  test('renders visible content', () => {
    const div = component.container.querySelector('.visibleContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('no renders invisible content', () => {
    const div = component.container.querySelector('.invisibleContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, url and number of likes are shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.invisibleContent')
    expect(div).not.toHaveStyle('display: none')
  })


  // haven't complete
  test('the like button is clicked twice, the event hander is called twice', () => {

    const newblog = {
      author: 'blogtester',
      title: 'components testing is done',
      url: 'http://test',
      likes: 0,
      user: {
        username: 'parapp'
      }
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={newblog} user={user} addLike={mockHandler}/>
    )

    const button = component.container.querySelector('.likeButton')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
