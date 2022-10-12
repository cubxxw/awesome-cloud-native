const taskLists = require('./core')

const extendsMarkdowCheckbox = ({enabled = true, label = true, labelAfter = false} = {}) => {
    return (app) => {
        console.log('app.dir', app.dir.source())
 
        return {
          name: 'vuepress-plugin-markdown-checkbox',
          extendsMarkdown: (md) => {
            md.use(taskLists, { enabled, label, labelAfter })
          }
          // ...
        }
    }
}

module.exports = extendsMarkdowCheckbox