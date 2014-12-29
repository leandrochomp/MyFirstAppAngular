angular.module('MyApp', [])
    .controller('indexCtrl', ['$scope', function($scope) {
            //Coleção de Funcionarios (linhas da GRID)
            $scope.aCoFuncionarios = [];
 
            var Funcionario = function() {
                var _nome = "";
                var _idade = "";
                var _profissao = "";
                var _dataCadastro = new Date();
 
                return {
                    nome: _nome,
                    idade: _idade,
                    profissao: _profissao,
                    dataCadastro: _dataCadastro
                }
            }

            $scope.aFuncionario = new Funcionario();

            var FuncionarioEdt = function() {
                var _nome = "";
                var _idade = "";
                var _profissao = "";
                var _dataCadastro = new Date();
 
                return {
                    nome: _nome,
                    idade: _idade,
                    profissao: _profissao,
                    dataCadastro: _dataCadastro
                }
            }

            $scope.aFuncionarioEdt = new FuncionarioEdt();

            var Acoes = function () {

            	var _btnShow = false;
            	var _tbodyShow = false;
            	var _bloqueado = false;
            	var _indexLinha = "";

            	return {
            		btnShow: _btnShow,
            		tbodyShow: _tbodyShow,
            		bloqueado: _bloqueado,
            		indexLinha: _indexLinha,
            	}
            }
 
            $scope.aAcoes = new Acoes();
 
            $scope.adicionarFuncionario = function() {
                $scope.aCoFuncionarios.unshift($scope.aFuncionario);
                $scope.aFuncionario = new Funcionario();
            };
 
            $scope.removerFuncionario = function(index) {
                $scope.aCoFuncionarios.splice(index, 1);
            };
 
            $scope.limparDadosForm = function() {
                $scope.aFuncionario = new Funcionario();
            };

            $scope.alterarFuncionario = function(funcionario, index) {
                $scope.aAcoes.tbodyShow = true;
                $scope.aAcoes.btnShow = false;
                $scope.aAcoes.bloqueado = true;
                $scope.aAcoes.indexLinha = index;

                gravarLinha(funcionario)
            };

            var gravarLinha = function (funcionario){
                    $scope.aFuncionarioEdt.nome = funcionario.nome;
                    $scope.aFuncionarioEdt.idade = funcionario.idade;
                    $scope.aFuncionarioEdt.profissao = funcionario.profissao;
            };

            $scope.salvarAlteracao = function() {
            	$scope.aAcoes.tbodyShow = false;
            	$scope.aAcoes.btnShow = true;
            	$scope.aAcoes.bloqueado = false;

            	$scope.aCoFuncionarios.splice($scope.aAcoes.indexLinha, 1);
            	$scope.aCoFuncionarios.unshift($scope.aFuncionarioEdt);
                $scope.aFuncionarioEdt = new FuncionarioEdt();
            };

            $scope.cancelarAlteracao = function() {
                $scope.aFuncionarioEdt = new FuncionarioEdt();
                $scope.aAcoes.tbodyShow = false;
                $scope.aAcoes.bloqueado = false;
            };
        }
])
 
 //diretiva que permite apenas numeros no input
    .directive('somenteNumeros', function () {
        return {
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }
 
                ngModelCtrl.$parsers.push(function (val) {
                    var clean = val.replace(/\D/g, '');
                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });
 
                element.bind('keypress', function (event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        }
    });
