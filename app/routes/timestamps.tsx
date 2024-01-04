import { type DataFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { requireUserId } from '#app/utils/auth.server'

export async function loader({ request }: DataFunctionArgs) {
	await requireUserId(request)

	return null
}

export default function TimestampsRoute() {
	return (
		<main className="container flex h-full min-h-[400px] px-0 pb-12 md:px-8">
			<div className="grid w-full grid-cols-4 bg-muted pl-2 md:container md:mx-2 md:rounded-3xl md:pr-0">
				<Outlet />
			</div>
		</main>
	)
}
