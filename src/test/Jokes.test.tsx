
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from '../Components/Jokes';

const server = setupServer(
  rest.get('/jokes', (req: any, res: (arg0: any) => any, ctx: { json: (arg0: { value: string }) => any }) => {
    return res(ctx.json({value: 'Chuck Norris killed "Digger" his toenail fungus character by simply ripping his toenails out on one leisurely Sunday afternoon.'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
  render(<Fetch url="/jokes" />)

  fireEvent.click(screen.getByText('Load a Joke'))

  await waitFor(() => screen.getByRole('heading'))

  expect(screen.getByRole('heading')).toHaveTextContent('Chuck Norris killed "Digger" his toenail fungus character by simply ripping his toenails out on one leisurely Sunday afternoon.')
  expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async () => {
  server.use(
    rest.get('/jokes', (req: any, res: (arg0: any) => any, ctx: { status: (arg0: number) => any }) => {
      return res(ctx.status(500))
    }),
  )

  render(<Fetch url="/jokes" />)

  fireEvent.click(screen.getByText('Load a Joke'))

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  expect(screen.getByRole('button')).not.toBeDisabled()
})