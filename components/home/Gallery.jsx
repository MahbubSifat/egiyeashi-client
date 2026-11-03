import EventImage from "../EventImage";
import SectionHeading from "./SectionHeading";

const galleryItems = [
  { src: "/gallery/gallery-1.jpg", title: "Winter clothes distribution" },
  { src: "/gallery/gallery-2.jpg", title: "Tree plantation" },
  { src: "/gallery/gallery-3.jpg", title: "Neighbourhood clean-up" },
  { src: "/gallery/gallery-4.jpg", title: "Food distribution" },
  { src: "/gallery/gallery-5.jpg", title: "Free health camp" },
  { src: "/gallery/gallery-6.jpg", title: "Blood donation drive" },
];

export default function Gallery() {
  return (
    <section className="bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Service in action"
          title="Moments of community service"
          text="The kinds of events you can organise or join on EgiyeAshi."
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <figure
              key={item.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-box border border-base-300"
            >
              <EventImage
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-4 pt-10 text-sm font-semibold text-white sm:text-base">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}