
export const GenerarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}

export const FormatearFecha = (Fecha) => {
    const FechaNueva = new Date(Fecha)

    const opciones = {
        year:'numeric',
        month:'long',
        day:'2-digit',
    }  

    return FechaNueva.toLocaleDateString('es-ES', opciones)
}