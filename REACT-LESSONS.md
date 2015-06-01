Although react is excellent at detecting changes, the initial render times are
slow and there doesn't appear to be much that done be done about that. I am using
Chrome on a new Macbook Pro and I'm getting 200ms render times for a list of 30 items
with various child-components. On mobile it's a lot slower.
This problem becomes obvious when using react-router, which will destroy and re-render
the page components, so changing history is a slow experience.

