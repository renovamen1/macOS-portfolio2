import React from 'react';

const VerifiedIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-label="Verified account"
    role="img"
    className="size-5 ml-1 text-[#1d9bf0]"
  >
    <g>
      <path
        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.9-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.34 2.34 5.66-5.66 1.41 1.42-7.07 7.08z"
        fill="currentColor"
      />
    </g>
  </svg>
);

const Tweet = ({
  avatar,
  name,
  handle,
  time,
  text,
  comments,
  retweets,
  likes,
  views,
}: {
  avatar: string;
  name: string;
  handle: string;
  time: string;
  text: string;
  comments: string;
  retweets: string;
  likes: string;
  views: string;
}) => (
  <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex space-x-3">
    <img src={avatar} alt="avatar" className="size-12 rounded-full" />
    <div className="flex-1">
      <div className="flex items-center space-x-1">
        <span className="font-bold text-gray-900 dark:text-white">{name}</span>
        <VerifiedIcon />
        <span className="text-gray-500">@{handle}</span>
        <span className="text-gray-500">·</span>
        <span className="text-gray-500">{time}</span>
      </div>
      <p className="text-gray-800 dark:text-gray-200">{text}</p>
      <div className="flex justify-between mt-3 text-gray-500 max-w-sm">
        <div className="flex items-center space-x-1">
          <span className="i-icon-park-outline:comment" />
          <span>{comments}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="i-icon-park-outline:retweet" />
          <span>{retweets}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="i-icon-park-outline:like" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="i-icon-park-outline:chart-line" />
          <span>{views}</span>
        </div>
      </div>
    </div>
  </div>
);

export default function Twitter() {
  return (
    <div className="size-full bg-white dark:bg-black text-sm text-gray-800 dark:text-white select-none">
      {/* Header */}
      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('img/ui/wallpaper.jpg')" }} />

      {/* Profile Info */}
      <div className="p-3">
        <div className="flex justify-between">
          <img
            src="img/ui/ip.jpeg"
            alt="profile"
            className="size-32 rounded-full -mt-16 border-4 border-white dark:border-black"
          />
          <a href="https://x.com/Prab1n_" target="_blank" rel="noreferrer">
            <button className="mt-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 font-bold">
              Follow
            </button>
          </a>
        </div>

        <div className="mt-2">
          <div className="flex items-center">
            <span className="text-xl font-bold">Prabin Thakur</span>
            <VerifiedIcon />
          </div>
          <span className="text-gray-500">@Prab1n_</span>
        </div>

        <p className="mt-2">
          curious builder-learner| DS undergard
          <br />
           ML| Agents | GenAI
        </p>

        <div className="flex space-x-4 mt-2 text-gray-500">
          <span>
            <span className="font-bold text-gray-900 dark:text-white">1337</span> Following
          </span>
          <span>
            <span className="font-bold text-gray-900 dark:text-white">999K</span> Followers
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b border-gray-200 dark:border-gray-800">
        <div className="py-3 font-bold border-b-2 border-[#1d9bf0] text-[#1d9bf0]">Tweets</div>
        <div className="py-3 text-gray-500">Replies</div>
        <div className="py-3 text-gray-500">Media</div>
        <div className="py-3 text-gray-500">Likes</div>
      </div>

      {/* Tweets */}
      <div className="overflow-y-auto">
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="13h"
          text="Just built a macOS clone in React! Check out the repo 💻"
          comments="123"
          retweets="456"
          likes="7.8K"
          views="99.1K"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="May 1"
          text="Grok 4 is 🔥"
          comments="24"
          retweets="99"
          likes="1.2K"
          views="15.3K"
        />
      </div>
    </div>
  );
}