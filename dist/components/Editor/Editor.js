// import {
//     useState, useEffect, useContext, useCallback,
//    } from 'react';
//    import localforage from 'localforage';
//    import { isElectron } from '@/core/handleElectron';
//    import { readRefMeta } from '@/core/reference/readRefMeta';
//    import { readRefBurrito } from '@/core/reference/readRefBurrito';
//    import { readFile } from '@/core/editor/readFile';
//    import Editor from '@/modules/editor/Editor';
//    import { ReferenceContext } from '@/components/context/ReferenceContext';
//    import writeToFile from '@/core/editor/writeToFile';
//    import { saveReferenceResource } from '@/core/projects/updateAgSettings';
//    import moment from 'moment';
//    import { splitStringByLastOccurance } from '@/util/splitStringByLastMarker';
//    import EditorPanel from './EditorPanel';
//    import * as logger from '../../../logger';
//    import packageInfo from '../../../../../package.json';

//    export const getDetails = () => new Promise((resolve) => {
//      logger.debug('ObsEditor.js', 'In getDetails() for fetching the burrito file of current project');
//      localforage.getItem('userProfile').then((value) => {
//        const username = value?.username;
//        localforage.getItem('currentProject').then((projectName) => {
//          const path = require('path');
//          const newpath = localStorage.getItem('userPath');
//          const projectsDir = path.join(newpath, packageInfo.name, 'users', username, 'projects', projectName);
//          const metaPath = path.join(newpath, packageInfo.name, 'users', username, 'projects', projectName, 'metadata.json');
//          resolve({
//            projectName, username, projectsDir, metaPath, path,
//          });
//        });
//      });
//    });
//    const ObsEditor = () => {
//      const [mdData, setMdData] = useState();
//      const [directoryName, setDirectoryName] = useState();
//      const { state: { obsNavigation, loadData }, actions: { setLoadData } } = useContext(ReferenceContext);
//      const updateStory = (story) => {
//        logger.debug('ObsEditor.js', 'In updateStory for upadting the story to the backend md file');
//        setMdData(story);
//        let title; let body = ''; let end;
//        story.forEach((s) => {
//          if (Object.prototype.hasOwnProperty.call(s, 'title')) {
//            title = `# ${s.title}\n\n`;
//          }
//          if (Object.prototype.hasOwnProperty.call(s, 'end')) {
//            const foot = ((s.end).trim());
//            end = `_${foot}_`;
//          }
//          if (Object.prototype.hasOwnProperty.call(s, 'text')) {
//            body += `![OBS Image](${s.img})\n\n${s.text}\n\n`;
//          }
//        });
//        const storyStr = title + body + end;
//        getDetails().then((value) => {
//          const bookID = obsNavigation.toString().padStart(2, 0);
//          writeToFile({
//            username: value.username,
//            projectname: value.projectName,
//            filename: (value.path).join(directoryName, `${bookID}.md`),
//            data: storyStr,
//          });
//        });
//      };
//      // this function is used to fetch the content from the given story number
//      const readContent = useCallback(() => {
//        setLoadData(false);
//        getDetails()
//        .then(({
//          projectName, username, projectsDir, metaPath, path,
//          }) => {
//          readRefMeta({
//            projectsDir,
//          }).then((refs) => {
//            // setIsLoading(true);
//            refs.forEach(() => {
//              readRefBurrito({
//                metaPath,
//              }).then(async (data) => {
//                if (data) {
//                  const _data = JSON.parse(data);
//                  Object.entries(_data.ingredients).forEach(
//                    ([key]) => {
//                      const folderName = key.split(/[(\\)?(/)?]/gm).slice(0);
//                      const dirName = folderName[0];
//                      setDirectoryName(dirName);
//                      // Fetching data from projectmeta and updating the navigation and lastSeen back
//                      localforage.getItem('currentProject').then(async (projectName) => {
//                        const _projectname = await splitStringByLastOccurance(projectName, '_');
//                        // const _projectname = projectName?.split('_');
//                        localforage.getItem('projectmeta').then((value) => {
//                          Object.entries(value).forEach(
//                            ([, _value]) => {
//                              Object.entries(_value).forEach(
//                                ([, resources]) => {
//                                  if (resources.identification.name.en === _projectname[0]) {
//                                    resources.project[resources.type.flavorType.flavor.name].navigation = obsNavigation;
//                                    resources.project[resources.type.flavorType.flavor.name].lastSeen = moment().format();
//                                  }
//                                },
//                              );
//                            },
//                          );
//                          localforage.setItem('projectmeta', value);
//                          // This func will update the scribe-setting.json file
//                          saveReferenceResource();
//                        });
//                      });
//                      logger.debug('ObsEditor.js', 'Reading the md file for selected OBS story');
//                      const bookID = obsNavigation?.toString().padStart(2, 0);
//                      if (key === path.join(dirName, `${bookID}.md`)) {
//                        readFile({
//                          projectname: projectName,
//                          filename: key,
//                          username,
//                        }).then((data) => {
//                          if (data) {
//                            const stories = [];
//                            // eslint-disable-next-line prefer-const
//                            let id = 1; let footer = false;
//                            // eslint-disable-next-line react/prop-types
//                            const allLines = data.split(/\r\n|\n/);
//                            logger.debug('ObsEditor.js', 'Spliting the stories line by line and storing into an array.');
//                            // Reading line by line
//                            allLines.forEach((line) => {
//                              // To avoid the values after footer, we have added id=0
//                              if (line && id !== 0) {
//                                if (line.match(/^(\s)*#/gm)) {
//                                  // Fetching the header content
//                                  const hash = line.match(/# (.*)/);
//                                  stories.push({
//                                    id, title: hash[1],
//                                  });
//                                  id += 1;
//                                } else if (line.match(/^(\s)*_/gm) || footer === true) {
//                                  // Fetching the footer
//                                  const objIndex = stories.findIndex(((obj) => obj.id === id));
//                                  if (objIndex !== -1 && Object.prototype.hasOwnProperty.call(stories[objIndex], 'img')) {
//                                    stories[objIndex].text = '';
//                                    id += 1;
//                                  }
//                                  if (line.match(/_(.*)_/g) && footer === false) {
//                                    // single line footer
//                                    const underscore = line.match(/_(.*)_/);
//                                    stories.push({
//                                      id, end: underscore[1],
//                                    });
//                                    // Logically footer is the last line of the story
//                                    id = 0;
//                                  } else {
//                                    // To get multi-line footer (footer=true)
//                                    footer = true;
//                                    if (line.match(/^(\s)*_/gm)) {
//                                      // starting of footer
//                                      const underscore = line.match(/^(\s)*_(.*)/);
//                                      stories.push({
//                                        id, end: underscore[2],
//                                      });
//                                    } else if (line.match(/_$/gm)) {
//                                      // end of footer
//                                      const underscore = line.match(/(.*)_$/);
//                                      stories[id - 1].end = `${stories[id - 1].end}\n${underscore[1]}`;
//                                      // Logically footer is the last line of the story
//                                      id = 0;
//                                    } else {
//                                      // middle lines of footer if available
//                                      stories[id - 1].end = `${stories[id - 1].end}\n${line}`;
//                                    }
//                                  }
//                                } else if (line.match(/^(\s)*!/gm)) {
//                                  // Fetching the IMG url
//                                  const objIndex = stories.findIndex(((obj) => obj.id === id));
//                                  if (objIndex !== -1 && Object.prototype.hasOwnProperty.call(stories[objIndex], 'img')) {
//                                    stories[objIndex].text = '';
//                                    id += 1;
//                                  }
//                                  const imgUrl = line.match(/\((.*)\)/);
//                                  stories.push({
//                                    id, img: imgUrl[1],
//                                  });
//                                } else {
//                                  // Reading the content line by line
//                                  const objIndex = stories.findIndex(((obj) => obj.id === id));
//                                  if (objIndex !== -1) {
//                                    // Reading first line after img
//                                    stories[objIndex].text = line;
//                                    id += 1;
//                                  } else {
//                                    // Reading other lines and appending with previous line data
//                                    stories[id - 2].text = `${stories[id - 2].text}\n${line}`;
//                                  }
//                                }
//                              }
//                            });
//                            logger.debug('ObsEditor.js', 'Story for selected navigation is been set to the array for Editor');
//                            setMdData(stories);
//                          }
//                        });
//                      }
//                    },
//                  );
//                }
//              });
//            });
//          });
//        });
//      // eslint-disable-next-line react-hooks/exhaustive-deps
//      }, [obsNavigation]);

