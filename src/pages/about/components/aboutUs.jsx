export default function AboutUs() {
  return (
    <>
      <div className="about-us text-center">
        <div>
          <h1>
            <b>Manga community</b>
          </h1>
          <p>
            3KManga is an online manga platform designed to embrace the global
            manga community. The core philosophy of 3KManga centers around the
            belief that manga should be accessible to all, regardless of
            language or borders. 3KManga was found by 4 members: Huynh Loc, Huy
            Nguyen, Khai Tri and Khoa Le
          </p>
        </div>
        <img
          src="/img/banner/aboutUs1.jpg"
          alt="aboutUs1"
          style={{ width: "50%" }}
        />
      </div>
      <div className="about-us text-center mt-3">
        <div>
          <h1>
            <b>Support scanlation</b>
          </h1>
          <p>
            At 3KManga, we are committed to supporting scanlation groups and
            empowering them to have complete control over their releases. We
            understand that the scanlation community plays a vital role in
            making manga accessible to a global audience, and we work hard to
            establish a platform that supports this collaborative mentality.
          </p>
        </div>
        <img
          src="/img/banner/aboutUs2.jpg"
          alt="aboutUs2"
          style={{
            width: "50%",
            marginRight: "20px",
            borderRadius: "10px",
            order: -1, // This sets the image to appear before the text
          }}
        />
      </div>
      <div className="about-us text-center mt-3">
        <div>
          <h1>
            <b>Diverse manga collection</b>
          </h1>
          <p>
            Our platform features a vast and diverse collection of manga titles,
            all uploaded by our users, scanlation groups, and in some cases,
            even the publishers themselves. We aim to be a hub where manga
            lovers from around the world can come together to explore, enjoy,
            and share their favorite manga series.
          </p>
        </div>
        <img
          src="/img/banner/aboutUs3.png"
          alt="aboutUs3"
          style={{ width: "50%" }}
        />
      </div>
      <div className="text-center mt-3">
        <h1>
          <b>Join Us</b>
        </h1>
        <span>
          Join us in our mission to make manga a universally cherished and
          accessible art form, and become a part of the 3KManga community today.
        </span>
        <p>
          <a href="https://discord.gg/riel_link" style={{ color: "black" }}>
            The quickest method to reach out to us is through our Discord
            server.
          </a>
        </p>
        <img
          src="/img/banner/aboutUs4.jpg"
          alt="aboutUs4"
          style={{ maxWidth: "100%" }}
        />
      </div>
    </>
  );
}
