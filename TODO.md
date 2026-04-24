# Fix Errors - TODO

## Errors Found
1. **Build Error**: `App.css` contains invalid CSS (orphaned `@media` blocks, SCSS-style nested selectors) causing production build to fail with `SyntaxError: [lightningcss minify] Unexpected end of input`.
2. **Lint Error**: `App.jsx` line 17 - `setDarkMode` called synchronously inside `useEffect` (cascading renders).
3. **Lint Error**: `Dashboard.jsx` line 9 - `error` is assigned a value but never used.
4. **Lint Error**: `ViewMembers.jsx` line 82 - `setFilteredMembers`/`setCurrentPage` called synchronously inside `useEffect` (cascading renders).
5. **Lint Error**: `validation.js` line 10 - Unnecessary escape characters (`\+`, `\.`, `\.`).
6. **CSS Issue**: `index.css` has duplicated trailing content and a malformed comment `/* filters -->`.

## Steps
- [ ] Fix `client/src/utils/validation.js`
- [ ] Fix `client/src/pages/Dashboard.jsx`
- [ ] Fix `client/src/pages/ViewMembers.jsx`
- [ ] Fix `client/src/App.jsx`
- [ ] Fix `client/src/App.css`
- [ ] Fix `client/src/index.css`
- [ ] Fix `client/index.html`
- [ ] Verify with `npm run lint` and `npm run build`

