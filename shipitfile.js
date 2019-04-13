module.exports = function (shipit) {
  shipit.initConfig({
    staging: {
      servers: 'serverpilot@leslash.com'
    }
  })

  shipit.blTask('build', function () {
    return shipit.local('yarn production')
  })

  shipit.blTask('clean', function () {
    return shipit.remote(
      'rm -rf /srv/users/serverpilot/apps/jekyll-mix/public/*'
    )
  })

  shipit.task('copy', function () {
    shipit.remoteCopy(
      './_site/',
      '/srv/users/serverpilot/apps/jekyll-mix/public'
    )
  })

  shipit.task('deploy', function () {
    shipit.start('build', 'clean', 'copy')
  })
}
