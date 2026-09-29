export default function ContentBody({ text, headingLevel = 2 }) {
  const lines = String(text || "").replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let list = [];
  const flush = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
    if (list.length) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
    } else if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "heading", text: line.slice(3) });
    } else if (line.startsWith("- ")) {
      if (paragraph.length) flush();
      list.push(line.slice(2));
    } else {
      if (list.length) flush();
      paragraph.push(line);
    }
  }
  flush();
  return blocks.map((block, index) => {
    if (block.type === "heading") {
      const Heading = headingLevel === 4 ? "h4" : headingLevel === 3 ? "h3" : "h2";
      return <Heading key={index}>{block.text}</Heading>;
    }
    if (block.type === "list") {
      return <ul key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>;
    }
    return <p key={index}>{block.text}</p>;
  });
}
