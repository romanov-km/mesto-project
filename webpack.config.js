const path = require('path'); // подключаем утилиту path к конфигу вебпак(превращает относительный путь в абсолютный)
const HtmlWebpackPlugin = require('html-webpack-plugin'); //подключили плагин для работы вебпака с html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин для очистки папки dist после сборки проекта
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 


module.exports = {
    entry: { main: './src/index.js' },
    // указали первое место точку входа объект entry, куда заглянет webpack, — файл index.js в папке src    
    output: {
        path: path.resolve(__dirname, 'dist'), // вызов метода path.resolve. Ему переданы два аргумента: ссылка на текущую папку __dirname и относительный путь к точке выхода.
        filename: 'main.js',
        publicPath: ''
    },
    devtool: 'eval-source-map',
    // указали (точку выхода) в какой файл будет собираться весь js и дали ему имя 
    mode: 'development', // добавили режим разработчика
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true // сайт будет открываться сам при запуске npm run dev
    },
    // настроили локальный сервер
    module: {
        rules: [ // rules — это массив правил
          // добавим в него объект правил для бабеля
          {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            use: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/'
          },
          // добавили правило для обработки файлов
          {
            // регулярное выражение, которое ищет все файлы с такими расширениями
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource' // asset/resource позволяет переносить исходные файлы в конечную сборку в том же формате
          },
          {
            // применять это правило только к CSS-файлам
            test: /\.css$/,
            // при обработке этих файлов нужно использовать
            // MiniCssExtractPlugin.loader и css-loader
            use: [MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              // добавим объект options для работы @import в css
              options: { importLoaders: 1 }
            },
            'postcss-loader']
          },
          ]
      },
      plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // путь к файлу index.html
            inject: 'body'
          }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
      ]
}

// module.exports — это синтаксис экспорта в Node.js 