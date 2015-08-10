'use strict';

angular.module('mailtodoApp')
 .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.awesomeThings = [];

    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    
  $scope.todos = [];  
  $scope.addTodo = function()
  {
	  
	 if ($scope.todo != "" && $scope.todo != undefined)
	 {
		 
	  $scope.todos.push({"todo": $scope.todo, "todoowner": $scope.todoowner});
	  
	  
	  if($scope.todoowner == "") $scope.todoowner = Auth.getCurrentUser().email;
	  
	  
	  console.log(Auth.getCurrentUser().email);
	  $http.post('/api/todos', { todoname: $scope.todo, todostatus: 0, todoowner: $scope.todoowner });
	  $scope.todo = "";
	  $scope.todoowner = "";
	  
	  
	 }
  }  
  
  $scope.removeTodo = function(index)
  {
	  $scope.todos.splice(index,1);
  }
  
  // load the todos of this user if any
	$scope.loadTodos = function () 
	{
	    
	   $http.get('/api/todos/showbyuser/'+Auth.getCurrentUser().email).success(function(currToDoList) {
      
            var log = [];
			angular.forEach(currToDoList, function(obj) {
			  $scope.todos.push({"todo":obj.todoname, "todoowner": obj.todoowner});
			});
           
      
       });
	    
	    
	    
	    //$scope.todos.push(currToDoList);
	};
	
	

});
