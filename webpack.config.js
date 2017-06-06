module.exports = function (env) {
  //eslint-disable-next-line
  return require(`./webpack.${env}.js`);
};
