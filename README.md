# Employee Directory

A modern, responsive Employee Directory web app built with Freemarker templates, JSON data, and static HTML/CSS/JS. Features include search, sort, pagination, and a modal-based add/edit employee form—all in the browser.

## Features
- Responsive, card-based employee directory
- Search, sort, and pagination
- Add, edit, and delete employees (client-side)
- Modern modal form UI
- Data loaded at build time from JSON

## Project Structure
```
validated-employee-directory/
├── app.js                # Main JavaScript for UI logic
├── styles.css            # Main CSS for layout and modal
├── data/
│   └── data-wrapper.json # Employee data (edit this to update employees)
├── templates/
│   └── index.html.ftl    # Freemarker template
├── output/
│   └── index.html        # Generated static HTML (deploy this)
├── lib/
│   ├── freemarker-2.x.x.jar
│   ├── jackson-core-2.x.x.jar
│   ├── jackson-databind-2.x.x.jar
│   └── jackson-annotations-2.x.x.jar
├── fmpp.cfg              # FMPP config (optional, for FMPP users)
```

## How to Build

### 1. (Recommended) Using Java Freemarker Runner
1. Ensure you have Java 8+ installed.
2. Place the following JARs in a `lib/` directory:
   - `freemarker-2.x.x.jar`
   - `jackson-core-2.x.x.jar`
   - `jackson-databind-2.x.x.jar`
   - `jackson-annotations-2.x.x.jar`
3. Compile the runner (if needed):
   ```sh
   javac -cp "lib/*" FreemarkerRunner.java
   ```
4. Generate the HTML:
   ```sh
   java -cp "lib/*;." FreemarkerRunner templates/index.html.ftl data/data-wrapper.json output/index.html
   ```

### 2. (Alternative) Using FMPP (if installed)
1. Edit `fmpp.cfg` as needed.
2. Run:
   ```sh
   fmpp -C fmpp.cfg
   ```

## How to Deploy
- Deploy the contents of the `output/` directory (especially `index.html`) to any static web host:
  - GitHub Pages
  - Netlify
  - Vercel
  - AWS S3, Azure Blob, etc.
- Make sure `styles.css` and `app.js` are accessible (copy them if needed).

## Updating Employee Data
- Edit `data/data-wrapper.json` and re-run the build step to update the directory.

## License
MIT