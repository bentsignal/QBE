import { XR_COLORS, XR_STYLES } from "@/styles/xr-styles";
import { Container } from "@react-three/uikit";
import type { Schema } from "hast-util-sanitize";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { H1, H2, H3, H4, H5, H6, TextElement } from "@/components/xr";

export default function XRMarkdown({ content }: { content: string }) {
  return (
    <Container
      flexDirection="column"
      flexShrink={0}
      width="100%"
      gap={XR_STYLES.spacingLg}
    >
      <ReactMarkdown
        rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </Container>
  );
}

const sanitizeSchema: Schema = {
  tagNames: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "ul",
    "ol",
    "li",
    "strong",
    "code",
    "table",
  ],
};

const List = ({ children }: { children: React.ReactNode }) => (
  <Container
    flexDirection="column"
    flexShrink={0}
    width="100%"
    gap={XR_STYLES.spacingMd}
    paddingLeft={XR_STYLES.spacingMd}
  >
    {children}
  </Container>
);

const markdownComponents: Partial<Components> = {
  p: ({ children }) => <TextElement>{children}</TextElement>,
  ul: ({ children }) => <List>{children}</List>,
  ol: ({ children }) => <List>{children}</List>,
  li: ({ children }) => <TextElement>- {children}</TextElement>,
  strong: ({ children }) => (
    <TextElement fontWeight="bold">{children}</TextElement>
  ),
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  h4: ({ children }) => <H4>{children}</H4>,
  h5: ({ children }) => <H5>{children}</H5>,
  h6: ({ children }) => <H6>{children}</H6>,
  code: () => (
    <TextElement color={XR_COLORS.destructive}>
      Currently unable to render code. Please view in the browser.
    </TextElement>
  ),
  table: () => (
    <TextElement color={XR_COLORS.destructive}>
      Currently unable to render tables. Please view in the browser.
    </TextElement>
  ),
};
