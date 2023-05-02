/*
Resolver los siguientes requerimientos

Una función que reciba en forma ordenada y preestablecida:

- los datos de una persona (nombre, apellido y departamento en que vive), junto con su puntaje en la evaluación de Fundamentos de Programación,
- su puntaje en la evaluación de Programación Imperativa,
- su puntaje en la evaluación de Programación Orientada a Objetos,
- si cargó o no la evidencia en la evaluación de Fundamentos de Programación,
- si cargó o no la evidencia en la evaluación de Programación Imperativa,
- si cargó o no la evidencia en la evaluación de Programación Orientada a Objetivos,
- su puntaje promedio en Inglés,
- si hizo o no las 10 lecciones de Competencias transversales.



A partir de los datos recibidos, se pretende obtener en pantalla un texto cordial, que identifique a la persona y se le informe su status final, por ejemplo:

Hola María!!, el detalle de tu status final es:
En Inglés - 85 puntos- ok
En CT - ok
En Técnica - 87 puntos - ok
Evidencias entregadas - 3 - ok
En conclusión, tu status final es aprobado con 87.



Recordar que para aprobar la fase 1:
La persona tiene que obtener en Inglés 50 puntos o más en el promedio de todas las semanas, y si no se llega a esos 50 puntos no se aprueba fase 1.

Además, debe haber realizado el 100% de las tutorías, y si no se llega a hacerlo no se aprueba fase 1.

Además, en la parte técnica el puntaje final se compone de:
30% de la evaluación de Fundamentos de Programación + 50% de la evaluación de Programación Imperativa + 20% de la evaluación de Programación Orientada a Objetos,
si ese puntaje es mayor o igual a 60 y tiene las 3 entregas de evidencia, aprueba directamente,
si el puntaje es mayor o igual a 60 pero le falta alguna de las evidencias, debe rendir un examen final con supervisión y obtener 60% o más para aprobar.

Si la persona subió las 3 entregas de evidencia y su puntaje final está en el rango de 50 a 59,99 podrá rendir el examen final con supervisión y para aprobar necestiará llegar al 60%.

Todos los otros casos reprueban fase 1.
*/

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// declaro el registro para las personas con sus datos correspondientes
let person = {
    name: "Jonathan",
    surname: "Piriz",
    city: "Paysandú",
    fundamentalScore: 60,
    imperativeScore: 40,
    objectOrientedScore: 90,
    fundamentalEvidence: true,
    imperativeEvidence: true,
    objectOrientedEvidence: false,
    averageEnglishScore: 80,
    lessonsTC: true
}

// función para calcular el puntaje total de la parte tecnica de un alumno. Siguiendo la regla del %30, %50, %20
function calculateTechnicalScore(student) {
    let fundamentalPercentage = student.fundamentalScore * 0.3;
    let imperativePercentage = student.imperativeScore * 0.5;
    let objectOrientedPercentage = student.objectOrientedScore * 0.2;

    return fundamentalPercentage + imperativePercentage + objectOrientedPercentage;
}

// función principal para conocer el status final de un estudiante al que se le pasa como parametro un registro con todos sus datos
function finalStatus(student) {
    let englishStatus;
    let tcStatus;
    let technicalStatus;
    let technicalScore = calculateTechnicalScore(student);
    let numbersOfEvidences = 0;
    let evidenceStatus;
    let studentFinalStatus;

    if (student.averageEnglishScore >= 50) {
        englishStatus = 'ok!';
    } else {
        englishStatus = 'mal';
        studentFinalStatus = 'no aprobado';
    };

    if (student.lessonsTC) {
        tcStatus = 'ok!';
    } else {
        tcStatus = 'mal';
        studentFinalStatus = 'no aprobado';
    };

    if (technicalScore >= 60) {
        technicalStatus = 'ok!';
    } else {
        technicalStatus = 'mal';
    };

    //creo un array con los valores puestos en las evidencias (true o false) para luego iterarlo
    let evidencesArray = [student['fundamentalEvidence'], student['imperativeEvidence'], student['objectOrientedEvidence']];

    for (let i = 0; i < evidencesArray.length; i++) {
        if (evidencesArray[i] === true) {
            numbersOfEvidences++;
        }
    }

    if (numbersOfEvidences === 3) {
        evidenceStatus = 'ok!';
    } else {
        evidenceStatus = 'mal';
    };

    if (studentFinalStatus !== 'no aprobado' && technicalStatus === 'ok!' && evidenceStatus === 'ok!') {
        studentFinalStatus = 'aprobado';
    } else if(studentFinalStatus !== 'no aprobado' && technicalStatus === 'ok!' && evidenceStatus === 'mal') {
        studentFinalStatus = 'repechaje';
    } else if(studentFinalStatus !== 'no aprobado' && (technicalStatus = 'mal' && technicalScore >= 50) && evidenceStatus === 'ok!') {
        studentFinalStatus = 'repechaje';
    } else {
        studentFinalStatus = 'no aprobado';
    };

    let statusMessagge;

    if (studentFinalStatus === 'aprobado') {
        statusMessagge = 'FELICIDADES!!!';
    } else if (studentFinalStatus === 'repechaje') {
        statusMessagge = 'debes rendir un examen final con supervisión y obtener 60% o más para aprobar.';
    } else {
        statusMessagge = 'lo sentimos mucho';
    }

    let messagge = `
    Hola ${student.name}!!, el detalle de tu status final es:
    En Inglés - ${student.averageEnglishScore} puntos- ${englishStatus}
    En CT - ${tcStatus}
    En Técnica - ${technicalScore} puntos - ${technicalStatus}
    Evidencias entregadas - ${numbersOfEvidences} - ${evidenceStatus}
    En conclusión, tu puntaje final es de ${technicalScore} puntos y tu status es de ${studentFinalStatus}, ${statusMessagge}
    `;

    return console.log(messagge);

}

finalStatus(person);
