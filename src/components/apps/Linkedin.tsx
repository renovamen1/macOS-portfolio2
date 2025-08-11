import React from "react";

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-label="LinkedIn icon"
    role="img"
    className="size-5 ml-1 text-[#0a66c2]"
  >
    <g>
      <path
        d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.62 1.62 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
        fill="currentColor"
      />
    </g>
  </svg>
);

const Post = ({
  avatar,
  name,
  time,
  text,
  likes,
  comments,
  postImage,
  caption
}: {
  avatar: string;
  name: string;
  time: string;
  text: string;
  likes: string;
  comments: string;
  postImage?: string;
  caption?: string;
}) => (
  <div className="p-3 border-b border-gray-200 dark:border-gray-800">
    <div className="flex items-center space-x-2">
      <img src={avatar} alt="avatar" className="size-12 rounded-full" />
      <div>
        <span className="font-bold text-gray-900 dark:text-white">{name}</span>
        <div className="text-gray-500 text-xs">{time}</div>
      </div>
    </div>
    <p className="text-gray-800 dark:text-gray-200 mt-2">{text}</p>
    {postImage && (
      <div className="mt-3 rounded-lg overflow-hidden">
        <img src={postImage} alt="post image" className="w-full" />
        {caption && (
          <p className="text-gray-800 dark:text-gray-200 mt-2 p-2">{caption}</p>
        )}
      </div>
    )}
    <div className="flex justify-between mt-3 text-gray-500 max-w-sm">
      <div className="flex items-center space-x-1">
        <span className="i-icon-park-outline:like" />
        <span>{likes}</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="i-icon-park-outline:comment" />
        <span>{comments}</span>
      </div>
    </div>
  </div>
);

export default function Linkedin() {
  return (
    <div className="size-full bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white select-none flex flex-col">
      {/* Header */}
      <div className="h-12 flex items-center px-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <h1 className="text-lg font-bold flex items-center">
          LinkedIn
          <LinkedinIcon />
        </h1>
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
            <a
              href="https://www.linkedin.com/in/prabin-thakur-951773321/"
              target="_blank"
              rel="noreferrer"
            >
              <button className="mt-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 font-bold">
                Connect
              </button>
            </a>
          </div>

          <div className="mt-2">
            <div className="flex items-center">
              <span className="text-xl font-bold">Prabin Thakur</span>
              <span className="text-gray-500 ml-2">
                · <span className="inline">2nd</span>
              </span>
            </div>
            <span className="text-gray-500">DS @inspiria | ML | AI Agents</span>
            <div className="text-gray-500 text-sm">
              Kathmandu,Nepal ·{" "}
              <a href="#" className="text-blue-600">
                Contact info
              </a>
            </div>
          </div>

          <div className="flex space-x-4 mt-2 text-gray-500">
            <span>
              <span className="font-bold text-gray-900 dark:text-white">863</span>{" "}
              followers
            </span>
            <span>
              <span className="font-bold text-gray-900 dark:text-white">500+</span>{" "}
              connections
            </span>
          </div>

          <div className="flex items-center mt-2">
            <img
              src="img/ui/stevejobs.webp"
              alt="mutual connection"
              className="size-7 rounded-full border-2 border-white dark:border-gray-900"
            />
            <img
              src="img/ui/elon.webp"
              alt="mutual connection"
              className="-ml-2 size-7 rounded-full border-2 border-white dark:border-gray-900"
            />
            <span className="ml-2 text-gray-500 text-sm">
              Steve jobs, elon musk and 8 other mutual connections
            </span>
          </div>
        </div>

        {/* Posts */}
        <Post
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          time="2d"
          text="Excited to share that I've built a macOS clone using React! It was a great learning experience. #React #WebDev"
          likes="1.2K"
          comments="14"
          postImage="img/ui/macos-ss2.png"
          caption="My macOS clone built with React!"
        />
        <Post
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          time="1w"
          text="The progress in Generative AI is mind-blowing. What are your favorite new tools and models? #AI #GenAI"
          likes="176"
          comments="11"
          postImage="img/ui/ai.png"
          caption="Generative AI is amazing!"
        />
        <Post
          avatar="img/ui/ip.jpeg"
          name="Prabin Thakur"
          time="2w"
          text="Just finished a deep dive into autonomous agents. The potential is huge! #AI #Agents"
          likes="54"
          comments="3"
          postImage="img/ui/n8n.webp"
          caption="Autonomous agents are the future."
        />
      </div>
    </div>
  );
}
