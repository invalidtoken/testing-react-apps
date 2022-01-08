// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

function buildLoginForm({password = faker.internet.password()} = {}) {
  return {
    username: faker.internet.userName(),
    password,
  }
}

test('submitting the form calls onSubmit with username and password', () => {
  const userData = buildLoginForm()

  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const button = screen.getByRole(/button/i, {name: /submit/i})

  userEvent.type(username, userData.username)
  userEvent.type(password, userData.password)
  userEvent.click(button)

  expect(handleSubmit).toHaveBeenCalledWith(userData)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
