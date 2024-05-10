import { Document, View, Text, Page } from '@react-pdf/renderer'
import { styles } from './PDFFile.styles'
import { BaseIT } from '../../types';

type Props = {
  data: BaseIT;
};

export function PDFFile ({ data }: Props) {
  return (
    <Document>
      <Page style={styles.page}>

        {/* Sleccionar tipo de entidad de salud promotora */}
        <View style={styles.containerSection}>
          <Text style={styles.title}>A. Seleccionar Tipo de Entidad de Salud Promotora</Text>
          
          <View style={styles.containerInputs}>
            <View style={styles.input}>
              <Text style={styles.titleInput}>Tipo de Entidad:</Text>
              <Text style={styles.textInput}>{ data?.typeService }</Text>
            </View>
          </View>
        </View>

        {/* Datos del Solicitante */}
        <View style={styles.containerSection}>
          <Text style={styles.title}>B. Datos de Solicitante</Text>

          <View style={styles.containerInputs}>
            <View style={styles.input}>
              <Text style={styles.titleInput}>Número de Registro:</Text>
              <Text style={styles.textInput}>{ data?.registryNumber }</Text>
            </View>

            <View style={styles.input}>
              <Text style={styles.titleInput}>Nombre:</Text>
              <Text style={styles.textInput}>{ data?.firstName } </Text>
            </View>

            <View style={styles.input}>
              <Text style={styles.titleInput}>Apellido:</Text>
              <Text style={styles.textInput}>{ data?.lastName }</Text>
            </View>

            <View style={styles.input}>
              <Text style={styles.titleInput}>Correo Electrónico:</Text>
              <Text style={styles.textInput}>{ data?.email }</Text>
            </View>

            <View style={styles.input}>
              <Text style={styles.titleInput}>Seleccionar EPS</Text>
              <Text style={styles.textInput}>{ data?.eps }</Text>
            </View>
          </View>
        </View>
        
        {/* Lugar de la cita medica */}
        <View style={styles.containerSection}>
          <Text style={styles.title}>C. Lugar de la Cita Médica</Text>

          <View style={styles.containerInputs}>
            <View style={styles.input}>
              <Text style={styles.titleInput}>Departamento:</Text>
              <Text style={styles.textInput}>{ data?.department }</Text>
            </View>

            <View style={styles.input}>
              <Text style={styles.titleInput}>Ciudad:</Text>
              <Text style={styles.textInput}>{ data?.city }</Text>
            </View>

            <View style={styles.input}>
              <Text style={styles.titleInput}>Centro Médico:</Text>
              <Text style={styles.textInput}>{ data?.medicalCenter }</Text>
            </View>
          </View>
        </View>

        {/* Fecha de la cita medica */}
        <View style={styles.containerSection}>
          <Text style={styles.title}>D. Fecha de la Cita Médica</Text>

          <View style={styles.containerInputs}>
            <View style={styles.input}>
              <Text style={styles.titleInput}>Seleccionar Fecha:</Text>
              <Text style={styles.textInput}>{ data?.date }</Text>
            </View>

            <View style={styles.input}>
              <Text style={styles.titleInput}>Seleccionar Hora:</Text>
              <Text style={styles.textInput}>{ data?.hour }</Text>
            </View>
          </View>
        </View>

          {/* Estadod el paciente */}
        <View style={styles.containerSection}>
          <Text style={styles.title}>E. Estado del Paciente</Text>

          <View style={styles.containerInputs}>
            <View style={styles.input}>
              <Text style={styles.titleInput}>Seleccionar Médico:</Text>
              <Text style={styles.textInput}>{ data?.doctor }</Text>
            </View>

            <View style={styles.input}>
              <Text style={styles.titleInput}>Estado del Paciente:</Text>
              <Text style={styles.textInput}>{ data?.patientStatus }</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  )
}