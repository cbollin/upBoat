var app = angular.module('upBoat',['ui.router']);
console.log('inside angularppjs');

app.factory('postsFactory', [function(){
  var o = {
    posts: []
  };
  return o;
}]);

app.controller('MainCtrl', ['$scope', 'postsFactory', function($scope, posts){
  $scope.posts = posts.posts;

  $scope.addPost = function()
  {
    if(!$scope.title || $scope.title === ''){return;}
    $scope.posts.push(
      {
        title: $scope.title,
        link: $scope.link,
        votes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Preeya', body: 'Wow im rude!', upvotes: 0},
          {author: 'Cassidy', body: 'Yep i know', upvotes: 0}
        ]
      });
    $scope.title = '';
    $scope.link = '';
  };

  $scope.incrementVotes = function(post){
    post.votes +=1;
  };
  $scope.decrementVotes = function(post){
    post.votes -=1;
  }
}]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'postsFactory',
  function($scope, $stateParams, postsFactory){
    $scope.post = postsFactory.posts[$stateParams.id];

    $scope.addComment = function(){
      if($scope.body === ''){return;}
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };
}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })

  .state('postsFactory', {
    url: '/posts/{id}',
    templateUrl: '/posts.html',
    controller: 'PostsCtrl'
  });
  $urlRouterProvider.otherwise('home');
}]);
