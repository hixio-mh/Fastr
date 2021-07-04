# Image

The *image* component is based on the standard [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) and [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) elements. A [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) element can be created by passing one or more [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source) elements as children with a prop of `slot="source"`.

Learn more about [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

## Style guidance

Use *image* to break up text-heavy pages, to illustrate products for sale, or to improve storytelling on a page. The use of *image* should always support the page’s story and, when possible, contribute to that story. Size the *image* to complement the rest of the page content. Don't use an image if it reduces the effectiveness of the page.

## Accessibility

An image **must** have an [`alt`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML#Alternative_text) attribute. Not only does it give the image meaning for non-sighted users, but if the image fails to load, the [`alt`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML#Alternative_text) text will be displayed instead. Always use descriptive [`alt`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML#Alternative_text) text that concisely describes what the *image* conveys. Make sure you are communicating what the *image* is telling you visually. If the *image* is purely for visual decoration and does not convey any meaningful information, such as an icon to reinforce adjacent text, then you should set the [`alt`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML#Alternative_text) attribute to an empty string: [`alt=""`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML#Alternative_text). *Images* with complex content (e.g. charts and graphs) may need an additional description for non-sighted users. For example, provide a link to a text description or describe the *image* in detail on the page itself.
