const path = require("path");
// плагин для работы с html
const HTMLWebpackPlugin = require("html-webpack-plugin");
// плагин для очистки папки от ненужных файлов
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

// ВЕБПАК ЗНАЕТ ТОЛЬКО JS И JSON

module.exports = {
  // задаём АБСОЛЮТНЫЙ путь, относительно которого будет плясать конфигурация
  context: path.resolve(__dirname, "src"),
  mode: "development",
  // чтоюы работали всякие async
  entry: ["@babel/polyfill", "./js/index.js"], // может быть объектом,где ключи-название чанка, значение-путь к файлу
  // куда всё запишется
  output: {
    filename:
      "bundle.js" /* может быть [name].всё остальное, в name подставится название чанка, contenthash-хеш файла, чтобы не кешировалось при обновлении */,
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  resolve: {
    // если расщирение не указано, искать одно из указанных ниже
    extensions: [".js"],
    // замена пути
    /* alias: {
      "@models": path.resolve(__dirname, "models"),
      "@": "src",
    }, */
  },
  // чтобы импортируемые модули в разные точки входа не импортировались несколько раз
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ],
  },
  // live-релоад
  // всё хранится в оперативке
  devServer: {
    port: 4200,
  },
  plugins: [
    // ОБЯЗАТЕЛЬНО должны быть новые инстансы класса
    // без параметров просто подставит нужные скрипты из аутпута в конец html
    new HTMLWebpackPlugin({
      // title не работает,если он есть в шаблоне
      title: "1.6",
      template: "./index.html",
      // оптимизация
      minify: {
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(),
    // что, откуда и куда копирроввть
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/img"),
          to: path.resolve(__dirname, "dist/img"),
        },
      ],
    }),
    // MiniCssExtractPlugin.loader вынос css в отдельный файл
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        loader: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        // если файл соответствует регулярке, указанной в test,
        test: /\.css$/,
        // то его считывает лоадер
        // вебпак идёт справа-налево: сначала css-loader, затем style-loader
        // css-loader принимает импорты и импортировать в js стили
        // style-loader закидывает стили в <head>
        // MiniCssExtractPlugin.loader вынос css в отдельный файл
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // изменнеие сущности без перезагрузки страницы
              hmr: true,
              reloadAll: true,
            },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ca]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // изменнеие сущности без перезагрузки страницы
              hmr: true,
              reloadAll: true,
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader?name=./img/[name].[ext]",
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
};
