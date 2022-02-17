// Code goes here

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);


function OtherController($scope) {
    $scope.pageChangeHandler = function (num) {
        console.log('items page changed to ' + num);
    };
}



myApp.controller("myCtrl", function ($scope, $http) {
    $http.get("https://localhost:44354/home/GetEmployeesJson").then(function (res) {
        $scope.currentPage = 1;
        $scope.pageSize = 4;
        $scope.items = [];

        for (var i = 0; i < res.data.length; i++) {
            var dish = res.data[i];
            //  console.log( res.data[j].Salary);

            $scope.items.push(dish);

        }


        $scope.editRecord = function (id) {
            if (id > 0) {
                $http.get("https://localhost:44354/home/GetEmployee/" + id)
                    .then(function (response) {
                        //console.log(response.data);
                        $scope.Employee = response.data;

                    });
            }

        }

        $scope.updateRecord = function (updateSalary, id) {
            $scope.datas = {};
            $http.get("https://localhost:44354/home/GetEmployee/" + id)
                .then(function (response) {
                    $scope.Employee2 = response.data;

                    if (updateSalary != response.data.Salary) {

                        $scope.datas = response.data;
                        $scope.datas.Salary = updateSalary;
                        return $http({
                            url: "https://localhost:44354/home/SaveRecord",
                            method: "POST",
                            data: $scope.datas
                        })

                    }
                });
                    location.reload();

        }





    })


})