//      useEffect(() => {
//        if (isElectron()) {
//          readContent();
//        }
//      }, [readContent]);
//      useEffect(() => {
//        if (loadData === true) {
//          readContent();
//        }
//      // eslint-disable-next-line react-hooks/exhaustive-deps
//      }, [loadData]);
//      return (
//        <Editor callFrom="obs">
//          {mdData
//          && <EditorPanel obsStory={mdData} storyUpdate={updateStory} />}
//        </Editor>
//      );
//    };
//    export default ObsEditor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRWRpdG9yL0VkaXRvci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHtcbi8vICAgICB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDb250ZXh0LCB1c2VDYWxsYmFjayxcbi8vICAgIH0gZnJvbSAncmVhY3QnO1xuLy8gICAgaW1wb3J0IGxvY2FsZm9yYWdlIGZyb20gJ2xvY2FsZm9yYWdlJztcbi8vICAgIGltcG9ydCB7IGlzRWxlY3Ryb24gfSBmcm9tICdAL2NvcmUvaGFuZGxlRWxlY3Ryb24nO1xuLy8gICAgaW1wb3J0IHsgcmVhZFJlZk1ldGEgfSBmcm9tICdAL2NvcmUvcmVmZXJlbmNlL3JlYWRSZWZNZXRhJztcbi8vICAgIGltcG9ydCB7IHJlYWRSZWZCdXJyaXRvIH0gZnJvbSAnQC9jb3JlL3JlZmVyZW5jZS9yZWFkUmVmQnVycml0byc7XG4vLyAgICBpbXBvcnQgeyByZWFkRmlsZSB9IGZyb20gJ0AvY29yZS9lZGl0b3IvcmVhZEZpbGUnO1xuLy8gICAgaW1wb3J0IEVkaXRvciBmcm9tICdAL21vZHVsZXMvZWRpdG9yL0VkaXRvcic7XG4vLyAgICBpbXBvcnQgeyBSZWZlcmVuY2VDb250ZXh0IH0gZnJvbSAnQC9jb21wb25lbnRzL2NvbnRleHQvUmVmZXJlbmNlQ29udGV4dCc7XG4vLyAgICBpbXBvcnQgd3JpdGVUb0ZpbGUgZnJvbSAnQC9jb3JlL2VkaXRvci93cml0ZVRvRmlsZSc7XG4vLyAgICBpbXBvcnQgeyBzYXZlUmVmZXJlbmNlUmVzb3VyY2UgfSBmcm9tICdAL2NvcmUvcHJvamVjdHMvdXBkYXRlQWdTZXR0aW5ncyc7XG4vLyAgICBpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG4vLyAgICBpbXBvcnQgeyBzcGxpdFN0cmluZ0J5TGFzdE9jY3VyYW5jZSB9IGZyb20gJ0AvdXRpbC9zcGxpdFN0cmluZ0J5TGFzdE1hcmtlcic7XG4vLyAgICBpbXBvcnQgRWRpdG9yUGFuZWwgZnJvbSAnLi9FZGl0b3JQYW5lbCc7XG4vLyAgICBpbXBvcnQgKiBhcyBsb2dnZXIgZnJvbSAnLi4vLi4vLi4vbG9nZ2VyJztcbi8vICAgIGltcG9ydCBwYWNrYWdlSW5mbyBmcm9tICcuLi8uLi8uLi8uLi8uLi9wYWNrYWdlLmpzb24nO1xuICAgXG4vLyAgICBleHBvcnQgY29uc3QgZ2V0RGV0YWlscyA9ICgpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4vLyAgICAgIGxvZ2dlci5kZWJ1ZygnT2JzRWRpdG9yLmpzJywgJ0luIGdldERldGFpbHMoKSBmb3IgZmV0Y2hpbmcgdGhlIGJ1cnJpdG8gZmlsZSBvZiBjdXJyZW50IHByb2plY3QnKTtcbi8vICAgICAgbG9jYWxmb3JhZ2UuZ2V0SXRlbSgndXNlclByb2ZpbGUnKS50aGVuKCh2YWx1ZSkgPT4ge1xuLy8gICAgICAgIGNvbnN0IHVzZXJuYW1lID0gdmFsdWU/LnVzZXJuYW1lO1xuLy8gICAgICAgIGxvY2FsZm9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRQcm9qZWN0JykudGhlbigocHJvamVjdE5hbWUpID0+IHtcbi8vICAgICAgICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4vLyAgICAgICAgICBjb25zdCBuZXdwYXRoID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJQYXRoJyk7XG4vLyAgICAgICAgICBjb25zdCBwcm9qZWN0c0RpciA9IHBhdGguam9pbihuZXdwYXRoLCBwYWNrYWdlSW5mby5uYW1lLCAndXNlcnMnLCB1c2VybmFtZSwgJ3Byb2plY3RzJywgcHJvamVjdE5hbWUpO1xuLy8gICAgICAgICAgY29uc3QgbWV0YVBhdGggPSBwYXRoLmpvaW4obmV3cGF0aCwgcGFja2FnZUluZm8ubmFtZSwgJ3VzZXJzJywgdXNlcm5hbWUsICdwcm9qZWN0cycsIHByb2plY3ROYW1lLCAnbWV0YWRhdGEuanNvbicpO1xuLy8gICAgICAgICAgcmVzb2x2ZSh7XG4vLyAgICAgICAgICAgIHByb2plY3ROYW1lLCB1c2VybmFtZSwgcHJvamVjdHNEaXIsIG1ldGFQYXRoLCBwYXRoLFxuLy8gICAgICAgICAgfSk7XG4vLyAgICAgICAgfSk7XG4vLyAgICAgIH0pO1xuLy8gICAgfSk7XG4vLyAgICBjb25zdCBPYnNFZGl0b3IgPSAoKSA9PiB7XG4vLyAgICAgIGNvbnN0IFttZERhdGEsIHNldE1kRGF0YV0gPSB1c2VTdGF0ZSgpO1xuLy8gICAgICBjb25zdCBbZGlyZWN0b3J5TmFtZSwgc2V0RGlyZWN0b3J5TmFtZV0gPSB1c2VTdGF0ZSgpO1xuLy8gICAgICBjb25zdCB7IHN0YXRlOiB7IG9ic05hdmlnYXRpb24sIGxvYWREYXRhIH0sIGFjdGlvbnM6IHsgc2V0TG9hZERhdGEgfSB9ID0gdXNlQ29udGV4dChSZWZlcmVuY2VDb250ZXh0KTtcbi8vICAgICAgY29uc3QgdXBkYXRlU3RvcnkgPSAoc3RvcnkpID0+IHtcbi8vICAgICAgICBsb2dnZXIuZGVidWcoJ09ic0VkaXRvci5qcycsICdJbiB1cGRhdGVTdG9yeSBmb3IgdXBhZHRpbmcgdGhlIHN0b3J5IHRvIHRoZSBiYWNrZW5kIG1kIGZpbGUnKTtcbi8vICAgICAgICBzZXRNZERhdGEoc3RvcnkpO1xuLy8gICAgICAgIGxldCB0aXRsZTsgbGV0IGJvZHkgPSAnJzsgbGV0IGVuZDtcbi8vICAgICAgICBzdG9yeS5mb3JFYWNoKChzKSA9PiB7XG4vLyAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsICd0aXRsZScpKSB7XG4vLyAgICAgICAgICAgIHRpdGxlID0gYCMgJHtzLnRpdGxlfVxcblxcbmA7XG4vLyAgICAgICAgICB9XG4vLyAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsICdlbmQnKSkge1xuLy8gICAgICAgICAgICBjb25zdCBmb290ID0gKChzLmVuZCkudHJpbSgpKTtcbi8vICAgICAgICAgICAgZW5kID0gYF8ke2Zvb3R9X2A7XG4vLyAgICAgICAgICB9XG4vLyAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsICd0ZXh0JykpIHtcbi8vICAgICAgICAgICAgYm9keSArPSBgIVtPQlMgSW1hZ2VdKCR7cy5pbWd9KVxcblxcbiR7cy50ZXh0fVxcblxcbmA7XG4vLyAgICAgICAgICB9XG4vLyAgICAgICAgfSk7XG4vLyAgICAgICAgY29uc3Qgc3RvcnlTdHIgPSB0aXRsZSArIGJvZHkgKyBlbmQ7XG4vLyAgICAgICAgZ2V0RGV0YWlscygpLnRoZW4oKHZhbHVlKSA9PiB7XG4vLyAgICAgICAgICBjb25zdCBib29rSUQgPSBvYnNOYXZpZ2F0aW9uLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgMCk7XG4vLyAgICAgICAgICB3cml0ZVRvRmlsZSh7XG4vLyAgICAgICAgICAgIHVzZXJuYW1lOiB2YWx1ZS51c2VybmFtZSxcbi8vICAgICAgICAgICAgcHJvamVjdG5hbWU6IHZhbHVlLnByb2plY3ROYW1lLFxuLy8gICAgICAgICAgICBmaWxlbmFtZTogKHZhbHVlLnBhdGgpLmpvaW4oZGlyZWN0b3J5TmFtZSwgYCR7Ym9va0lEfS5tZGApLFxuLy8gICAgICAgICAgICBkYXRhOiBzdG9yeVN0cixcbi8vICAgICAgICAgIH0pO1xuLy8gICAgICAgIH0pO1xuLy8gICAgICB9O1xuLy8gICAgICAvLyB0aGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZmV0Y2ggdGhlIGNvbnRlbnQgZnJvbSB0aGUgZ2l2ZW4gc3RvcnkgbnVtYmVyXG4vLyAgICAgIGNvbnN0IHJlYWRDb250ZW50ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuLy8gICAgICAgIHNldExvYWREYXRhKGZhbHNlKTtcbi8vICAgICAgICBnZXREZXRhaWxzKClcbi8vICAgICAgICAudGhlbigoe1xuLy8gICAgICAgICAgcHJvamVjdE5hbWUsIHVzZXJuYW1lLCBwcm9qZWN0c0RpciwgbWV0YVBhdGgsIHBhdGgsXG4vLyAgICAgICAgICB9KSA9PiB7XG4vLyAgICAgICAgICByZWFkUmVmTWV0YSh7XG4vLyAgICAgICAgICAgIHByb2plY3RzRGlyLFxuLy8gICAgICAgICAgfSkudGhlbigocmVmcykgPT4ge1xuLy8gICAgICAgICAgICAvLyBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4vLyAgICAgICAgICAgIHJlZnMuZm9yRWFjaCgoKSA9PiB7XG4vLyAgICAgICAgICAgICAgcmVhZFJlZkJ1cnJpdG8oe1xuLy8gICAgICAgICAgICAgICAgbWV0YVBhdGgsXG4vLyAgICAgICAgICAgICAgfSkudGhlbihhc3luYyAoZGF0YSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbi8vICAgICAgICAgICAgICAgICAgY29uc3QgX2RhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuLy8gICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhfZGF0YS5pbmdyZWRpZW50cykuZm9yRWFjaChcbi8vICAgICAgICAgICAgICAgICAgICAoW2tleV0pID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvbGRlck5hbWUgPSBrZXkuc3BsaXQoL1soXFxcXCk/KC8pP10vZ20pLnNsaWNlKDApO1xuLy8gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlyTmFtZSA9IGZvbGRlck5hbWVbMF07XG4vLyAgICAgICAgICAgICAgICAgICAgICBzZXREaXJlY3RvcnlOYW1lKGRpck5hbWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgLy8gRmV0Y2hpbmcgZGF0YSBmcm9tIHByb2plY3RtZXRhIGFuZCB1cGRhdGluZyB0aGUgbmF2aWdhdGlvbiBhbmQgbGFzdFNlZW4gYmFja1xuLy8gICAgICAgICAgICAgICAgICAgICAgbG9jYWxmb3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKS50aGVuKGFzeW5jIChwcm9qZWN0TmFtZSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfcHJvamVjdG5hbWUgPSBhd2FpdCBzcGxpdFN0cmluZ0J5TGFzdE9jY3VyYW5jZShwcm9qZWN0TmFtZSwgJ18nKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgX3Byb2plY3RuYW1lID0gcHJvamVjdE5hbWU/LnNwbGl0KCdfJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsZm9yYWdlLmdldEl0ZW0oJ3Byb2plY3RtZXRhJykudGhlbigodmFsdWUpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyh2YWx1ZSkuZm9yRWFjaChcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIChbLCBfdmFsdWVdKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKF92YWx1ZSkuZm9yRWFjaChcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoWywgcmVzb3VyY2VzXSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc291cmNlcy5pZGVudGlmaWNhdGlvbi5uYW1lLmVuID09PSBfcHJvamVjdG5hbWVbMF0pIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzLnByb2plY3RbcmVzb3VyY2VzLnR5cGUuZmxhdm9yVHlwZS5mbGF2b3IubmFtZV0ubmF2aWdhdGlvbiA9IG9ic05hdmlnYXRpb247XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlcy5wcm9qZWN0W3Jlc291cmNlcy50eXBlLmZsYXZvclR5cGUuZmxhdm9yLm5hbWVdLmxhc3RTZWVuID0gbW9tZW50KCkuZm9ybWF0KCk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbGZvcmFnZS5zZXRJdGVtKCdwcm9qZWN0bWV0YScsIHZhbHVlKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGZ1bmMgd2lsbCB1cGRhdGUgdGhlIHNjcmliZS1zZXR0aW5nLmpzb24gZmlsZVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVSZWZlcmVuY2VSZXNvdXJjZSgpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdPYnNFZGl0b3IuanMnLCAnUmVhZGluZyB0aGUgbWQgZmlsZSBmb3Igc2VsZWN0ZWQgT0JTIHN0b3J5Jyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib29rSUQgPSBvYnNOYXZpZ2F0aW9uPy50b1N0cmluZygpLnBhZFN0YXJ0KDIsIDApO1xuLy8gICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gcGF0aC5qb2luKGRpck5hbWUsIGAke2Jvb2tJRH0ubWRgKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICByZWFkRmlsZSh7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdG5hbWU6IHByb2plY3ROYW1lLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBrZXksXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RvcmllcyA9IFtdO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gMTsgbGV0IGZvb3RlciA9IGZhbHNlO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L3Byb3AtdHlwZXNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbExpbmVzID0gZGF0YS5zcGxpdCgvXFxyXFxufFxcbi8pO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdPYnNFZGl0b3IuanMnLCAnU3BsaXRpbmcgdGhlIHN0b3JpZXMgbGluZSBieSBsaW5lIGFuZCBzdG9yaW5nIGludG8gYW4gYXJyYXkuJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWFkaW5nIGxpbmUgYnkgbGluZVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsTGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUbyBhdm9pZCB0aGUgdmFsdWVzIGFmdGVyIGZvb3Rlciwgd2UgaGF2ZSBhZGRlZCBpZD0wXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lICYmIGlkICE9PSAwKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUubWF0Y2goL14oXFxzKSojL2dtKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmV0Y2hpbmcgdGhlIGhlYWRlciBjb250ZW50XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoID0gbGluZS5tYXRjaCgvIyAoLiopLyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yaWVzLnB1c2goe1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCwgdGl0bGU6IGhhc2hbMV0sXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkICs9IDE7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5lLm1hdGNoKC9eKFxccykqXy9nbSkgfHwgZm9vdGVyID09PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGZXRjaGluZyB0aGUgZm9vdGVyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmpJbmRleCA9IHN0b3JpZXMuZmluZEluZGV4KCgob2JqKSA9PiBvYmouaWQgPT09IGlkKSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqSW5kZXggIT09IC0xICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdG9yaWVzW29iakluZGV4XSwgJ2ltZycpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JpZXNbb2JqSW5kZXhdLnRleHQgPSAnJztcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgKz0gMTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLm1hdGNoKC9fKC4qKV8vZykgJiYgZm9vdGVyID09PSBmYWxzZSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgbGluZSBmb290ZXJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5kZXJzY29yZSA9IGxpbmUubWF0Y2goL18oLiopXy8pO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yaWVzLnB1c2goe1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkLCBlbmQ6IHVuZGVyc2NvcmVbMV0sXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMb2dpY2FsbHkgZm9vdGVyIGlzIHRoZSBsYXN0IGxpbmUgb2YgdGhlIHN0b3J5XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gMDtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvIGdldCBtdWx0aS1saW5lIGZvb3RlciAoZm9vdGVyPXRydWUpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb3RlciA9IHRydWU7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLm1hdGNoKC9eKFxccykqXy9nbSkpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydGluZyBvZiBmb290ZXJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1bmRlcnNjb3JlID0gbGluZS5tYXRjaCgvXihcXHMpKl8oLiopLyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllcy5wdXNoKHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkLCBlbmQ6IHVuZGVyc2NvcmVbMl0sXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZS5tYXRjaCgvXyQvZ20pKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIG9mIGZvb3RlclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVuZGVyc2NvcmUgPSBsaW5lLm1hdGNoKC8oLiopXyQvKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yaWVzW2lkIC0gMV0uZW5kID0gYCR7c3Rvcmllc1tpZCAtIDFdLmVuZH1cXG4ke3VuZGVyc2NvcmVbMV19YDtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMb2dpY2FsbHkgZm9vdGVyIGlzIHRoZSBsYXN0IGxpbmUgb2YgdGhlIHN0b3J5XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSAwO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1pZGRsZSBsaW5lcyBvZiBmb290ZXIgaWYgYXZhaWxhYmxlXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllc1tpZCAtIDFdLmVuZCA9IGAke3N0b3JpZXNbaWQgLSAxXS5lbmR9XFxuJHtsaW5lfWA7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmUubWF0Y2goL14oXFxzKSohL2dtKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmV0Y2hpbmcgdGhlIElNRyB1cmxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iakluZGV4ID0gc3Rvcmllcy5maW5kSW5kZXgoKChvYmopID0+IG9iai5pZCA9PT0gaWQpKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpJbmRleCAhPT0gLTEgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0b3JpZXNbb2JqSW5kZXhdLCAnaW1nJykpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllc1tvYmpJbmRleF0udGV4dCA9ICcnO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCArPSAxO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nVXJsID0gbGluZS5tYXRjaCgvXFwoKC4qKVxcKS8pO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllcy5wdXNoKHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQsIGltZzogaW1nVXJsWzFdLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlYWRpbmcgdGhlIGNvbnRlbnQgbGluZSBieSBsaW5lXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmpJbmRleCA9IHN0b3JpZXMuZmluZEluZGV4KCgob2JqKSA9PiBvYmouaWQgPT09IGlkKSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqSW5kZXggIT09IC0xKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlYWRpbmcgZmlyc3QgbGluZSBhZnRlciBpbWdcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllc1tvYmpJbmRleF0udGV4dCA9IGxpbmU7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkICs9IDE7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWFkaW5nIG90aGVyIGxpbmVzIGFuZCBhcHBlbmRpbmcgd2l0aCBwcmV2aW91cyBsaW5lIGRhdGFcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcmllc1tpZCAtIDJdLnRleHQgPSBgJHtzdG9yaWVzW2lkIC0gMl0udGV4dH1cXG4ke2xpbmV9YDtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdPYnNFZGl0b3IuanMnLCAnU3RvcnkgZm9yIHNlbGVjdGVkIG5hdmlnYXRpb24gaXMgYmVlbiBzZXQgdG8gdGhlIGFycmF5IGZvciBFZGl0b3InKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1kRGF0YShzdG9yaWVzKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICk7XG4vLyAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgfSk7XG4vLyAgICAgICAgfSk7XG4vLyAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbi8vICAgICAgfSwgW29ic05hdmlnYXRpb25dKTtcbiAgIFxuLy8gICAgICB1c2VFZmZlY3QoKCkgPT4ge1xuLy8gICAgICAgIGlmIChpc0VsZWN0cm9uKCkpIHtcbi8vICAgICAgICAgIHJlYWRDb250ZW50KCk7XG4vLyAgICAgICAgfVxuLy8gICAgICB9LCBbcmVhZENvbnRlbnRdKTtcbi8vICAgICAgdXNlRWZmZWN0KCgpID0+IHtcbi8vICAgICAgICBpZiAobG9hZERhdGEgPT09IHRydWUpIHtcbi8vICAgICAgICAgIHJlYWRDb250ZW50KCk7XG4vLyAgICAgICAgfVxuLy8gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4vLyAgICAgIH0sIFtsb2FkRGF0YV0pO1xuLy8gICAgICByZXR1cm4gKFxuLy8gICAgICAgIDxFZGl0b3IgY2FsbEZyb209XCJvYnNcIj5cbi8vICAgICAgICAgIHttZERhdGFcbi8vICAgICAgICAgICYmIDxFZGl0b3JQYW5lbCBvYnNTdG9yeT17bWREYXRhfSBzdG9yeVVwZGF0ZT17dXBkYXRlU3Rvcnl9IC8+fVxuLy8gICAgICAgIDwvRWRpdG9yPlxuLy8gICAgICApO1xuLy8gICAgfTtcbi8vICAgIGV4cG9ydCBkZWZhdWx0IE9ic0VkaXRvcjtcbiAgICJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSJ9