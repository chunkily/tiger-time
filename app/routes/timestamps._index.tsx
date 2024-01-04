import { type DataFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Icon } from '#app/components/ui/icon'
import { requireUserId } from '#app/utils/auth.server'
import { prisma } from '#app/utils/db.server'

export async function loader({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const timestampSets = await prisma.timestampSet.findMany()

	return json({ timestampSets })
}

export default function TimestampsRoute() {
	const data = useLoaderData<typeof loader>()

	let itemsFragment

	if (data.timestampSets.length > 0) {
		itemsFragment = data.timestampSets.map(timestampSet => {
			return (
				<div key={timestampSet.id}>
					<div className="md:flex">
						<div className="md:flex-shrink-0">
							{/* You can put an image here if you have one */}
							{/* <img className="h-48 w-full object-cover md:w-48" src={timestampSet.image} alt={timestampSet.title} /> */}
						</div>
						<div className="p-8">
							<div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
								{timestampSet.title}
							</div>
							{/* You can put more details here */}
						</div>
					</div>
				</div>
			)
		})
	} else {
		itemsFragment = (
			<div className="col-span-4 flex h-full items-center justify-center">
				<p className="text-2xl text-gray-400">No timestamp sets yet</p>
			</div>
		)
	}

	return (
		<>
			<div className="m-3">
				<Link to="new">
					<div className="mx-auto flex w-full max-w-md items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:max-w-2xl">
						<div className="p-8">
							<div className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-500">
								<Icon name="plus">New timestamp set</Icon>
							</div>
						</div>
					</div>
				</Link>
			</div>
			{itemsFragment}
		</>
	)
}
