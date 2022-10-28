#!/usr/bin/env node
//第一行其中#!/usr/bin/env node表示用node解析器执行本文件。
const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')

console.log(chalk.green("i'm a cli"))

// 打印参数
console.log(process.argv)

program
.command('create <projectName>')
.description('create a new project')
.alias('c')
.option('-r, --react', 'react template')
.option('-v, --vue', 'vue template')
.option('-v2, --vue2', 'vue2 template')
.option('-v3, --vue3', 'vue3 template')
.action((projectName, options) => {
  console.log(projectName, options)
  inquirer
   .prompt([
     {
       type: 'list',
       name: 'frameTemplate',
       message: '请选择框架类型',
       choices: ['Vue3', 'Vue2', 'React']
     }
   ])
   .then((answer) => {
      console.log(answer)

      const spinner = ora()
      spinner.text = '正在下载模板...'
      spinner.start()
      download(
        'direct:https://github.com/study-demo/cli-demo.git',
        projectName,
        { clone: true },
        function (err) {
          if (err) {
            spinner.fail('模板下载失败')
          } else {
            spinner.succeed('模板下载成功')
          }
        }
      )
   })
})
program.version('1.0.0').parse(process.argv)



/* const program = require('commander')
const pkg = require('../package')
const chalk = require('chalk')
const download = require('download-git-repo');
const ora = require('ora');
const spinner = ora('Loading undead unicorns');

program
.version(chalk.green(`${pkg.version}`))

program
.command('init <app-name>')
.description('generate a project from a remote template (legacy API, requires ./wk-init)')
.option('-c, --clone', 'Use git clone when fetching remote template')
.action((template, appName, cmd) => {
  spinner.start('开始下载');
  download('direct:https://github.com/study-demo/cli-demo.git', appName, { clone: true }, err => {
    if (err) {
      spinner.fail(chalk.green('下载失败 \n' + err));
      process.exit();
    }
      spinner.succeed(chalk.green(`下载成功`));
    });
  })

program.parse(process.argv) */