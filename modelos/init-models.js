var DataTypes = require("sequelize").DataTypes;
var _bono = require("./Bono-modelo");
var _configuraciones = require("./Configuraciones-modelo");
var _empleado = require("./Empleado-modelo");
var _jornadaLaboral = require("./JornadaLaboral-modelo");
var _movimientoEmpleado = require("./MovimientoEmpleado-modelo");
var _rol = require("./Rol-modelo");
var _tipoBono = require("./TipoBono-modelo");
var _tipoEmpleado = require("./TipoEmpleado-modelo");
var _usuarios = require("./Usuarios-modelo");
var _sesiones = require("./sesiones-modelo");

function initModels(sequelize) {
  var bono = _bono(sequelize, DataTypes);
  var configuraciones = _configuraciones(sequelize, DataTypes);
  var empleado = _empleado(sequelize, DataTypes);
  var jornadaLaboral = _jornadaLaboral(sequelize, DataTypes);
  var movimientoEmpleado = _movimientoEmpleado(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var tipoBono = _tipoBono(sequelize, DataTypes);
  var tipoEmpleado = _tipoEmpleado(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var sesiones = _sesiones(sequelize, DataTypes);



  return {
    bono,
    configuraciones,
    empleado,
    jornadaLaboral,
    movimientoEmpleado,
    rol,
    tipoBono,
    tipoEmpleado,
    usuarios,
    sesiones
  };
}
export default initModels;
