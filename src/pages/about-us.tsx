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
        <h2 className="w-fit pt-4 sm:pt-8 pb-2 bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text font-heading text-2xl text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] sm:text-4xl">How To Use</h2>
        <h3 className="w-fit pt-4 sm:pt-8 pb-2 bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text font-heading text-xl text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] sm:text-4xl">
          1. Sign In 
        </h3>
        <p className=" pt-2 font-heading text-pink text-justify">
          Sign in using the available third-party authentication apps.
        </p>
        <h3 className="w-fit pt-4 sm:pt-8 pb-2 bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text font-heading text-xl text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] sm:text-4xl">
          2. Attempt a Task
        </h3>
        <p className=" pt-2 font-heading text-pink text-justify">
          After you login, you will be presented with a list of rooms. 
          Each room contains a list of tasks. 
        </p>
         <h3 className="w-fit pt-4 sm:pt-8 pb-2 bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text font-heading text-xl text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] sm:text-4xl">
          2. Complete the Task
        </h3>
        <p className=" pt-2 font-heading text-pink text-justify">
          Once you have completed the task, click on the &quot;complete Task&quot; button.
          <br />
          Show the presented qrcode to one of the admins.
          <br />
          Once they have scanned the code you will be rewarded the points for completing that task.
        </p>
        <h3 className="w-fit pt-4 sm:pt-8 pb-2 bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text font-heading text-xl text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] sm:text-4xl">
          3. Check the Leaderboard
        </h3>
        <p className=" pt-2 font-heading text-pink text-justify">
          The more points you get the higher your chance of winning prizes in the raffle.
        </p>

        <h2 className="w-fit pt-8 bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text font-heading text-2xl text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] sm:text-4xl">Stats for Nerds</h2>
        <p className="pt-2 font-heading text-pink text-justify">
          This was built using the   
          <a href="https://create.t3.gg" className="underline text-green"> T3 Stack.</a> 
          <br />
          The web-app is hosted on vercel free tier hosting platform and the db on Supabase. (This may make it slightly slow at times).
        </p>

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
