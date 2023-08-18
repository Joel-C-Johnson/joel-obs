const mdToJson = (mdString) => {
  const stories = [];
  // eslint-disable-next-line prefer-const
  let id = 1; let footer = false;
  // eslint-disable-next-line react/prop-types
  const allLines = mdString.split(/\r\n|\n/);
  // Reading line by line
  allLines.forEach((line) => {
    // To avoid the values after footer, we have added id=0
    if (line && id !== 0) {
      if (line.match(/^(\s)*#/gm)) {
        // Fetching the header content
        const hash = line.match(/# (.*)/);
        stories.push({
          id, title: hash[1],
        });
        id += 1;
      } else if (line.match(/^(\s)*_/gm) || footer === true) {
        // Fetching the footer
        const objIndex = stories.findIndex(((obj) => obj.id === id));
        if (objIndex !== -1 && Object.prototype.hasOwnProperty.call(stories[objIndex], 'img')) {
          stories[objIndex].text = '';
          id += 1;
        }
        if (line.match(/_(.*)_/g) && footer === false) {
          // single line footer
          const underscore = line.match(/_(.*)_/);
          stories.push({
            id, end: underscore[1],
          });
          // Logically footer is the last line of the story
          id = 0;
        } else {
          // To get multi-line footer (footer=true)
          footer = true;
          if (line.match(/^(\s)*_/gm)) {
            // starting of footer
            const underscore = line.match(/^(\s)*_(.*)/);
            stories.push({
              id, end: underscore[2],
            });
          } else if (line.match(/_$/gm)) {
            // end of footer
            const underscore = line.match(/(.*)_$/);
            stories[id - 1].end = `${stories[id - 1].end}\n${underscore[1]}`;
            // Logically footer is the last line of the story
            id = 0;
          } else {
            // middle lines of footer if available
            stories[id - 1].end = `${stories[id - 1].end}\n${line}`;
          }
        }
      } else if (line.match(/^(\s)*!/gm)) {
        // Fetching the IMG url
        const objIndex = stories.findIndex(((obj) => obj.id === id));
        if (objIndex !== -1 && Object.prototype.hasOwnProperty.call(stories[objIndex], 'img')) {
          stories[objIndex].text = '';
          id += 1;
        }
        const imgUrl = line.match(/\((.*)\)/);
        stories.push({
          id, img: imgUrl[1],
        });
      } else {
        // Reading the content line by line
        const objIndex = stories.findIndex(((obj) => obj.id === id));
        if (objIndex !== -1) {
          // Reading first line after img
          stories[objIndex].text = line;
          id += 1;
        } else {
          // Reading other lines and appending with previous line data
          stories[id - 2].text = `${stories[id - 2].text}\n${line}`;
        }
      }
    }
  });
  return stories;
}
export default mdToJson;
