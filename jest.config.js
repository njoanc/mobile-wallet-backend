module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@nestjs)'],
};
