import { useState } from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";

const items = [
  {
    src: `https://picsum.photos/1200/800?random=1`,
    caption: "Slide 1",
    altText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur facere earum neque, temporibus nostrum quam dolor perspiciatis inventore nesciunt laboriosam aliquam tenetur molestiae minus reiciendis vero aliquid? Nulla, culpa incidunt.",
    key: 1,
  },
  {
    src: `https://picsum.photos/1200/800?random=2`,
    caption: "Slide 2",
    altText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur facere earum neque, temporibus nostrum quam dolor perspiciatis inventore nesciunt laboriosam aliquam tenetur molestiae minus reiciendis vero aliquid? Nulla, culpa incidunt.",
    key: 2,
  },
  {
    src: `https://picsum.photos/1200/800?random=3`,
    caption: "Slide 3",
    altText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur facere earum neque, temporibus nostrum quam dolor perspiciatis inventore nesciunt laboriosam aliquam tenetur molestiae minus reiciendis vero aliquid? Nulla, culpa incidunt.",
    key: 3,
  },
];

function Header(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="position-relative h-100"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(0)}
        key={item.src}
      >
        {/* <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        /> */}
        <img src={item.src} alt={item.altText} className="object-fit-cover" />
        <div className="text-cap position-absolute w-75 h-75 translate-middle bg-white top-50 start-50 d-flex opacity-75 p-3 flex-column">
          <h3 className="h2 text-truncate">{item.caption}</h3>
          <p className="mt-3 ms-3 fs-4">{item.altText}</p>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      className="w-100 vh-100"
      {...args}
    >
      {/* <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      /> */}
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Header;
