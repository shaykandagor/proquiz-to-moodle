const path = require("path");
const fs = require("fs");

// remove <!-- wp:<tag> --> and <!-- /wp:<tag> --> from the content
const removeWPTags = (content) => {
  return content
    .replace(/<!--\s*wp:[^>]+-->/g, "")
    .replace(/<!--\s*\/wp:[^>]+-->/g, "");
};

const removeWordPress = (content) => removeWPTags(content);

const copyFile = (source, target) =>
  fs.copyFile(source, target, (err) => {
    if (err) {
      // console.error("Error copying file:", err);
      return;
    }
  });

const saveMatch = (originFilePath, theme) => (match) => {
  const filename = match.replace("{site_url}/wp-content/uploads/", "");
  const outputPath = filename.split("/").slice(0, -1).join("/");

  const outputBase = "output";
  const outputFolder = `${outputBase}/html/${theme}/${outputPath}`;

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const originalFolderPath = originFilePath.split("/").slice(0, -1).join("/");

  const originalFile = path.join(
    __dirname,
    `../../${originalFolderPath}/media/${filename}`
  );

  const destinationPath = path.join(outputFolder, path.basename(filename));

  copyFile(originalFile, destinationPath);
};

const copyFiles = (content, path, theme) => {
  const regex = /{site_url}\/wp-content\/uploads\/[^"]+/g;
  const matches = content.match(regex);

  if (!matches) {
    return content;
  }

  matches.forEach(saveMatch(path, theme));

  return content.replace(regex, (match) =>
    match.replace("{site_url}/wp-content/uploads/", "")
  );
};

// convert wp:embed to iframe
// <!-- wp:embed {"url":"https://www.youtube.com/watch?v=Y_GJOxtAQ4I","type":"video","providerNameSlug":"youtube","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->
// to
// <iframe width="560" height="315" src="https://www.youtube.com/embed/Y_GJOxtAQ4I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
const convertEmbedToIframe = (content) => {
  const regex =
    /<!-- wp:embed {"url":"([^"]+)","type":"video","providerNameSlug":"youtube","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->/g;
  const html = content.replace(
    regex,
    '<iframe width="560" height="315" src="$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  );

  // youtube watch must be replaced with embed
  return html.replace(/watch\?v=/g, "embed/");
};

// remove \n\n
const removeMultipleNewLines = (content) => content.replace(/\n\n/g, "");

// write warning-log.txt to output folder
const writeWarningLog = (title, content) => {
  const cleanedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const outputFolder = "output/warning-logs";
  const outputFilePath = `${outputFolder}/warning-log-${cleanedTitle}.txt`;

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  fs.writeFileSync(outputFilePath, content);
};

const warnSiteUrl = (content, title) => {
  const regexWholeLine = /{site_url}/g;
  const matchesWholeLine = content.match(regexWholeLine);

  if (!matchesWholeLine) {
    return;
  }

  const warnings = [];

  matchesWholeLine.forEach((match) => {
    console.warn(
      "Found {site_url} which needs to be edited, check warning-logs"
    );
    warnings.push(`Link {site_url}: ${match}`);
  });

  warnings.push(`Title: ${title}`);
  warnings.push(`Content: ${content}`);

  return warnings;
};

const removeWordPressClasses = (content) => {
  return content.replace(/class="wp-[^"]+"/g, "");
};

const findMotiva = (content, title) => {
  const regex = /https:\/\/motiva-verkkokurssit.fi/g;
  const matches = content.match(regex);

  if (!matches) {
    return;
  }

  const warnings = [];

  matches.forEach((match) => {
    console.log(
      "Found link which needs to be edited, check warning-logs:",
      match
    );
    warnings.push(`Motiva link: ${match}`);
  });

  warnings.push(`Title: ${title}`);
  warnings.push(`Content: ${content}`);

  return warnings;
};

const generateWarningLog = (title, content) => {
  const siteUrlWarnings = warnSiteUrl(content, title);
  const motiveWarnings = findMotiva(content);

  if (siteUrlWarnings || motiveWarnings) {
    writeWarningLog(
      title,
      [
        `Warnings for ${title}`,
        ...(siteUrlWarnings || []),
        ...(motiveWarnings || []),
      ].join("\n\n")
    );
  }
};

const generateHtml = ({ title, content }, path, theme) => {
  const contentWithFiles = copyFiles(content, path, theme);
  const contentWithIframe = convertEmbedToIframe(contentWithFiles);
  const contentWithoutWordpress = removeWordPress(contentWithIframe);
  const contentWithoutMultipleNewlines = removeMultipleNewLines(
    contentWithoutWordpress
  );
  const contentWithoutWordpressClasses = removeWordPressClasses(
    contentWithoutMultipleNewlines
  );

  const formattedContent = contentWithoutWordpressClasses;

  generateWarningLog(title, formattedContent);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body>
      <h1>${title}</h1>
      <div>${formattedContent}</div>
    </body>
    </html>
    `;
};

module.exports = {
  generateHtml,
};
