export default function UploadRules() {
  return (
    <>
      <div className="d-flex align-items-start">
        <div>
          <h4>
            <b>Content Restriction Rules:</b>
          </h4>
          <ul>
            <li>
              Only titles that are in the comic styles of Japanese, Korean,
              Chinese, Vietnamese origin are allowed.
            </li>
            <li>
              Exceptions can be made for self-published comics in a similar
              style originally created in other languages if you contact staff
              beforehand.
            </li>
            <li>
              Only scanlations (i.e. comics translated and edited into another
              language) and self-published original comics are allowed to be
              uploaded.
            </li>
            <li>
              Works with no text to translate, like artwork compilations, are
              not allowed.
            </li>
            <li>
              Permission should be granted by the publisher and/or creator.
            </li>
            <li>
              Any scanlated release is allowed to be uploaded regardless of the
              existence of official translations.
            </li>
            <li>
              Permanently withholding some of your scanlations to a series for
              the purpose of attracting users to your site is not allowed.
            </li>
            <li>
              Uploading a chapter created by a tool that automatically edits and
              generates translated pages is not allowed. This includes tools
              that allow for additional manual editing after the automated
              process.
            </li>
            <li>Joke or troll releases are not allowed.</li>
          </ul>
        </div>
        <img
          className="upload-rules-image"
          src="/img/banner/chapterGuideline.png"
          alt="chapterGuideline"
        />
      </div>
      <h4>Manga Creation Guidelines:</h4>
      <ul>
        <li>
          Genres should be added only if the tag is a representation of the
          title as a whole, not just appearing in a single chapter.
        </li>
        <li>Title Creation:</li>
        <ul>
          <li>
            Loan words are to be as they are in their original respective
            language. For example: "異世界ライフ" to "Isekai Life".
          </li>
          <li>
            Only add official titles, official abbreviations, romanizations, or
            full proper translations as titles.
          </li>
          <li>
            Do not add duplicate entries. Search for multiple alternate titles
            to confirm it doesn't exist yet before adding it.
          </li>
          <li>
            The language set for alternative titles should reflect the official
            or officially localised name for that language region
          </li>
        </ul>
        <li>Cover Art format: JPG/JPEG, PNG, or GIF.</li>
      </ul>

      <h4>Chapter Upload Guidelines:</h4>
      <ul>
        <li>
          Do not arbitrarily combine several chapters into a single release.
        </li>
        <li>
          When uploading a chapter, select all the groups that worked on it. If
          one of the groups does not exist on the site yet, create it first.
        </li>
        <li>
          If you want to upload a oneshot chapter, the chapter should be set to
          0 and the category should be “Oneshot”.
        </li>
        <li>
          If you do not yet know who scanlated the chapter, do not upload it.
        </li>
        <li>
          If you are not part of the scanlation group, do not alter the release
          you are uploading by any means.
        </li>
      </ul>
    </>
  );
}
