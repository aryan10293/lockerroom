import React from "react";
import UserToFollow from "./UserToFollow";
export const AsideRight = () => {
    return (
        <aside className="w-full basis-2/6 flex-col ml-7 hidden lg:flex md:mt-2">

            <div className="sticky mt-3 flex items-center pl-4 pr-10 w-full rounded-md">
                <div className="flex-1">
                    <input
                        className="w-full bg-slate-200 text-center p-2 rounded-3xl placeholder:text-black cursor-pointer text-md"
                        type="search"
                        placeholder="Search"
                    />
                </div>
            </div>

            <div className="mt-2 ">

                {'lol '.trim() === "" ? (

                    <div>


                    </div>
                ) : ( (
                    <div>
                        <h1 className="text-xl mt-6 text-center font-bold">Athletes To Meet</h1>
                        <ul className="">
                            <UserToFollow />
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    )
};
                            // {suggestionList.map(user => (
                            //     <UserDetails key={user._id} currentUser={user} />
                            // ))}
                        //                             {searchResults?.length === 0 && (
                        //     <h2 className="text-lg w-full text-center font-semi-bold">No user found</h2>
                        // )}

                        // {searchResults.map(user => (
                        //     <UserDetails key={user._id} currentUser={user} />
                        // ))}