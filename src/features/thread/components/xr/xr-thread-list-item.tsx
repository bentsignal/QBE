import { memo, useState } from "react";
import { hexColors, xrStyles } from "@/styles";
import { Container, Text } from "@react-three/uikit";
import { Brain, ExternalLink } from "@react-three/uikit-lucide";
import equal from "fast-deep-equal";
import useThreadStore from "../../store";
import { Thread } from "../../types";

const XRThreadListItem = ({ thread }: { thread: Thread }) => {
  const setActiveThread = useThreadStore((state) => state.setActiveThread);
  const addXrThread = useThreadStore((state) => state.addXrThread);
  const setMainThread = useThreadStore((state) => state.setMainThread);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Container
      onHoverChange={(hovered) => {
        setIsHovered(hovered);
      }}
    >
      <Container
        flexGrow={1}
        flexShrink={0}
        alignItems="center"
        justifyContent="flex-start"
        gap={xrStyles.spacingMd}
        paddingY={xrStyles.spacingMd}
        paddingLeft={xrStyles.spacingMd}
        borderLeftRadius={xrStyles.radiusMd}
        backgroundColor={isHovered ? hexColors.accent : hexColors.card}
        onClick={() => {
          setActiveThread(thread.id);
          setMainThread(thread);
        }}
      >
        {(thread.status === "streaming" || thread.status === "waiting") && (
          <Brain
            width={xrStyles.textMd}
            height={xrStyles.textMd}
            color={hexColors.foreground}
          />
        )}
        <Text color={hexColors.foreground}>
          {thread.title === "New Chat" ? "" : thread.title}
        </Text>
      </Container>
      <Container
        backgroundColor={isHovered ? hexColors.accent : hexColors.card}
        paddingY={xrStyles.spacingMd}
        paddingRight={xrStyles.spacingMd}
        borderRightRadius={xrStyles.radiusMd}
        minWidth={xrStyles.textLg}
        alignItems="center"
        onClick={() => {
          setActiveThread(thread.id);
          addXrThread(thread);
        }}
        display={isHovered ? "flex" : "none"}
      >
        <ExternalLink
          width={xrStyles.textLg}
          height={xrStyles.textLg}
          color={hexColors.foreground}
        />
      </Container>
    </Container>
  );
};

export default memo(XRThreadListItem, (prev, next) => {
  return equal(prev.thread, next.thread);
});
