import React from 'react'

function Filter({ allComments, filter, setFilter }) {
    return (
        <div className='mt-10 py-4 sm:py-0 flex flex-col sm:flex-row w-full border-b border-zinc-300 dark:border-zinc-700 sm:justify-between'>
            <p className="text-xl dark:text-gray-400  py-4 tracking-normal font-semibold">Comments
                <span className='ml-2 border px-2 py-1 border-zinc-300 dark:border-zinc-700 font-normal bg-white dark:bg-zinc-900/50'>{allComments.length}</span>
            </p>

            <div className='flex gap-4 flex-wrap'>
                <div className='flex items-center gap-2'>
                    <label htmlFor="rating" className="dark:text-gray-400 block text-md">Filter By</label>
                    <select id="rating" name="rating" value={filter.rating ?? ""} onChange={(e) => setFilter({ ...filter, rating: Number(e.target.value) })} className="bg-white border border-zinc-300 text-sm block w-[135px] px-2 py-2 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-teal-500 text-gray-500 dark:text-gray-400">
                        <option value="" disabled>Select a rating</option>
                        <option value={0}>All Reviews</option>
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Star</option>
                        <option value={3}>3 Star</option>
                        <option value={4}>4 Star</option>
                        <option value={5}>5 Star</option>
                        <option value={6}>No Rating</option>
                    </select>
                </div>

                <div className='flex items-center gap-2'>
                    <p className='text-black dark:text-gray-400 text-md'>Sort by</p>
                    <select value={filter.sortBy} onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })} className="bg-white border px-4 border-zinc-300 text-sm block w-[100px] py-2 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-teal-500 text-gray-500 dark:text-gray-400">
                        <option value="latest">Latest </option>
                        <option value="oldest">Oldest </option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filter