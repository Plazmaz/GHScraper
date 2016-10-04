var request = require('request');
var fs = require('fs');
var parseString = require('xml2js').parseString;
var commitURLRegexp = /<a href="(.*?)\/commit\/(.*?)"/g
var repoURL = 'https://api.github.com/repos%or/commits/%sha?client_id=0018d8ee603d695257bc&client_secret=86289629d43719cdc0430014b4ec5fba0a6a72c6'
var dorks = [];
var scannedCommits = 0;
var USER_AGENT = "GitWatcher";

var Dork = function(queryParts) {
	this.queryParts = queryParts;
	this.matches = function(fileData) {
		var foundMatch = true;
		for(var i = 0; i < this.queryParts.length; i++) {
			if(this.queryParts[i].isFilename) {
				foundMatch = foundMatch && fileData.filename.toString().trim().endsWith(this.queryParts[i].queryString);
			} else if(this.queryParts[i].isExtension) {
				foundMatch = foundMatch && fileData.filename.toString().trim().endsWith('.' + this.queryParts[i].queryString);
			} else if(this.queryParts[i].isPath) {
				foundMatch = foundMatch && fileData.filename.toString().match(new RegExp('(.*?)\/' + this.queryParts[i].queryString));
			} else {
				foundMatch = foundMatch && fileData.patch && fileData.patch.toString().indexOf(this.queryParts[i].queryString) != -1;
			}
		}
		return foundMatch;
	}	
}
String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

function QueryPart() {
	this.isFilename = false;
	this.isExtension = false;
	this.isPath = false;
	this.queryString = '';
}

function getDorks(filename) {
	fs.readFile(filename, 'utf-8', function(err, data) {
		if(err) {
			console.error(err);
		}
		var tmpDorks = data.split('\n');
		for(var i = 0; i < tmpDorks.length; i++) {
			var rawDork = tmpDorks[i];
			console.log(rawDork)
			dorks.push(new Dork(getQueryParts(rawDork)));
			
		}
	});
}

getDorks('github-dorks.txt')

function getQueryParts(dork) {
	var parts = [];
	var stringParts = dork.split(" ");
	for(var i = 0; i < stringParts.length; i++) {
		stringParts[i] = stringParts[i].trim();
		var QueryPartObj = new QueryPart();
		if(stringParts[i].indexOf('filename:') === 0) {
			QueryPartObj.isFilename = true;
			QueryPartObj.queryString = stringParts[i].substring('filename:'.length);
		} else if(stringParts[i].indexOf('extension:') === 0) {
			QueryPartObj.isExtension = true;
			QueryPartObj.queryString = stringParts[i].substring('extension:'.length);
		} else if(stringParts[i].indexOf('path:') === 0) {
			QueryPartObj.isPath = true;
			QueryPartObj.queryString = stringParts[i].substring('path:'.length);
		} else {
			QueryPartObj.queryString = stringParts[i];
		}
		parts.push(QueryPartObj);
	}
	this.toString = function() {
		return parts.join(' ');
	}
	return parts;
}

function queryTimeline(callback) {
	var options = {
	  url: 'https://api.github.com/events?per_page=135&client_id=0018d8ee603d695257bc&client_secret=86289629d43719cdc0430014b4ec5fba0a6a72c6',
	  headers: {
		'User-Agent': USER_AGENT
	  }
	};
	request(options, function(err, response, body) {
		if(err) {
			console.error(err);
		}
		var events = JSON.parse(body);
		if(!events) {
			console.log(body);
			return;
		}
		for(var i = 0; i < events.length; i++) {
			var evt = events[i];
			var type = evt.type;
			if(type.indexOf('PushEvent') == 0 || type.indexOf('CreateEvent') == 0 || type.indexOf('PullRequestEvent') == 0) {
				if(!evt.payload.commits) {
					continue;
				}
				var commits = evt.payload.commits;
				commits.forEach(function(commit) {
					var commitURL = commit.url;
					var options = {
					  url: commitURL + '?client_id=0018d8ee603d695257bc&client_secret=86289629d43719cdc0430014b4ec5fba0a6a72c6',
					  headers: {
						'User-Agent': USER_AGENT
					  }
					};

					request(options, function(err, response, body) {
						scannedCommits++;
						if(scannedCommits % 10 == 0 && scannedCommits > 0) {
							console.log(scannedCommits + " commits scanned...");
						}
						if(err) {
							console.log(body);
							console.error(err);
							return;
						}
						var files = JSON.parse(body).files;
						if(!files) {
							console.error('Ratelimit hit or no files found.');
							return;
						}
						if(files.length === 0) {
							return;
						}
						for(var j = 0; j < dorks.length; j++) {
							for(var k = 0; k < files.length; k++) {
								var file = files[k]
								if(dorks[j].matches(file)) {
									console.log(JSON.stringify(dorks[j].queryParts) + ' matched file ' + file.filename + ' with sha ' + file.sha + '!');
									console.log('Data url: ' + file.raw_url);
								}
							}
						}
					});
				});
			}
		};
	})
}
queryTimeline();
setInterval(queryTimeline, 7000);