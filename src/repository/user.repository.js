import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv'
dotenv.config()
//import  dateFormat from 'dateformat';

const client = new Client({
    user: process.env.APP_DB_USER,
    host: process.env.APP_DB_HOST,
    database: process.env.APP_DB_DATABASE,
    password: process.env.APP_DB_PASSWORD,
    port: process.env.APP_DB_PORT,
})
client.connect()


export const nuevaPreventaE = async (data) => {
    try {
        const {
            fecha, id_vendedor, id_cliente, idprospecto, observ, ult_modif,
            ofertas, intereses, estado, id_area, id_usuario, cant_dets, cliente,
            ult_fch_prev, id_lead,
        } = data || null;
       
        const idcab = await obtenerIdCabezera();
        await client.query('BEGIN')
        const queryCabs = `INSERT INTO comisiones.prevtas_cabs(
            id, fecha, id_vendedor, id_cliente, id_prospecto, observ, ult_modif, ofertas, intereses, estado, id_area, id_usuario, cant_dets, cliente, ult_fch_prev, id_lead)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`
        const insertCabs = [idcab, dateFormat(fecha, "yyyy-mm-dd"), id_vendedor,
            id_cliente, idprospecto, observ, ult_modif, ofertas, intereses, estado,
            id_area, id_usuario, cant_dets,
            cliente, ult_fch_prev, id_lead]
        await client.query(queryCabs, insertCabs)

        if(Object.keys(data.acciones).length != 0){
            data.acciones.forEach(async (element) => {
                var iddetall = await obtenerIdDetalle();
                console.log(iddetall,idcab,element.accion1, element.contacto1, element.observ1,dateFormat(element.fecha2, "yyyy-mm-dd") , element.accion2, element.contacto2, element.ejecutado3,
                element.orden, element.fchora_ini1, element.fchora_fin1, element.ubic_lat1, element.ubic_long1, element.origen, element.destino,
                element.asunto, element.cuerpo, element.hay_correo, element.fecha3, element.hay_fecha3)
                const queryDets = `INSERT INTO comisiones.prevtas_dets(
                    id, id_cab, accion1, contacto1, observ1, fecha2, accion2, contacto2, ejecutado3, orden, fchora_ini1, fchora_fin1, ubic_lat1, ubic_long1, origen, 
                    destino, asunto, cuerpo, hay_correo, fecha3, hay_fecha3)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21);`
                const insertDets = [iddetall,idcab,element.accion1, element.contacto1, element.observ1,dateFormat(element.fecha2, "yyyy-mm-dd") , element.accion2, element.contacto2, element.ejecutado3,
                element.orden, element.fchora_ini1, element.fchora_fin1, element.ubic_lat1, element.ubic_long1, element.origen, element.destino,
                element.asunto, element.cuerpo, element.hay_correo, element.fecha3, element.hay_fecha3]
                await client.query(queryDets, insertDets)
            });
        }
        await client.query('COMMIT')
        return 0
    } catch (err) {
        await client.query('ROLLBACK')
        return err
    }
}

export const preventaResumen = async () => {
        const res = await client.query(`select * from rtp.bp_movimientos limit 0`)
        return res.rows
    }

