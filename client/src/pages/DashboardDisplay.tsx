import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Fragment } from 'react'
import { AsideLeft } from '../components/AsideLeft'
import { AsideRight } from '../components/AsideRight'
import { BsFillImageFill } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { AiOutlineArrowUp } from "react-icons/ai";
function DashboarDisplay(props: any) {
    // const location = useLocation()
    // const prop1 = location.state.prop1
    // console.log(prop1)
    const [content,setContent] = React.useState<string>('')
    const [user,setUser] = React.useState<User | null>(null)
    const [feat, setFeat] = React.useState<any>([])

  React.useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:2012/checkuser', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUser(data);
      } else {
        // Handle non-OK response (e.g., unauthorized or server error)
        // You can choose to set the user state to null or handle it differently
        console.log('cool')
        setUser(null);
      }
    } catch (error) {
      // Handle fetch errors (e.g., network error)
      // You can display an error message or handle it as needed
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
    // this is to pass data to the backend when user makes a post
    const loginUser = {
        userId: user?._id,
        name: user?.userName
  }

const cool = ['' ,'','' ,'','' ,'','' ,'','' ,'']
  // created to get data from the database so we can render post to user
    const renderFeats = async () => {
        try {
          const getFeats = await fetch('http://localhost:2012/renderfeats', {
            method: 'GET',
            credentials: 'include',
          });

          if (getFeats.ok) {
            const data = await getFeats.json();
            setFeat(data);
            //console.log(data); // Logging the fetched data
          } else {
            // Handle non-OK response (e.g., unauthorized or server error)
            console.error('Error fetching data:', getFeats.status);
          }
        } catch (error) {
          // Handle fetch errors (e.g., network error)
          console.error('Error fetching data:', error);
        }
  };
React.useEffect(() => {

  renderFeats();
}, []);
  // forgot what this is for probably why you should make comments
interface User {
  followers: any[];
  likes: any[];
  following: any[];
  events: any[];
  _id: string;
  userName: string;
  email: string;
  password: string;
  __v: number;
}
interface FeatItems {
  likes: any[],
  reFeats: any[],
  _id: string,
  text: string,
  date: string,
  _v: number,
  userId: string,
  name:string
}
  const handleClick = async () => {
            await fetch('http://localhost:2012/postfeat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ content, loginUser})
        })
        setContent('')
        renderFeats()
  }
  return (
 <div className="flex justify-center px-5 sm:px-32 md:mt-4">
                <div className="flex h-screen w-screen">

                    <AsideLeft />

                    <main className="md:mx-4 w-full sm:basis-2/3">

                        <header className="m-4 hidden sm:flex">
                            <h1 className="text-xl font-semi-bold">{user?.followers.length}{user?.userName}</h1>
                        </header>

                        <header className="text-xl font-bold flex py-4 text-blue-600 sm:hidden">
                            <Link to="/home" id="hero-logo">  </Link>
                        </header>

                        {/* create post */}

                        <>
                            <div className="border sm:ml-3 sm:mr-0 flex px-2 py-3">

                                <div className="mt-3 w-12 h-12 text-lg flex-none">
                                    <img src='https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' className="flex-none w-12 h-12 rounded-full" alt="avatar" />
                                </div>

                                <div className="w-full px-4">
                                    <textarea
                                        value={content}
                                        placeholder="What's happening?"
                                        className="resize-none mt-3 pb-3 w-full h-28 bg-slate-100 focus:outline-none rounded-xl p-2"
                                        onChange={(e) => setContent(e.target.value)}
                                         >
                                    </textarea>
                                    <div className="max-w-xl max-h-80 mx-auto rounded-md">
                                        <img
                                            src={""}
                                            className={false ? "block max-w-full max-h-20 rounded-md my-2 cursor-pointer" : "hidden"}
                                            alt="avatar"
                                        />
                                    </div>

                                    <div className="flex justify-between">
                                        <label className="flex m-2">
                                            <input
                                                className="hidden"
                                                type="file"
                                                
                                            />
                                            <BsFillImageFill className="text-2xl mt-1 text-blue-700 cursor-pointer" />
                                        </label>
                                        <button
                                            onClick={handleClick}
                                            className="p-2.5 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out disabled:cursor-not-allowed"
                                            >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {/* filter posts by date and trending */}

                            <div className="flex pl-0.5 pr-0.5 sm:pr-6 sm:px-5 py-3 justify-between relative">

                                <h1 className="text-xl"> Posts</h1>

                                <GiSettingsKnobs
                                    className="fill-blue-600 stroke-0 hover:stroke-2 text-2xl cursor-pointer"
                                    >
                                </GiSettingsKnobs>

                                {/* filter modal */}

                                
                            </div>

                            {/* Show Posts */}
                            {/* gett the amount of time that has over lapped between post 
                              goo shit tonight little bro
                            */}
                            {feat.sort().map((item: FeatItems) => {
                              return (
                                <div className=" bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl " key={item._id}>
                                  <div className="  items-start px-4 py-6">
                                      <div className='flex justify-between'>
                                          <div className='flex'>
                                            <img className=" inline w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
                                            <div>
                                                <h2 className="flex-1 text-lg font-semibold text-gray-900 -mt-1">{item.name}</h2>
                                                <p className="text-gray-700">@{item.name}</p>
                                            </div>
                                          </div>
                                          <div className="flex inline-block items-center">
                                            <small className="flex-10 text-sm text-gray-700">{item.date}</small>
                                          </div>   
                                      </div>                                   
                                      <div className="">
                                        <div>
                                          <p className="mt-3 text-gray-700 text-sm">
                                              {item.text}
                                          </p>
                                        </div>
                                        <div className="mt-4 flex items-center">
                                            <div className="flex mr-2 text-gray-700 text-sm mr-3">
                                              <svg fill="none" viewBox="0 0 24 24"  className="w-4 h-4 mr-1" stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                                </svg>
                                              <span>{item.likes.length}</span>
                                            </div>
                                            <div className="flex mr-2 text-gray-700 text-sm mr-8">
                                              <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                                              </svg>
                                              <span>{item.reFeats.length}</span>
                                            </div>
                                            <div className="flex mr-2 text-gray-700 text-sm mr-4">
                                              <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                                </svg>
                                              <span>share</span>
                                            </div>
                                        </div>
                                      </div>
                                  </div>
                                </div> 
                              )
                            })

                            }                           

                        </>

                    </main>

                    <AsideRight />
                    <a href="#">
                        <AiOutlineArrowUp className="hidden sm:block fixed bottom-0 right-20 bg-blue-300 text-slate-50 text-5xl p-3 rounded-full mb-2 mr-20 hover:bg-blue-500" />
                    </a>
                </div>
            </div>
  )
}

export default DashboarDisplay
                            // {isLoading ? (
                            //     <div className="z-20">
                            //         <Loader show={isLoading} />
                            //     </div>
                            // ) : (
                            //     !sortedPosts.length ?
                            //         <h1 className="text-2xl font-bold text-center mt-8">No Posts, Add one!</h1> :
                            //         sortedPosts?.map(post => <Post key={post._id} post={post} />
                            //         )
                            // )}
                                //                             <div className="w-30 h-22 px-1 shadow-xl bg-slate-100 border border-slate-300 text-slate-600 font-semibold absolute right-11 top-4 z-20 rounded-xl">
                                //     <ul className="p-2 cursor-pointer text-start">
                                //         <li className="p-1 hover:bg-slate-200 rounded" >Latest</li>
                                //         <li className="p-1 hover:bg-slate-200 rounded" >Oldest</li>
                                //         <li className="p-1 hover:bg-slate-200 rounded" >Trending</li>
                                //     </ul>
                                // </div>