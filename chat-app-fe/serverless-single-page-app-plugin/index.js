'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var spawnSync = require('child_process').spawnSync;

var ServerlessPlugin = function () {
  function ServerlessPlugin(serverless, options) {
    _classCallCheck(this, ServerlessPlugin);

    this.serverless = serverless;
    this.options = options;
    this.commands = {
      syncToS3: {
        usage: 'Deploys the `build` directory to your bucket',
        lifecycleEvents: ['sync']
      },
      domainInfo: {
        usage: 'Fetches and prints out the deployed CloudFront domain names',
        lifecycleEvents: ['domainInfo']
      }
    };

    this.hooks = {
      'syncToS3:sync': this.syncDirectory.bind(this),
      'domainInfo:domainInfo': this.domainInfo.bind(this)
    };
  }

  // syncs the `build` directory to the provided bucket


  _createClass(ServerlessPlugin, [{
    key: 'syncDirectory',
    value: function syncDirectory() {
      var s3Bucket = this.serverless.variables.service.custom.s3Bucket;
      var args = ['s3', 'sync', 'build/', 's3://' + s3Bucket + '/'];
      var result = spawnSync('aws', args);
      var stdout = result.stdout.toString();
      var sterr = result.stderr.toString();
      if (stdout) {
        this.serverless.cli.log(stdout);
      }
      if (sterr) {
        this.serverless.cli.log(sterr);
      }
      if (!sterr) {
        this.serverless.cli.log('Successfully synced to the S3 bucket');
      }
    }

    // fetches the domain name from the CloudFront outputs and prints it out

  }, {
    key: 'domainInfo',
    value: function domainInfo() {
      var _this = this;

      var provider = this.serverless.getProvider('aws');
      var stackName = provider.naming.getStackName(this.options.stage);
      return provider.request('CloudFormation', 'describeStacks', { StackName: stackName }, this.options.stage, this.options.region).then(function (result) {
        var outputs = result.Stacks[0].Outputs;
        var output = outputs.find(function (entry) {
          return entry.OutputKey === 'WebAppCloudFrontDistributionOutput';
        });
        if (output.OutputValue) {
          _this.serverless.cli.log('Web App Domain: ' + output.OutputValue);
        } else {
          _this.serverless.cli.log('Web App Domain: Not Found');
        }
      });
    }
  }]);

  return ServerlessPlugin;
}();

module.exports = ServerlessPlugin;
