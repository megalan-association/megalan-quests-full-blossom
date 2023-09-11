import UserPageLayout from "~/layouts/UserPageLayout"

const map = () => {
  return (
    <UserPageLayout headingText="Map">
      <div className="block m-auto lg:flex space-y-2 lg:space-y-0 lg:space-x-2 lg:justify-center">
        <div className="w-96 py-40 bg-gray-400 text-center m-auto lg:m-0 border-2 border-green rounded-md">Placeholder: G/F map</div>
        <div className="w-96 py-40 bg-gray-400 text-center m-auto lg:m-0 border-2 border-green rounded-md">Placeholder: B/F map</div>
      </div>
    </UserPageLayout>
  )
}

export default map
