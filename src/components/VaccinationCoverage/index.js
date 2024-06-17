// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {details} = props
  const dataFormater = number => number.toString()
  return (
    <ResponsiveContainer width={1000} height={300}>
      <BarChart data={details} margin={{top: 5}}>
        <XAxis dataKey="vaccineDate" tick={{stroke: 'gray', strokewidth: 1}} />
        <YAxis
          tickFormatter={dataFormater}
          tick={{stroke: 'gray', strokeWidth: 0}}
        />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar dataKey="dose1" name="Dose 1" fill=" #5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill=" #f54394" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
