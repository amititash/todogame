'use strict';

angular.module('mailtodoApp')
 .controller('MainCtrl', function ($scope, $http, Auth, Upload, angularFilepicker) {
	 
	 
	angularFilepicker.setKey('AkWg3BOpTGqgn8rSKoGwAz');
	
	$scope.pickFile = pickFile;

	function pickFile(){
		angularFilepicker.pick(
			{mimetype: 'image/*'},
			onSuccess
		);
	}
   
   function onSuccess(Blob) {
            console.log(Blob);
            $scope.fileObj = Blob;
        };
        
	
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
	  if($scope.fileObj)
	  {
		  
		  console.log("here...");
		  $scope.upload();
	  }
	  else
	  {
	  	$http.post('/api/todos', { todoname: $scope.todo, todostatus: 0, todoowner: $scope.todoowner, todoatt: "" });
	  }
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
	
	
	$scope.upload = function ()
	{
		console.log($scope.fileObj);
		
        $http.post('/api/todos', { todoname: $scope.todo, todostatus: 0, todoowner: $scope.todoowner , todoatt: $scope.fileObj.url});
		
	}
	// API Call for manual upload to disc below this ----
	
	/* 
		do this only if you need instant upload
		
		$scope.$watch('file', function (file) {
      $scope.upload($scope.file);
    });
    */
    
    /* optional: set default directive values */
    //Upload.setDefaults( {ngf-keep:false ngf-accept:'image/*', ...} );
   /**
	   
	  
    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/todos/todofile',
            file: file
        }).progress(function (evt) {
           // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: going on ');
        }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            $http.post('/api/todos', { todoname: $scope.todo, todostatus: 0, todoowner: $scope.todoowner , todoatt: config.file.name});
            
            
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    };
    
    */

});
