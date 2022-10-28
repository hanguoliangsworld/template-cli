#!/usr/bin/env node
//第一行其中#!/usr/bin/env node表示用node解析器执行本文件。
const program = require('commander')
const inquirer = require('inquirer')
const ora = require('ora')
const download = require('download-git-repo')

program
.command('create <projectName>')
.description('create a new project')
.alias('c')
.action((projectName, options) => {
  console.log(projectName, options)
  inquirer
   .prompt([
     {
       type: 'list',
       name: 'frameTemplate',
       message: '请选择框架类型',
       choices: ['Vue3',  'React']
     }
   ])
   .then((answer) => {
      let downloadUrl = ''
      switch (answer.frameTemplate) {
        case 'Vue3':
          downloadUrl='direct:https://github.com/hanguoliangsworld/vue3-ts.git'
          break;
        case 'React':
          downloadUrl='direct:https://github.com/hanguoliangsworld/react-ts.git'
          break;
        default:
          break;
      }

      const spinner = ora()
      spinner.text = '正在下载模板...'
      spinner.start()
      download( downloadUrl, projectName,{ clone: true },function (err) {
          if (err) {
            spinner.fail(err,'模板下载失败')
          } else {
            spinner.succeed('模板下载成功')
          }
        }
      )
   })
})
program.version('1.0.0').parse(process.argv)

