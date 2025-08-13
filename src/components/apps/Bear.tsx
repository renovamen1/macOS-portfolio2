import { useState, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import bear from "~/configs/bear";
import type { BearMdData } from "~/types";
import { useStore } from "~/stores";

interface ContentProps {
  contentID: string;
  contentURL: string;
}

interface MiddlebarProps {
  items: BearMdData[];
  cur: number;
  setContent: (id: string, url: string, index: number) => void;
}

interface SidebarProps {
  cur: number;
  setMidBar: (items: BearMdData[], index: number) => void;
}

interface BearState extends ContentProps {
  curSidebar: number;
  curMidbar: number;
  midbarList: BearMdData[];
}

const Highlighter = (dark: boolean): any => {
  interface codeProps {
    node: any;
    inline: boolean;
    className: string;
    children: any;
  }

  return {
    code({ node, inline, className, children, ...props }: codeProps) {
      const match = /language-(\w+)/.exec(className || "");
      const [copied, setCopied] = useState(false);

      const handleCopy = () => {
        navigator.clipboard.writeText(String(children));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      return !inline && match ? (
        <div className="relative group">
          <SyntaxHighlighter
            style={dark ? dracula : prism}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            className="absolute top-2 right-2 p-1 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            onClick={handleCopy}
          >
            <span className="sr-only">Copy to clipboard</span>
            {copied ? (
              <span className="i-feather:check text-blue-400" />
            ) : (
              <span className="i-feather:copy" />
            )}
          </button>
        </div>
      ) : (
        <code className={className}>{children}</code>
      );
    }
  };
};

const Sidebar = ({ cur, setMidBar }: SidebarProps) => {
  return (
    <div className="text-c-900 dark:text-c-100">
      <div className="h-12 pr-3 flex items-center justify-between">
        <h1 className="text-lg font-bold pl-4">Notes</h1>
        <div className="flex items-center space-x-3 opacity-70">
          <span className="i-feather:cloud-off text-lg" />
          <span className="i-feather:settings text-lg" />
        </div>
      </div>
      <ul className="py-1">
        {bear.map((item, index) => (
          <li
            key={`bear-sidebar-${item.id}`}
            className={`mx-2 px-3 pl-6 h-9 flex items-center rounded-md cursor-default transition-colors ${
              cur === index
                ? "bg-blue-500 text-white"
                : "text-c-900 dark:text-c-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setMidBar(item.md, index)}
          >
            <span className={`${item.icon} opacity-90`} />
            <span className="ml-2 font-medium truncate">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Middlebar = ({ items, cur, setContent }: MiddlebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-md focus:outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="flex-1 overflow-y-auto">
        {filteredItems.map((item: BearMdData, index: number) => (
          <li
            key={`bear-midbar-${item.id}`}
            className={`mx-2 my-1 p-3 cursor-default rounded-lg border transition-colors backdrop-blur-sm ${
              cur === index
                ? "border-blue-500/70 bg-white/90 dark:bg-black/50 shadow"
                : "border-transparent hover:bg-white/70 dark:hover:bg-black/40"
            }`}
            onClick={() => setContent(item.id, item.file, index)}
          >
            <div className="flex items-center">
              <span className={`${item.icon} text-xl text-c-500`} />
              <h2 className="ml-3 font-semibold text-c-900 dark:text-c-100">
                {item.title}
              </h2>
            </div>
            <p className="mt-2 text-sm text-c-800 dark:text-c-300">{item.excerpt}</p>
            <div className="mt-2 text-xs text-c-500">
              <span>{item.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getRepoURL = (url: string) => {
  return url.slice(0, -10) + "/";
};

const fixImageURL = (text: string, contentURL: string): string => {
  text = text.replace(/&nbsp;/g, "");
  if (contentURL.indexOf("raw.githubusercontent.com") !== -1) {
    const repoURL = getRepoURL(contentURL);

    const imgReg = /!\[(.*?)\]\((.*?)\)/;
    const imgRegGlobal = /!\[(.*?)\]\((.*?)\)/g;

    const imgList = text.match(imgRegGlobal);

    if (imgList) {
      for (const img of imgList) {
        const imgURL = (img.match(imgReg) as Array<string>)[2];
        if (imgURL.indexOf("http") !== -1) continue;
        const newImgURL = repoURL + imgURL;
        text = text.replace(imgURL, newImgURL);
      }
    }
  }
  return text;
};

const Content = ({ contentID, contentURL }: ContentProps) => {
  const [storeMd, setStoreMd] = useState<{ [key: string]: string }>({});
  const dark = useStore((state) => state.dark);

  const fetchMarkdown = useCallback(
    (id: string, url: string) => {
      if (!storeMd[id]) {
        fetch(url)
          .then((response) => response.text())
          .then((text) => {
            storeMd[id] = fixImageURL(text, url);
            setStoreMd({ ...storeMd });
          })
          .catch((error) => console.error(error));
      }
    },
    [storeMd]
  );

  useEffect(() => {
    fetchMarkdown(contentID, contentURL);
  }, [contentID, contentURL, fetchMarkdown]);

  const customRenderers = {
    h1: ({...props}) => <h1 style={{color: 'grey'}} {...props} />,
    h2: ({...props}) => <h2 style={{color: 'black'}} {...props} />,
    a: ({...props}) => <a style={{color: 'red'}} {...props} />,
    strong: ({...props}) => <strong style={{color: 'blue'}} {...props} />,
  };

  return (
    <div className="prose dark:prose-invert w-[min(58rem,92%)] mx-auto px-6 py-10 leading-7">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeKatex,
          [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }]
        ]}
        components={{...Highlighter(dark as boolean), ...customRenderers}}
      >
        {storeMd[contentID]}
      </ReactMarkdown>
    </div>
  );
};

const Bear = () => {
  const [state, setState] = useState<BearState>({
    curSidebar: 0,
    curMidbar: 0,
    midbarList: bear[0].md,
    contentID: bear[0].md[0].id,
    contentURL: bear[0].md[0].file
  });

  const setMidBar = (items: BearMdData[], index: number) => {
    setState({
      curSidebar: index,
      curMidbar: 0,
      midbarList: items,
      contentID: items[0].id,
      contentURL: items[0].file
    });
  };

  const setContent = (id: string, url: string, index: number) => {
    setState({
      ...state,
      curMidbar: index,
      contentID: id,
      contentURL: url
    });
  };

  return (
    <div className="bear font-avenir flex h-full bg-transparent">
      <div className="w-52 overflow-auto border-r border-menu bg-c-200/70 dark:bg-black/35 backdrop-blur-xl">
        <Sidebar cur={state.curSidebar} setMidBar={setMidBar} />
      </div>
      <div className="w-72 overflow-auto border-r border-menu bg-white/90 dark:bg-black/30 backdrop-blur-xl">
        <Middlebar
          items={state.midbarList}
          cur={state.curMidbar}
          setContent={setContent}
        />
      </div>
      <div className="flex-1 overflow-auto bg-white/95 dark:bg-black/45 backdrop-blur-xl">
        <Content contentID={state.contentID} contentURL={state.contentURL} />
      </div>
    </div>
  );
};

export default Bear;
