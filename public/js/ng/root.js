var root = angular.module("root", ['ngRoute']);
var dash = angular.module("dash", ['ngRoute']);

root.controller("loginController", ["$scope", "$http",function( $scope, $http ) {
	$scope.invalid_user = false;

	$('#LoginBtn').click(function (e) {
		var email = $('#InputEmail').val();
		var pass = $('#InputPassword').val();

		if(email != "" && pass != "") {
			$scope.checkLoogin(email, pass, function(resp) {
				console.log(resp);
				if(resp) {
					window.location.href = '/dashboard';
				} else {
					$scope.invalid_user = true;
				}
			});
		}
	});

	$('#registerAcc').click(function (e) {
		window.location.href = '/register';
	});
	$('#forgotPass').click(function (e) {
		window.location.href = '/forgot-pass';
	});

	$scope.checkLoogin = function(email, pass, cb) {
		var url = "/checkLogin?email=" + email + "&pass=" + pass;

		$http.get(url)
			.then(function (response) {
				cb(response.data.data);
			})
	}

}]);

dash.controller("dashboardController", ["$scope", "$http",function( $scope, $http ) {
	$(document).ready(function(e) {
		$scope.fillTasks();
	});

	$scope.fillTasks = function() {
		var getTaskUrl = "/fetchTasks";
		$http.get(getTaskUrl)
			.then(function(response) {

                var appendToHtml = "";
				var tasks = response["data"].data;
                console.log(tasks);
                for (i = 0; i < tasks.length; i++) {
                    appendToHtml += '<tr><td>' + tasks[i]["name"] +
						'</td><td>' + tasks[i]["Assignee"] +
						'</td><td>' + tasks[i]["Assigner"] +
						'</td><td>' + tasks[i]["Due Date"] +
						'</td><td>' + tasks[i]["Date Created"] +
						'</td><td>' + tasks[i]["Description"] +	'</td></tr>';
                }
				$('#dataTable').append(appendToHtml);
		})
	};

    $('#LogoutBtn').click(function (e) {
        window.location.href = "/";
    })
}]);