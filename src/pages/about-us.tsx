import Image from "next/image"
import Layout from "~/layouts/Layout"

const ContributorCard = ({name, imgPath}: {name: string, imgPath: string}) => {
  return (
    <div className="w-64 m-2 p-2 grid grid-cols-[auto_1fr] items-center bg-light-pink border-pink border-2 rounded-xl">
      <Image src={imgPath} alt={`${name}'s profile picture`} width={64} height={64} className="w-8 h-8 rounded-full" />
      <p className="pl-2 font-heading text-brown text-xl">{name}</p>
    </div>
  )
}

const about = () => {
  return (<>
    <Layout>
      <div className="w-11/12 sm:w-10/12 m-auto">
        <h1 className="w-fit bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text font-heading text-3xl font-bold text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] sm:text-6xl">About Us</h1>
        <h2 className="w-fit pt-4 sm:pt-8 pb-2 bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text font-heading text-xl text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] sm:text-4xl">Subheading</h2>
        <p className=" pt-2 font-heading text-pink text-justify">This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pellentesque libero a urna porttitor, non semper sapien rutrum. Donec gravida, dolor a tempor ultrices, neque mi lacinia neque, vitae mattis ligula dolor non justo. Ut massa odio, fermentum quis interdum vel, iaculis non ipsum. Vestibulum posuere mattis est nec viverra. Donec sodales eu odio eget finibus. Cras placerat et dui at vehicula. Curabitur aliquet, ipsum at malesuada facilisis, dolor ipsum efficitur turpis, non tempus enim ante vitae justo. Aliquam id erat sit amet eros ultricies faucibus. Quisque vitae purus fermentum ligula dictum viverra nec dapibus ipsum. Nulla eu lectus pretium, molestie velit a, dignissim ligula. Sed eget est tincidunt justo placerat dapibus. Vivamus enim orci, viverra vitae nunc quis, vestibulum gravida felis. Donec vel vestibulum elit. Suspendisse enim nibh, cursus nec viverra in, malesuada ut turpis. Mauris vel tellus et magna vehicula ultrices. Maecenas consectetur augue at massa vehicula finibus.</p>

        <h2 className="w-fit pt-8 bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text font-heading text-xl text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] sm:text-4xl">MegaLAN: Full Blossom Quests Website Development Team</h2>
        <div className="w-fit pt-2 m-auto sm:grid sm:grid-cols-2 lg:grid-cols-3">
          <ContributorCard name="Hari" imgPath="/profile-hari.png" />
          <ContributorCard name="Vishnu" imgPath="/profile-vishnu.png" />
          <ContributorCard name="Max" imgPath="/profile-max.jpg" />
          <ContributorCard name="Isaac" imgPath="/profile-isaac.jpg" />
          <ContributorCard name="Christine" imgPath="/profile-christine.jpg" />
          <ContributorCard name="Renee" imgPath="/profile-renee.jpg" />
        </div>
      </div>
    </Layout>
    
  </>)
}

export default about
