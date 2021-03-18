'use strict';
const app = require('express');

const bd = require('./bdconfig');

let self = module.exports = {
    init: async () => {
      for (let sproc of self.sprocs) {
        await bd.query(`DROP PROCEDURE IF EXISTS ${sproc.name}`)
        await bd.query(`${sproc.query}`)
        console.log(`STORED PROCEDURE: ${sproc.name} ADDED`)
      }
    },
    sprocs: [
      {
        name: 'reporteEmpleado',
        query: `
        CREATE PROCEDURE reporteEmpleado (IN pIdEmpleado int,IN pMes int)
        BEGIN
        DECLARE BonoEntrega INT;
        DECLARE BonoChofer INT;
        DECLARE HorasLaborables INT;
        DECLARE BonoCargador INT;
        DECLARE ISR DECIMAL;
        DECLARE SueldoBaseMensual INT;
        DECLARE ISRAdicional DECIMAL;
        DECLARE ValeDespensa DECIMAL;
        DECLARE RolChoferID INT;
        DECLARE RolCargadorID INT;
        DECLARE RolAuxiliarID INT;
        DECLARE TipoEmpleadoInternoID INT;
        DECLARE anio VARCHAR(4);
        DECLARE FechaSelect VARCHAR(10);
        DECLARE Mes VARCHAR(2);
        DECLARE BonoPuesto DECIMAL;
        DECLARE BonoCubrirTurno DECIMAL;
        DECLARE SueldoMensualBruto DECIMAL;
        DECLARE SueldoNetoFinal DECIMAL;
        DECLARE SueldoNeto DECIMAL;


        SET anio = (select YEAR(NOW()));
        SET FechaSelect = (select CONCAT(anio,'-',pMes,'-01'));
        SET RolChoferID = (select id from Rol where nombreRol = 'Chofer');
        SET RolCargadorID = (select id from Rol where nombreRol = 'Cargador');
        SET RolAuxiliarID = (select id from Rol where nombreRol = 'Auxiliar');
        SET TipoEmpleadoInternoID = (select id from TipoEmpleado where tipoEmpleado = 'Interno');
        SET SueldoBaseMensual = (select sueldoBase * (DAY(LAST_DAY(date(FechaSelect)))) from JornadaLaboral  where id = (select jornadaLaboralId from Empleado where id = pIdEmpleado));
        SET HorasLaborables = (select horasLaborales from JornadaLaboral where id = (select jornadaLaboralId from Empleado where id = pIdEmpleado));
        SET BonoEntrega = (select SUM(importeTotalRecorrido) from MovimientoEmpleado where MONTH(fechaMovimiento) = pMes and YEAR(fechaMovimiento) = YEAR(now()) and empleadoId = pIdEmpleado and activo = 1 );
        SET BonoChofer = (select b.importe * (DAY(LAST_DAY(date(FechaSelect))) * HorasLaborables )  from Bono b INNER JOIN TipoBono tb on b.tipoBonoId = tb.id where tb.nombreBono = 'BonoPorChofer');
        SET BonoCargador = ( select b.importe * (DAY(LAST_DAY(date(FechaSelect))) * HorasLaborables )  from Bono b INNER JOIN TipoBono tb on b.tipoBonoId = tb.id where tb.nombreBono = 'BonoPorCargador');
        SET ISR = (SELECT SueldoBaseMensual * (porcentaje/100) FROM Configuraciones WHERE nombre = 'ISR');
        SET ISRAdicional = (SELECT SueldoBaseMensual * (porcentaje/100) FROM Configuraciones WHERE nombre = 'ISRAdicional');
        SET ValeDespensa = (SELECT SueldoBaseMensual * (porcentaje/100) FROM Configuraciones WHERE nombre = 'ValeDespensa');
        SET BonoPuesto = (SELECT CASE 
            WHEN rolId = RolChoferID 
                THEN BonoChofer 
            WHEN rolId = RolCargadorID 
                THEN BonoCargador
            ELSE 0
            END 
            FROM Empleado WHERE id = pIdEmpleado
        );

        SET BonoCubrirTurno = (SELECT CASE 
            WHEN tipoRolCubirtoId = RolChoferID 
                THEN BonoChofer 
            WHEN tipoRolCubirtoId = RolCargadorID
                THEN BonoCargador 
            ELSE 0
            END 
            FROM MovimientoEmpleado WHERE MONTH(fechaMovimiento) = pMes and YEAR(fechaMovimiento) = YEAR(now()) AND empleadoId = pIdEmpleado LIMIT 1
        );

        SET SueldoMensualBruto =(SELECT CASE 
            WHEN tipoEmpleadoId = TipoEmpleadoInternoID
                THEN IFNULL(SUM(SueldoBaseMensual+BonoPuesto+BonoCubrirTurno+BonoEntrega+ValeDespensa ),0)
            ELSE
                IFNULL(SUM(SueldoBaseMensual+BonoPuesto+BonoCubrirTurno+BonoEntrega),0)
            END 
            FROM Empleado WHERE id = pIdEmpleado
        );

        SET SueldoNeto = IFNULL(SueldoMensualBruto-ISR,0);

        SET SueldoNetoFinal = (CASE WHEN SueldoNeto > 16000 THEN SueldoNeto-ISRAdicional ELSE 0 END);


        SELECT
        CONCAT(nombre,' ',apellidoPaterno,' ',apellidoMaterno) as Nombre ,
        te.tipoEmpleado,
        r.nombreRol,
        jl.horasLaborales,
        SueldoBaseMensual,
        BonoEntrega,
        BonoPuesto,
        BonoCubrirTurno,
        SueldoMensualBruto,
        SueldoNeto,
        SueldoNetoFinal
        FROM 
        Empleado e INNER JOIN
            TipoEmpleado te 
            on e.tipoEmpleadoId = te.id INNER JOIN
            Rol r on r.id = e.rolId INNER JOIN
            JornadaLaboral jl on
            jl.id = e.jornadaLaboralId
        WHERE
        e.id = pIdEmpleado;
        END
          `
      }
    ]
  }