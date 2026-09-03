import rehypeSanitize from "rehype-sanitize";
import ReactMarkDown from "react-markdown";

export function Markdown({source} : {source: string}) {
    return <ReactMarkDown rehypePlugins={[rehypeSanitize]}>{source}</ReactMarkDown>
}