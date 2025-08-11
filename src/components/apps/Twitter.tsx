import React from "react";

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

const RetweetIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 1l4 4-4 4" />
    <path d="M3 11V9a4 4 0 014-4h14" />
    <path d="M7 23l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
);

const CommentIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500 hover:text-blue-500 transition-colors"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01L12 16v2.24l5.493-3.04c1.858-1.03 3.007-2.98 3.007-5.09 0-3.42-2.827-6.13-6.129-6.13H9.756z" />
  </svg>
);

const ImpressionsIcon = () => (
  <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10H6V21H4zm9.248 0v-7h2v7h-2z" />
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
  views
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
          <CommentIcon />
          <span>{comments}</span>
        </div>
        <div className="flex items-center space-x-1">
          <RetweetIcon />
          <span>{retweets}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="i-icon-park-outline:like" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ImpressionsIcon />
          <span>{views}</span>
        </div>
      </div>
    </div>
  </div>
);

export default function Twitter() {
  return (
    <div className="size-full bg-white dark:bg-black text-sm text-gray-800 dark:text-white select-none flex flex-col">
      {/* Header */}
      <div className="h-12 flex items-center px-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <h1 className="text-lg font-bold">Home</h1>
      </div>

      <div className="overflow-y-auto flex-grow no-scrollbar">
        {/* Profile Info */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-800">
          <div
            className="h-24 bg-cover bg-center"
            style={{ backgroundImage: "url('img/ui/wallpaper.jpg')" }}
          />
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
              <span className="font-bold text-gray-900 dark:text-white">137</span>{" "}
              Following
            </span>
            <span>
              <span className="font-bold text-gray-900 dark:text-white">5.7K</span>{" "}
              Followers
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-around border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <div className="py-3 font-bold border-b-2 border-[#1d9bf0] text-[#1d9bf0]">
            Tweets
          </div>
          <div className="py-3 text-gray-500">Replies</div>
          <div className="py-3 text-gray-500">Media</div>
          <div className="py-3 text-gray-500">Likes</div>
        </div>

        {/* Tweets */}
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="13h"
          text="Just built a macOS clone in React! Check out the repo 💻"
          comments="12"
          retweets="4"
          likes="1.3K"
          views="9.7K"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="May 1"
          text="Grok 4 is 🔥"
          comments="2"
          retweets="9"
          likes="764"
          views="5.3K"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="Apr 20"
          text="Just shipped a new feature for my project!"
          comments="6"
          retweets="1"
          likes="203"
          views="784"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="Apr 1"
          text="Working on something new and exciting!"
          comments="1"
          retweets="0"
          likes="21"
          views="867"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="Mar 20"
          text="This is another tweet!"
          comments="1"
          retweets="0"
          likes="3"
          views="40"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="Mar 1"
          text="Hello World!"
          comments="1"
          retweets="2"
          likes="21"
          views="811"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="Feb 25"
          text="Autonomous agents are the future."
          comments="5"
          retweets="10"
          likes="157"
          views="5K"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="Feb 20"
          text="The rate of progress in AI is astounding."
          comments="4"
          retweets="0"
          likes="563"
          views="1.3K"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="Feb 15"
          text="Excited to see what comes next for AI agents."
          comments="0"
          retweets="0"
          likes="40"
          views="437"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="Feb 10"
          text="The potential of AI agents is limitless."
          comments="3"
          retweets="0"
          likes="37"
          views="350"
        />
        <Tweet
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          handle="Prab1n_"
          time="Feb 5"
          text="AI agents are changing the world."
          comments="0"
          retweets="0"
          likes="28"
          views="304"
        />
      </div>
    </div>
  );
}
