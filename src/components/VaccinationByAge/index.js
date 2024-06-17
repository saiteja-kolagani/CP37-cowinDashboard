// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {details} = props
  console.log(details)
  return (
    <ResponsiveContainer width={1000} height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={details}
          startAngle={0}
          endAngle={3600}
          dataKey="count"
          innerRadius="0%"
          outerRadius="100%"
        >
          <Cell name="18-44" fill="#2cc6c6" />
          <Cell name="45-60" fill=" #6c757d" />
          <Cell name="Above 60" fill="#5a8dee" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByGender
