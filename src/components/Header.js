import React, { useEffect, useState, useRef } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const [showHeader, setShowHeader] = useState(true); // State to toggle header visibility
  const [lastScrollY, setLastScrollY] = useState(0); // To keep track of the last scroll position
  const headerRef = useRef(null); // Ref to track the header DOM element

  // Effect to handle the scroll event and add/remove listeners
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If we are scrolling down, hide the header (slide it up)
      if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        // If we are scrolling up, show the header (slide it down)
        setShowHeader(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      transform={showHeader ? "translateY(0)" : "translateY(-200px)"} // Animate based on scroll
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={4}>
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={social.icon} size="2x" />
                </a>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <a href="/#projects">Projects</a>
              <a href="/#contactme">Contact Me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
