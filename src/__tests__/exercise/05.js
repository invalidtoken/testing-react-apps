// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'
import {rest} from 'msw'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
// TODO: What does this do
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))
  console.log('I am here')

  screen.debug()

  await waitForElementToBeRemoved(() => screen.getByLabelText('loading...'))

  expect(screen.getByText(username)).toBeInTheDocument()
})

test(`error message is displayed when username is not passed`, async () => {
  render(<Login />)
  const {password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText('loading...'))

  const errorAlert = screen.getByRole('alert')
  expect(errorAlert).toBeInTheDocument()
  expect(errorAlert).toMatchInlineSnapshot(`
    <div
      role="alert"
      style="color: red;"
    >
      username required
    </div>
  `)
})

test(`error message is displayed when password is not passed`, async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText('loading...'))

  const errorAlert = screen.getByRole('alert')

  expect(errorAlert).toBeInTheDocument()
  expect(errorAlert).toMatchInlineSnapshot(`
    <div
      role="alert"
      style="color: red;"
    >
      password required
    </div>
  `)
})

test('error message is displayed properly if server fails for any reason', async () => {
  // TODO: What are return handlers
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        // TODO: What if you don't return res or return res.once
        return res(
          ctx.status(500),
          ctx.json({message: 'INTERNAL_SERVER_ERROR'}),
        )
      },
    ),
  )

  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText('loading...'))
  const errorAlert = screen.getByRole('alert')

  expect(errorAlert).toMatchInlineSnapshot(`
    <div
      role="alert"
      style="color: red;"
    >
      INTERNAL_SERVER_ERROR
    </div>
  `)
})
