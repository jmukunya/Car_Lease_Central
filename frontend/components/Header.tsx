import LogoutButton from "./LogoutButton";

const Header = ({name}) => {
  return (
      <div className='flex p-4 justify-between items-center bg-blue-100'>
          <h1 className='text-blue-700 font-extrabold text-4xl'>{name}</h1>
          <LogoutButton />
      </div>
  )
}

export default Header
